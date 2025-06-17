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

	static reduceObject(projects) {
		const reducedProjects = []

		let projectObject = (input) => ({
			id: input.id,
			title: input.title,
			tasks: {active: [], completed: []},
		})
		
		let taskObject = (input) => ({
			id: input.id,
			projectId: input.projectId,
			title: input.title,
			_dueDate: input._dueDate,
			_notes: input._notes,
			_priority: input.priority
		})

		for (let project of projects) {
			reducedProjects.push(projectObject(project))
		}

		for (let [index, rProj] of reducedProjects.entries()) {
			for (let activeItem of projects[index].tasks.active) {
				rProj.tasks.active.push(taskObject(activeItem))
			}
			for (let completedItem of projects[index].tasks.completed) {
				rProj.tasks.completed.push(taskObject(completedItem))
			}
		}

		return reducedProjects
	}

	static updateStorage (collection) {
		let object = collection
		
		Object.assign(object, collection)

		let string = JSON.stringify(object)

		localStorage.clear()
		localStorage.setItem("TOPTDL", string)
		console.log("reducing projects: ")
		console.log(this.reduceObject(object.projects))
	}
}

module.exports = DepositBox
