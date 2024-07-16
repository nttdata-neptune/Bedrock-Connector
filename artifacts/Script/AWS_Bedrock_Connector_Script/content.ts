const PROMPT = req.query.inputValue;
const playground = req.query.playground;
const accessKey = req.query.accessKey;
const secretKey = req.query.secretKey;
const modelId = req.query.modelId;
const modelProvider = req.query.modelProvider;

const awssdkclientbedrock = modules.awssdkclientbedrock;
const awssdkclientbedrockruntime = modules.awssdkclientbedrockruntime;

//validating users credentials
const client = new awssdkclientbedrockruntime.BedrockRuntimeClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    },
});

//validating and calling functions based on model provider 
if (playground == "Chat" || playground == "Text") {
    log.info(playground + modelProvider + modelId);
    switch (modelProvider) {
        case "Anthropic":
            anthropicChat(modelId);
            break;
        case "Amazon":
            amazonChat(modelId);
            break;
        case "AI21":
             ai21Chat(modelId);
            break;
        case "Cohere":
            cohereChat(modelId);
            break;
        case "Meta":
            metaChat(modelId);
            break;
        case "MistralAI":
            mistralAIChat(modelId);
            break;
    }
} else if (playground == "Image") {
    amazonImage(modelId);
}

async function mistralAIChat(MODEL_ID) {
    const params: awssdkclientbedrockruntime.InvokeModelCommandInput = {
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            prompt: PROMPT,
            max_tokens: 100,
            temperature: 0.5,
            top_p: 0.9,
            top_k: 50,
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
        completion: modelRes.outputs[0].text,
    };
    result = bodyRes.completion;
    complete();
}

async function metaChat(MODEL_ID) {
    const params: awssdkclientbedrockruntime.InvokeModelCommandInput = {
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            prompt: PROMPT,
            max_gen_len: 400,
            temperature: 0.5,
            top_p: 0.7,
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
        completion: modelRes.generation,
    };
    result = bodyRes.completion;
    complete();
}

async function cohereChat(MODEL_ID) {
    const params: awssdkclientbedrockruntime.InvokeModelCommandInput = {
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            prompt: PROMPT,
            max_tokens: 400,
            temperature: 0.75,
            p: 0.01,
            k: 0,
            stop_sequences: [],
            return_likelihoods: "NONE",
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
        completion: modelRes.generations[0].text,
    };
    result = bodyRes.completion;
    complete();
}

async function ai21Chat(MODEL_ID) {
    const params: awssdkclientbedrockruntime.InvokeModelCommandInput = {
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            prompt: PROMPT,
            maxTokens: 200,
            temperature: 0.7,
            topP: 1,
            stopSequences: [],
            countPenalty: { scale: 0 },
            presencePenalty: { scale: 0 },
            frequencyPenalty: { scale: 0 },
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
        completion: modelRes.completions[0].data.text,
    };
    result = bodyRes.completion;
    complete();
}

async function anthropicChat(MODEL_ID) {
    const params: awssdkclientbedrockruntime.InvokeModelCommandInput = {
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            prompt: `\n\nHuman:${PROMPT}\n\nAssistant:`,
            max_tokens_to_sample: 300,
            temperature: 0.5,
            top_k: 250,
            top_p: 1,
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
        completion: modelRes.completion,
    };
    log.info(bodyRes.completion);
    result = bodyRes.completion;
    complete();
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
    var storeResponse = modelRes.results[0].outputText;
    log.info("store",storeResponse);
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
    const params: awssdkclientbedrockruntime.InvokeModelWithResponseStreamCommandInput = {
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            taskType: "TEXT_IMAGE",
            textToImageParams: {
                text: PROMPT,
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
    log.info("res", res);
    const jsonString = new TextDecoder().decode(res.body);
    const modelRes = JSON.parse(jsonString);
    log.info("model", modelRes)
    var imageDateArray: Array<string> = [];
    for (let i = 0; i < modelRes["images"].length; i++) {
        const base64Image = modelRes["images"][i];
        imageDateArray.push(base64Image);
    }
    log.info("image",imageDateArray);
    result = imageDateArray;
    complete();
}
