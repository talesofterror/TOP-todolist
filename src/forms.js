// const {Task, Project}  = require("./classes.js")
const { Project } = require("./classes.js")
const Elements = require("./elements.js")

class Forms {

	static projectFormOpen
	static taskFormOpen

	static initializeForms () {
		this.projectFormOpen = false
		this.taskFormOpen = false

		Elements.newProjectFormContainer.onsubmit = Forms.addProject

		Elements.newProjectButton.addEventListener("click", () => {
			console.log("new project button click listener called")
			Forms.newProjectLoop()
		})

		Elements.newProjectCancelButton.addEventListener( "click", ()=> {
			Forms.toggleNewProjectForm(false)
			Elements.newProjectFormContainer.reset()
		} )

		Elements.newProjectSubmitButton.addEventListener( "click", ()=> {
			Forms.addProject()
		})
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
		let newProject = new Project(Elements.inputProjectName.value)
		newProject.displayProject()
		Forms.toggleNewProjectForm(false)
		Elements.newProjectFormContainer.reset()
		return false
	}
	
}

module.exports = Forms
