
var playground = Select1.getSelectedKey();

if (playground == 1 || playground == null){
  playground = "Chat",
  console.log("playground",playground);
}
else if (playground == 2){
  playground = "Text"
}
else {
  playground = "Image"
}

var input = inputPromt.getValue();

var options = {
    parameters: {
        "inputValue": input,
        "playground" : playground
    }
};


apigetResponseFromBedrock(options);

var icon = new sap.ui.core.Icon({
  src: "sap-icon://fa-solid/user",
  size: "1rem",
  color: "green",
  
});

var textHello = new sap.m.Text({
    text: input ,
    // width: "fit-content",
    textAlign: "Left",
    // color : "#fff8f8",
});

var hbox = new sap.m.HBox({
  items: [icon, textHello]
});

// textHello.addStyleClass("textResponse");
icon.addStyleClass("iconAlignment");
textHello.addStyleClass("textResponse");
hbox.addStyleClass("hBoxResponse");
Container1.addContent(hbox);
inputPromt.setValue("");




