const { Project } = require("./classes.js")
const Elements = require("./elements.js")
const DepositBox = require("./storage.js")

class Forms {

	static initializeForms () {

		Elements.newProjectFormContainer.onsubmit = Forms.addProject

		Elements.newProjectButton.addEventListener("click", () => {
			console.log("new project button click listener called")
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

		DepositBox.initializeStoredProjects()
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
		return false
	}
	
}

module.exports = Forms
