const {Task, Project}  = require("./classes.js")
require("./style.css")

// window.elementTest = Elem.createProject("hi")

let testTask = new Task("Test the task class")

let testTask2 = new Task("Test multiple classes within the project class")

let testProject = new Project("Test Project", {testTask, testTask2})

let testProject2 = new Project("Test Project 2")

testProject2.addTasks(new Task("task 3"), new Task("task 4"))

// Object.assign(testProject2.tasks, new Task("Task 3"))

console.log(testTask)
console.log(testTask2)
console.log(testTask2.dueDate)

console.log(testProject)
console.log(testProject2)
console.log(testProject2.tasks[0])
testProject2.tasks[0].notes = "Hi"
console.log(testProject2.tasks[0].notes)

