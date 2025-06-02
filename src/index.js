const {Task, Project}  = require("./classes.js")
const Forms = require("./forms.js")
// const Elements = require("./elements.js")
require("./style.css")

Forms.initializeForms()

const project1 = new Project("New Project")
const task1 = new Task("Say hello", project1)

const project2 = new Project("New Project 2")
const task2 = new Task("Say hello again", project2)

task1.notes = "This is the task description. What am I describing? Nothing in particular. What do you care?"

project1.displayProject()
project2.displayProject()

task2.notes = "This is another task. Hi."

