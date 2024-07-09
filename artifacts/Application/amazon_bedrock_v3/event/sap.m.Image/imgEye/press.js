// fpjd soi 14/04/23 - add hide/show feature on the password logon input
let currentInputType = inputAccessKey.getType();
let newInputType = currentInputType === "Password" ? "Text" : "Password";
// let newInputIcon = currentInputType === "Password" ? "sap-icon://hide" : "sap-icon://show";
inputAccessKey.setType(newInputType);
// inLoginPassword._getValueHelpIcon().setSrc(newInputIcon);
// fpjd eoi 14/04/23 - add hide/show feature on the password logon input