// let Project = require("./classes.js")
const Elements = require("./elements.js")

class DepositBox {

	static hydratedData

	static initializeStoredProjects () { 
		if (localStorage.getItem("TOPTDL")) {
			this.hydratedData = this.rehydrate(localStorage.getItem("TOPTDL"))
			console.log(this.hydratedData)
		}

		// need make the project and task data into actual Project and Task objects
		// can probably accomplish this in the forms class
	}

	static rehydrate (storedString) {
		let parsedProjects = JSON.parse(storedString)
		// console.log(parsedProjects)

		let hydrateProject = (project) => {
			project.elements = Elements.createProject(project.title)
		}

		let hydrateTask = (task) => {
			let elements = Elements.createTask(task.title)
			task.elements = elements
		}

		for (let project of parsedProjects) {
			hydrateProject(project)
		}

		for (let project of parsedProjects) {
			for (let activeItem of project.tasks.active) {
				hydrateTask(activeItem)
			}
			for (let completedItem of project.tasks.completed) {
				hydrateTask(completedItem)
			}
		}

		// console.log(parsedProjects)

		return parsedProjects

	}

	static dehydrate(projects) {
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
		let object = this.dehydrate(collection.projects)		

		let string = JSON.stringify(object)

		localStorage.clear()
		localStorage.setItem("TOPTDL", string)
		// console.log("reducing projects: ")
		// console.log(this.dehydrate(object.projects))
	}
}

module.exports = DepositBox
