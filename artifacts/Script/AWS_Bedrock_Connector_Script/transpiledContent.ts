var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PROMPT = req.query.inputValue;
var playground = req.query.playground;
var accessKey = req.query.accessKey;
var secretKey = req.query.secretKey;
var modelId = req.query.modelId;
var modelProvider = req.query.modelProvider;
var awssdkclientbedrock = modules.awssdkclientbedrock;
var awssdkclientbedrockruntime = modules.awssdkclientbedrockruntime;
//validating users credentials
var client = new awssdkclientbedrockruntime.BedrockRuntimeClient({
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
}
else if (playground == "Image") {
    amazonImage(modelId);
}
function mistralAIChat(MODEL_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var params, command, res, e_1, jsonString, modelRes, bodyRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
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
                    command = new awssdkclientbedrockruntime.InvokeModelCommand(params);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(command)];
                case 2:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log("error", e_1);
                    return [3 /*break*/, 4];
                case 4:
                    jsonString = new TextDecoder().decode(res.body);
                    modelRes = JSON.parse(jsonString);
                    bodyRes = {
                        prompt: PROMPT,
                        completion: modelRes.outputs[0].text,
                    };
                    result = bodyRes.completion;
                    complete();
                    return [2 /*return*/];
            }
        });
    });
}
function metaChat(MODEL_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var params, command, res, e_2, jsonString, modelRes, bodyRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
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
                    command = new awssdkclientbedrockruntime.InvokeModelCommand(params);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(command)];
                case 2:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log("error", e_2);
                    return [3 /*break*/, 4];
                case 4:
                    jsonString = new TextDecoder().decode(res.body);
                    modelRes = JSON.parse(jsonString);
                    bodyRes = {
                        prompt: PROMPT,
                        completion: modelRes.generation,
                    };
                    result = bodyRes.completion;
                    complete();
                    return [2 /*return*/];
            }
        });
    });
}
function cohereChat(MODEL_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var params, command, res, e_3, jsonString, modelRes, bodyRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
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
                    command = new awssdkclientbedrockruntime.InvokeModelCommand(params);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(command)];
                case 2:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log("error", e_3);
                    return [3 /*break*/, 4];
                case 4:
                    jsonString = new TextDecoder().decode(res.body);
                    modelRes = JSON.parse(jsonString);
                    bodyRes = {
                        prompt: PROMPT,
                        completion: modelRes.generations[0].text,
                    };
                    result = bodyRes.completion;
                    complete();
                    return [2 /*return*/];
            }
        });
    });
}
function ai21Chat(MODEL_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var params, command, res, e_4, jsonString, modelRes, bodyRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
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
                    command = new awssdkclientbedrockruntime.InvokeModelCommand(params);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(command)];
                case 2:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    console.log("error", e_4);
                    return [3 /*break*/, 4];
                case 4:
                    jsonString = new TextDecoder().decode(res.body);
                    modelRes = JSON.parse(jsonString);
                    bodyRes = {
                        prompt: PROMPT,
                        completion: modelRes.completions[0].data.text,
                    };
                    result = bodyRes.completion;
                    complete();
                    return [2 /*return*/];
            }
        });
    });
}
function anthropicChat(MODEL_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var params, command, res, e_5, jsonString, modelRes, bodyRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        modelId: MODEL_ID,
                        contentType: "application/json",
                        accept: "application/json",
                        body: JSON.stringify({
                            prompt: "\n\nHuman:".concat(PROMPT, "\n\nAssistant:"),
                            max_tokens_to_sample: 300,
                            temperature: 0.5,
                            top_k: 250,
                            top_p: 1,
                        }),
                    };
                    command = new awssdkclientbedrockruntime.InvokeModelCommand(params);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(command)];
                case 2:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    console.log("error", e_5);
                    return [3 /*break*/, 4];
                case 4:
                    jsonString = new TextDecoder().decode(res.body);
                    modelRes = JSON.parse(jsonString);
                    bodyRes = {
                        prompt: PROMPT,
                        completion: modelRes.completion,
                    };
                    log.info(bodyRes.completion);
                    result = bodyRes.completion;
                    complete();
                    return [2 /*return*/];
            }
        });
    });
}
function amazonChat(MODEL_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var params, command, res, e_6, jsonString, modelRes, bodyRes, storeResponse, searchText, regex, serach, regexSearch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
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
                    command = new awssdkclientbedrockruntime.InvokeModelCommand(params);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(command)];
                case 2:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    console.log("error", e_6);
                    return [3 /*break*/, 4];
                case 4:
                    jsonString = new TextDecoder().decode(res.body);
                    modelRes = JSON.parse(jsonString);
                    bodyRes = {
                        prompt: PROMPT,
                        completion: modelRes.results[0].outputText,
                    };
                    storeResponse = modelRes.results[0].outputText;
                    log.info("store", storeResponse);
                    searchText = "\nBot:";
                    regex = new RegExp(searchText);
                    serach = "\n";
                    regexSearch = new RegExp(serach);
                    if (regex.test(storeResponse)) {
                        storeResponse = storeResponse.replace(/\nBot:/g, "");
                    }
                    else if (regexSearch.test(storeResponse)) {
                        storeResponse = storeResponse.replace(/\n/g, "");
                    }
                    result = storeResponse;
                    complete();
                    return [2 /*return*/];
            }
        });
    });
}
function amazonImage(MODEL_ID) {
    return __awaiter(this, void 0, void 0, function () {
        var params, command, res, e_7, jsonString, modelRes, imageDateArray, i, base64Image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
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
                    command = new awssdkclientbedrockruntime.InvokeModelCommand(params);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(command)];
                case 2:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _a.sent();
                    console.log("error", e_7);
                    return [3 /*break*/, 4];
                case 4:
                    log.info("res", res);
                    jsonString = new TextDecoder().decode(res.body);
                    modelRes = JSON.parse(jsonString);
                    log.info("model", modelRes);
                    imageDateArray = [];
                    for (i = 0; i < modelRes["images"].length; i++) {
                        base64Image = modelRes["images"][i];
                        imageDateArray.push(base64Image);
                    }
                    log.info("image", imageDateArray);
                    result = imageDateArray;
                    complete();
                    return [2 /*return*/];
            }
        });
    });
}
