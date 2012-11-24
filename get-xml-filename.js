function getXmlFilename() {	
	var today = new Date();
	var xmlFilename = today.getFullYear() + "-" + (today.getMonth() + 1) + ".xml";
	return xmlFilename;
}