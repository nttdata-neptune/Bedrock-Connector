var key = selectPlayground.getSelectedKey();

if (key == "Chat" || key == "Text" || key == null) {
    var icon = new sap.ui.core.Icon({
        src: "sap-icon://fa-solid/user-astronaut",
        size: "1rem",
        color: "blue",
    });

    var textHello = new sap.m.Text({
        text: modelmultiModelStoreResponse.getData(),
        textAlign: "Left",
    });

    var hbox = new sap.m.HBox({
        items: [icon, textHello],
    });
    icon.addStyleClass("iconAlignment");
    textHello.addStyleClass("textResponseForOutput");
    hbox.addStyleClass("hBoxResponse");
    middleBodyContainer.addContent(hbox);
} else if (key == "Image") {
    
     var icon = new sap.ui.core.Icon({
        src: "sap-icon://fa-solid/user-astronaut",
        size: "1rem",
        color: "blue",
    });
    var image = new nep.bootstrap.Image({
        src: "data:image/png;base64," + modelmultiModelStoreResponse.getData()[0],
        width: "250px",
        height: "250px",
    });

      var hbox = new sap.m.HBox({
        items: [icon, image],
    });

    icon.addStyleClass("iconAlignment");
    hbox.addStyleClass("hBoxResponse");
    image.addStyleClass("imageResponse");
    middleBodyContainer.addContent(hbox);
    BusyDialog.close();
}

inputPromt.setValue("");
