const inputText = req.query.inputValue;
const playground = req.query.playground;
const accessKey = req.query.accessKey;
const secretKey = req.query.secretKey;
const modelId = req.query.modelId;

const awssdkclientbedrock = modules.awssdkclientbedrock;
const awssdkclientbedrockruntime = modules.awssdkclientbedrockruntime;

const client = new awssdkclientbedrockruntime.BedrockRuntimeClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    },
});
 
const PROMPT = inputText;

if (playground == "Chat" || playground == "Text") {
    amazonChat(modelId);
} else if (playground == "Image") {
    amazonImage(modelId);
}

async function amazonChat(MODEL_ID) {
    const params: awssdkclientbedrockruntime.InvokeModelWithResponseStreamCommandInput = {
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            inputText: PROMPT,
            textGenerationConfig: {
                maxTokenCount: 300,
                stopSequences: [],
                temperature: 0,
                topP: 0.9,
            },
        }),
    };

    const command = new awssdkclientbedrockruntime.InvokeModelCommand(params);

    var res;
    try {
        res = await client.send(command);
    } catch (e) {
        console.log("error", e);
    }

    const jsonString = new TextDecoder().decode(res.body);
    const modelRes = JSON.parse(jsonString);

    const bodyRes = {
        prompt: PROMPT,
        completion: modelRes.results[0].outputText,
    };
    console.log(bodyRes);
    var storeResponse = modelRes.results[0].outputText;

    var searchText = "\nBot:";
    var regex = new RegExp(searchText);

    var serach = "\n";
    var regexSearch = new RegExp(serach);

    if (regex.test(storeResponse)) {
        storeResponse = storeResponse.replace(/\nBot:/g, "");
    } else if (regexSearch.test(storeResponse)) {
        storeResponse = storeResponse.replace(/\n/g, "");
    }

    result = storeResponse;
    complete();
}

async function amazonImage(MODEL_ID) {
    // const MODEL_ID = "amazon.titan-image-generator-v1";
    const params: awssdkclientbedrockruntime.InvokeModelWithResponseStreamCommandInput = {
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            taskType: "TEXT_IMAGE",
            textToImageParams: {
                text: inputText,
            },
            imageGenerationConfig: {
                numberOfImages: 1,
                height: 1024,
                width: 1024,
                cfgScale: 8.0,
                seed: 0,
            },
        }),
    };

    const command = new awssdkclientbedrockruntime.InvokeModelCommand(params);

    var res;
    try {
        res = await client.send(command);
    } catch (e) {
        console.log("error", e);
    }

    const jsonString = new TextDecoder().decode(res.body);
    const modelRes = JSON.parse(jsonString);

    console.log("modelRes", modelRes);
    var imageDateArray: Array<string> = [];
    for (let i = 0; i < modelRes["images"].length; i++) {
        const base64Image = modelRes["images"][i];
        imageDateArray.push(base64Image);
    }
    console.log("image", imageDateArray);

    result = imageDateArray;
    complete();
}