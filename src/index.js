const {Task, Project}  = require("./classes.js")
const Elements = require("./elements.js")
require("./style.css")

Elements.newProjectButton.addEventListener("click", () => {
	Elements.toggleNewProjectForm(true)
})

const project1 = new Project("New Project")
const task1 = new Task("Say hello", project1)

const project2 = new Project("New Project")
const task2 = new Task("Say hello", project2)

task1.notes = "This is the task description. What am I describing? Nothing in particular. What do you care?"

project1.displayProject()

