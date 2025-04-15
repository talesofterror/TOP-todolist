const {Task, Project}  = require("./classes.js")
console.log("hi")

let testTask = new Task("Test the task class")

let testTask2 = new Task("Test multiple classes within the project class")

let testProject = new Project("Test Project", {testTask, testTask2})

console.log(testTask)
console.log(testTask2)

console.log(testProject)


