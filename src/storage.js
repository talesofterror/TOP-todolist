
class DepositBox {

	static setStoredProject (project) {
		let storageObject = {
			title: project.title,
			id: project.id,
		}

		let storageString = JSON.stringify(storageObject)
		localStorage.setItem("project-" + storageObject.id, storageString)
	}

	static setStoredTasks (task) {
		let storageObject = {
			title: task.title,
			id: task.id,
			projectId: task.projectId,
			text: task.text,
			complete: task.completed,
			notes: task.notes,
			dueDate: task._dueDate,
			priority: {index: task.priority.index, level: task.priority.level}
		}

		let storageString = JSON.stringify(storageObject)
		let storageName = "task-" + storageObject.id
		localStorage.setItem(storageName, storageString)
	}

	static removeStoredProject (project) {
		localStorage.removeItem(`project-${project.id}`)
		for (let task of project.tasks) {
			this.removeStoredTask(task)
		}
	}

	static removeStoredTask (task) {
		localStorage.removeItem(`task-${task.id}`)
	}

	static getStoredProjects () {
		let projects = []
		for (let item in localStorage) {
			if (item.split("-").includes("project")) {
				projects.push(JSON.parse(localStorage[item]))
			}
		}
		return projects
	}

	static getStoredTasks () {
		let tasks = []
		for (let item in localStorage) {
			if (item.split("-").includes("task")) {
				tasks.push(JSON.parse(localStorage[item]))
			}
		}
		return tasks
	}
}

module.exports = DepositBox
