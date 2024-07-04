
Container1.removeAllContent();

if(Select1.getSelectedKey() == 1 ){
modelSelect2.setData(modelChatArray);
}
else if(Select1.getSelectedKey() == 2){
 modelSelect2.setData(modelTextArray);

}
else{
    modelSelect2.setData(modelImageArray);

}

console.log(Select1.getSelectedKey());


playground = Select1.getSelectedKey();
if (playground == 1)
{
    console.log("plaground 1 selected");
    modelId = modelSelect2.getData()[0].key
}
else if (playground == 2)
{    console.log("plaground 2 selected");
    modelId = modelSelect2.getData()[0].key
}
else if(playground == 3){
        console.log("plaground 3 selected");
       modelId = modelSelect2.getData()[0].key

}
