var modelId, modelProvider, playground, inputPlayground;
var sortedPlayground = [];
var playgroundArray = [
    {
        key: "Chat",
        text: "Chat",
    },
    {
        key: "Text",
        text: "Text",
    },
    {
        key: "Image",
        text: "Image",
    },
];
modelselectPlayground.setData(playgroundArray);

var modelIdArray = [
    {
        Chat: [
            {
                modelId: "amazon.titan-text-express-v1",
                modelText: "Amazon Titan Text G1 - Express v1",
                modelProvider: "Amazon",
            },
            {
                modelId: "anthropic.claude-instant-v1",
                modelText: "Anthropic Claude Instant V1",
                modelProvider: "Anthropic",
            },
            {
                modelId: "anthropic.claude-v2",
                modelText: "Anthropic Claude V2",
                modelProvider: "Anthropic",
            },
            {
                modelId: "ai21.j2-mid-v1",
                modelText: "AI21 Labs Jurrasic-2  Mid",
                modelProvider: "AI21",
            },
            {
                modelId: "ai21.j2-ultra-v1",
                modelText: "AI21 Labs Jurrasic-2  Ultra",
                modelProvider: "AI21",
            },
            {
                modelId: "cohere.command-text-v14",
                modelText: "Cohere Command V14",
                modelProvider: "Cohere",
            },
            {
                modelId: "cohere.command-light-text-v14",
                modelText: "Cohere Command Light V14",
                modelProvider: "Cohere",
            },
            {
                modelId: "meta.llama3-70b-instruct-v1:0",
                modelText: "Meta Llama 2 Chat 70B",
                modelProvider: "Meta",
            },
            {
                modelId: "meta.llama3-8b-instruct-v1:0",
                modelText: "Meta Llama 3 8b Instruct",
                modelProvider: "Meta",
            },
            {
                modelId: "mistral.mistral-7b-instruct-v0:2",
                modelText: "Mistral AI 7B Instruct V0:2",
                modelProvider: "Mistral",
            },
            {
                modelId: "mistral.mixtral-8x7b-instruct-v0:1",
                modelText: "Mixtral AI 8X7B Instruct V0:1",
                modelProvider: "Mistral",
            },
            {
                modelId: "mistral.mistral-large-2402-v1:0",
                modelText: "Mistral AI Large V1",
                modelProvider: "Mistral",
            },
            {
                modelId: "mistral.mistral-small-2402-v1:0",
                modelText: "Mistral AI Small V1",
                modelProvider: "Mistral",
            },
        ],
    },
    {
        Text: [
            {
                modelId: "amazon.titan-text-lite-v1",
                modelText: "Amazon Titan Text G1 - Lite  v1",
                modelProvider: "Amazon",
            },
            {
                modelId: "amazon.titan-text-express-v1",
                modelText: "Amazon Titan Text G1 - Express  v1",
                modelProvider: "Amazon",
            },
            {
                modelId: "anthropic.claude-instant-v1",
                modelText: "Anthropic Claude Instant V1",
                modelProvider: "Anthropic",
            },
            {
                modelId: "anthropic.claude-v2",
                modelText: "Anthropic Claude V2",
                modelProvider: "Anthropic",
            },
            {
                modelId: "ai21.j2-mid-v1",
                modelText: "AI21 Labs Jurrasic-2  Mid",
                modelProvider: "AI21",
            },
            {
                modelId: "ai21.j2-ultra-v1",
                modelText: "AI21 Labs Jurrasic-2  Ultra",
                modelProvider: "AI21",
            },
            {
                modelId: "cohere.command-text-v14",
                modelText: "Cohere Command V14",
                modelProvider: "Cohere",
            },
            {
                modelId: "cohere.command-light-text-v14",
                modelText: "Cohere Command Light V14",
                modelProvider: "Cohere",
            },
            {
                modelId: "meta.llama3-70b-instruct-v1:0",
                modelText: "Meta Llama 2 Chat 70B",
                modelProvider: "Meta",
            },
            {
                modelId: "meta.llama3-8b-instruct-v1:0",
                modelText: "Meta Llama 3 8b Instruct",
                modelProvider: "Meta",
            },
            {
                modelId: "mistral.mistral-7b-instruct-v0:2",
                modelText: "Mistral AI 7B Instruct V0:2",
                modelProvider: "Mistral",
            },
            {
                modelId: "mistral.mixtral-8x7b-instruct-v0:1",
                modelText: "Mixtral AI 8X7B Instruct V0:1",
                modelProvider: "Mistral",
            },
            {
                modelId: "mistral.mistral-large-2402-v1:0",
                modelText: "Mistral AI Large V1",
                modelProvider: "Mistral",
            },
            {
                modelId: "mistral.mistral-small-2402-v1:0",
                modelText: "Mistral AI Small V1",
                modelProvider: "Mistral",
            },
        ],
    },
    {
        Image: [
            {
                modelId: "amazon.titan-image-generator-v1",
                modelText: "Amazon Titan Image Generator G1",
                modelProvider: "Amazon",
            },
        ],
    },
];

