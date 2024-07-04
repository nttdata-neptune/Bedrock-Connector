var key = Select1.getSelectedKey();
console.log("key", key);
var playground;
if (key == "1" || key == "2" || key == null) {
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
    Container1.addContent(hbox);
} else if (key == "3") {
    
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
    Container1.addContent(hbox);
    BusyDialog.close();
}

// ===============

inputPromt.setValue("");
