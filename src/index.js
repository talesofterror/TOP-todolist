const {Task, Project}  = require("./classes.js")
const Forms = require("./forms.js")
require("./style.css")

Forms.initializeForms()

const project1 = new Project("New Project")
const task1 = new Task("Say hello", project1)
task1.dueDate = new Date().toLocaleString()
const task3 = new Task("Say hello pt. 2", project1)
task1.dueDate = new Date().toLocaleString()

const project2 = new Project("New Project 2")
const task2 = new Task("Say hello again", project2)

task1.notes = "This is the task description. What am I describing? Nothing in particular. What do you care?"

project1.displayProject()
project2.displayProject()

// console.log(Elements.projectsContainer.children)
// console.log(Elements.projectsContainer.children[0])
// console.log(Elements.projectsContainer.children[0].parentNode)

task2.notes = "This is another task. Hi."

