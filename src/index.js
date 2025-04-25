const {Task, Project}  = require("./classes.js")
require("./style.css")

const project1 = new Project("New Project")
const task1 = new Task("Say hello", project1)

project1.displayProject()

