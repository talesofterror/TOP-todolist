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

	static updateStorage (collection) {
		let object = collection
		
		Object.assign(object, collection)

		let string = JSON.stringify(object)
		console.log(collection)

		localStorage.clear()
		localStorage.setItem("TOPTDL", string)
	}
}

module.exports = DepositBox
