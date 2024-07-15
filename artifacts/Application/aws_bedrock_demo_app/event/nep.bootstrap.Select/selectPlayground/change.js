middleBodyContainer.removeAllContent(); //clear middle body history on change of playground

//calling function on change event of playground
playground = selectPlayground.getSelectedKey();
switch (playground) {
    case "Chat":
        inputPlayground = "Chat";
        sortPlayground(inputPlayground);
        break;

    case "Text":
        inputPlayground = "Text";
        sortPlayground(inputPlayground);
        break;

    case "Image":
        inputPlayground = "Image";
        sortPlayground(inputPlayground);
        break;
}

//passing model id
switch (playground) {
    case 'Chat':
        modelId = modelIdArray[0].Chat[0].modelId;
        modelProvider = modelIdArray[0].Chat[0].modelProvider;
        break;
    case 'Text':
        modelId = modelIdArray[1].Text[0].modelId;
        modelProvider = modelIdArray[1].Text[0].modelProvider;
        break;
    case 'Image':
        modelId = modelIdArray[2].Image[0].modelId;
        modelProvider = modelIdArray[2].Image[0].modelProvider;
        break;
}
