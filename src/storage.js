// let Project = require("./classes.js")
const Elements = require("./elements.js")

class DepositBox {
	static initializeStoredProjects () { 
		if (localStorage.getItem("TOPTDL-Projects")) {
			const storedProjectsString = localStorage.getItem("TOPTDL-Projects")
			const storedProjectsObject = JSON.toJSON(storedProjectsString);
			const elements = Elements.createProject(storedProjectsObject.title)
			Object.assign(storedProjectsObject, elements)
			return storedProjectsObject
		}
	}

	static createStoredProjects (projects) {
		let storageObject = {}
		
		Object.assign(storageObject, projects)

		delete storageObject.projects.elements

		let storageString = JSON.stringify(storageObject)

		return storageString
	}
}

module.exports = DepositBox
