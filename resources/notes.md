# to do list

- implement local storage
- project delete button
- task delete button
- task edit system
- task sorting
- task completion system
    - could be as simple as a cycle option in the status listener that grays out the task
        - "x" in the status circle
- priority button listener





## classes
### task
- properties
    - title
    - description
    - dueDate
    - priority
    - notes
    - state
        - incomplete
        - complete
        - sleep
    - elements
- functions
    - set {all properties and state}
    - delete

### project
- properties
    - title
    - taskObjects
- function 
    - edit name
    - delete
    - add task
    - remove task
    - move task
    - sort
        - dueDate
        - priority


				<section class="project">
					<div class="project-header">
						<div class="project-display-button">V</div>
						<header class="project-name">
							Project 1 Project 1 Project 1 Project 1 Project 1 
						</header>
					</div>

					<div class="project-content">

						<nav class="project-nav">
							<div class="add-task project-header-button">+</div>
							<div class="sort project-header-button">(s)</div>
						</nav>

						<div class="task task-adder">
							<div class="task-status-icon"></div>
							<div class="task-text">
								<textarea type="text" class="task-title" placeholder="enter task title" rows="1"></textarea>
								<input type="date" class="task-due-date" value="2025-06-03">
								<textarea class="task-content-notes" placeholder="enter task notes" rows="1"></textarea>
							</div>
							<div class="task-adder-buttons">
								<div class="project-header-button">add</div>
								<div class="project-header-button">cancel</div>
							</div>
						</div>

						<section class="tasks-container">

							<div class="task">
								<div class="task-status-icon priority-1"></div>
								<header class="task-text">
									<span>Do this thing</span>
									<div class="task-due-date">01/02/2025</div>
								</header>
							</div>

							<div class="task">
								<div class="task-status-icon priority-3"></div>
								<header class="task-text">
									<span>Do this thing</span>
									<div class="task-due-date">01/02/2025</div>
								</header>
							</div>

							<div class="task">
								<div class="task-status-icon priority-2"></div>
								<div class="task-text">
									<header class="task-title">Do this thing</header>
									<div class="task-due-date">01/02/2025</div>
									<div class="task-content">
										<div class="task-content-notes">These are some notes for this task. Hi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, tempore.</div>
									</div>
								</div>
							</div>

						</section>

					</div>

				</section>