function sortPlayground(playground) {
    switch (playground) {
        case "Chat":
            modelselectModels.setData(modelIdArray[0].Chat);
            break;

        case "Text":
            modelselectModels.setData(modelIdArray[1].Text);
            break;

        case "Image":
            modelselectModels.setData(modelIdArray[2].Image);
            break;
    }
}

inputPlayground = "Chat";
sortPlayground(inputPlayground);

//////////once run button press this funciton will be called/////////
function executeRequest() {
    var input = inputPromt.getValue();
    var accessKey = inputAccessKey.getValue();
    var secretKey = inputAccessSecretKey.getValue();

    playground = selectPlayground.getSelectedKey();

    if (modelId === undefined) {
        modelId = modelselectModels.getData()[0].modelId; //passing by default value for model id
        modelProvider = modelselectModels.getData()[0].modelProvider;
    }

    switch (true) {
        case playground == "Chat" || playground == null:
            playground = "Chat"; //passing by default value
            break;

        case playground == "Text":
            playground = "Text";
            break;

        case playground == "Image" && input != "":
            BusyDialog.open();
            playground = "Image";
            break;
    }

    validateInputs();
    if (
        accessKey != undefined &&
        secretKey != undefined &&
        input != undefined &&
        input != "" &&
        input != null
    ) {
        const accessKeyData = encodeURIComponent(accessKey);
        const secretKeyData = encodeURIComponent(secretKey);

        var options = {
            parameters: {
                inputValue: input,
                playground: playground,
                accessKey: accessKeyData,
                secretKey: secretKeyData,
                modelId: modelId,
                modelProvider: modelProvider,
            },
        };

        apigetResponseFromBedrock(options);

        var icon = new sap.ui.core.Icon({
            src: "sap-icon://fa-solid/user",
            size: "1rem",
            color: "green",
        });

        var textHello = new sap.m.Text({
            text: input,
            textAlign: "Left",
        });

        var hbox = new sap.m.HBox({
            items: [icon, textHello],
            wrap: "Wrap",
        });

        icon.addStyleClass("iconAlignment");
        textHello.addStyleClass("textResponse");
        hbox.addStyleClass("hBoxResponse");
        middleBodyContainer.addContent(hbox);
    }

    // Scroll to the bottom of the target container
    var oContainer = document.getElementById("middleBodyContainer");
    oContainer.scrollTo(0, oContainer.scrollHeight);
    inputPromt.setValue("");
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        validateInputs();
        async function getValuesFromFields() {
            var input = await inputPromt.getValue();
            input = input.replace(/^\s*[\r\n]/gm, "");
            if (input == undefined || input == "" || input == null) {
                inputPromt.setValue("");
            } else {
                executeRequest();
            }
        }
        getValuesFromFields();
    }
});

function validateInputs() {
    var input = inputPromt.getValue();
    var accessKey = inputAccessKey.getValue();
    var secretKey = inputAccessSecretKey.getValue();
    switch (true) {
        case (accessKey === undefined || accessKey === "" || accessKey === null) &&
            secretKey != undefined:
            hboxAccessKey.addStyleClass("errorHighlight");
            sap.m.MessageToast.show("Please provide access key!");
            break;

        case (secretKey === undefined || secretKey === "" || secretKey === null) &&
            accessKey != undefined:
            hboxSecretAccessKey.addStyleClass("errorHighlight");
            sap.m.MessageToast.show("Please provide secret access key!");
            break;

        case accessKey === undefined && secretKey === undefined:
            hboxAccessKey.addStyleClass("errorHighlight");
            hboxSecretAccessKey.addStyleClass("errorHighlight");
            sap.m.MessageToast.show("Please provide access key and secret access key!");
            break;
        case input === undefined || input === "" || input === null:
            sap.m.MessageToast.show("please provide input...");
            break;
    }
}
