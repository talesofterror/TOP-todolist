const { Project, Task } = require("./classes.js")
const Elements = require("./elements.js")
const DepositBox = require("./storage.js")

class Forms {

	static initializeForms () {

		if (localStorage.length != 0) {
			let projects = DepositBox.getStoredProjects().reverse()
			let tasks = DepositBox.getStoredTasks()

			for (let project of projects) {
				if (project.id > Project.projectCount) { Project.projectCount = project.id }
				let hydratedProject = new Project(project.title, project.id)
				hydratedProject.id = project.id
			}
			for (let task of tasks) {
				if (task.id > Task.taskCount) { Task.taskCount = task.id }
				let hydratedTask = new Task(task.title, task.projectId, task.id)
				hydratedTask.id = task.id
				hydratedTask.dueDate = task.dueDate
				hydratedTask.notes = task.notes
				hydratedTask.priority = task.priority.index
			}
		} else {
			const project1 = new Project("Default Project 1")
			const task1 = new Task("task1 - project 1", project1.id)
			task1.dueDate = new Date().toUTCString()
			task1.notes = "This is the task description. What am I describing? Nothing in particular. What do you care?"
			const task2 = new Task("task2 - project 1", project1.id)

			const project2 = new Project("Default Project 2")
			const task3 = new Task("task3 - project 2", project2.id)
			task3.notes = "This is another task. Hi."
		}

		Elements.newProjectFormContainer.onsubmit = Forms.addProject

		Elements.newProjectButton.addEventListener("click", () => {
			Forms.newProjectLoop()
		})

		Elements.newProjectCancelButton.addEventListener( "click", ()=> {
			Forms.toggleNewProjectForm(false)
			Elements.newProjectFormContainer.reset()
		})

		Elements.newProjectSubmitButton.addEventListener( "click", ()=> {
			Forms.addProject()
		})

		Elements.inputProjectName.addEventListener("input", () => {
			Elements.inputProjectName.style.height = '0px';
		  Elements.inputProjectName.style.height = Elements.inputProjectName.scrollHeight + 'px';	
		})

		Elements.hydrateExtras()
	}
	
	static toggleNewProjectForm (state) {
		if (state == false) {
			Elements.newProjectButton.classList.remove("invisible")
			Elements.newProjectForm.classList.add("invisible")
		} else {
			Elements.newProjectButton.classList.add("invisible")
			Elements.newProjectForm.classList.remove("invisible")
		}
	}

	static newProjectLoop () {
		Forms.toggleNewProjectForm(true)
		Elements.inputProjectName.focus()
	}

	static addProject () {
		if (Elements.inputProjectName.value == "") {
			return false
		}
		let newProject = new Project(Elements.inputProjectName.value)
		newProject.displayProject()
		Forms.toggleNewProjectForm(false)
		Elements.newProjectFormContainer.reset()
		DepositBox.setStoredProject(newProject)
		return false
	}
}

module.exports = Forms
