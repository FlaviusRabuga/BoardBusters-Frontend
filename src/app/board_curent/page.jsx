'use client';
import React, { useEffect } from "react";
import "./style.css";
import Link from 'next/link';
import { useState } from 'react';
import Select from 'react-select'
import Modal from 'react-modal';



export default function Page() {

	const [showError, setShowError] = useState(false);
	const [showStatus, setShowStatus] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	var showUserDetails = useState(false);
	var userIdNo = useState('');

	const customStyles = {
		control: (provided) => ({ // class attribute : class=" css-i32vvf-control"
		  ...provided,
		  background: 'transparent',
		  display: 'flex',
		  flexWrap: 'nowrap',
		  borderColor: 'hsl(0deg 78.56% 55.56%);',
		  width: '7em'
		}),
		menu: (provided) => ({ // 'menu' is from the div class too.
		  ...provided,
		  background: 'transparent',
		  width: '4em'
		})
	};



	useEffect(() => {
		if (typeof window !== 'undefined') {
			showUserDetails = localStorage.getItem('userId') ? true : false;
			userIdNo = localStorage.getItem('userId');
		}

		// Rest of your useEffect code...
	}, []);

	const moveTaskToDone = (taskId) => {
		// Find the task in the tasksInProgress array
		const task = tasksTODO.find(task => task.TASK_ID == taskId);

		console.log(tasksTODO);
		console.log("alo");

		// If the task is not found, return early
		if (!task) {
			console.log("bn")
			return;

		}

		// console.log(tasksTODO)
		// Remove the task from the tasksInProgress array
		const updatedTasksTODO = tasksTODO.filter(task => task.ID != taskId);

		console.log("AICI");
		console.log(tasksInProgress);
		// console.log(updatedTasksTODO);

		// Add the task to the tasksDone array
		const updatedTasksDone = [...tasksDone, task];

		// Update the state
		setTasksInProgress(updatedTasksTODO);
		setTasksDone(updatedTasksDone);
		console.log(tasksInProgress);
	};

	const handleLogout = () => {
		// Remove userId from localStorage
		localStorage.removeItem('userId');
		// Perform any other necessary cleanup
		// Redirect to login page
		window.location.href = '/login';
	};


	async function sendNewTaskData(event) {
		event.preventDefault();
		const data = new FormData(event.target);

		const name = data.get('taskName');
		const descr = data.get('taskDescription');
		const time = data.get('taskDeadline');


		console.log(name);
		console.log(descr);
		console.log(time);
		console.log(assignedUser);

		const response = await fetch('http://localhost:5000/api/createTask', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: name,
				description: descr,
				deadline: time,
				assignedUser: assignedUser,
				boardId: boardId,
				creator: userId
			}),
		});

		const responseData = await response.json();
		console.log(responseData);
		setErrorMessage(responseData.message);
		setShowError(true);
		setShowStatus(responseData.success);
		if (responseData.success === true) {
			setTimeout(() => {
				window.location.reload();
			}, 2500);
		}




		// const inProgress = document.querySelector('.columnInProgress .tasks');

		// const taskInProgress = document.createElement('div');
		// const taskNameInProgress = document.createElement('div');
		// const taskDescriptionInProgress = document.createElement('div');
		// const taskDeadlineInProgress = document.createElement('div');


		// taskInProgress.addEventListener('click', () => {
		// 	setShowTaskDetails(true)
		// }
		// )

		// taskInProgress.classList.add('task');
		// taskNameInProgress.classList.add('taskName');
		// taskDescriptionInProgress.classList.add('taskDescription');
		// taskDeadlineInProgress.classList.add('taskDeadline');

		// taskNameInProgress.textContent = name;
		// taskDescriptionInProgress.textContent = descr;
		// taskDeadlineInProgress.textContent = time;

		// taskInProgress.appendChild(taskNameInProgress);
		// taskInProgress.appendChild(taskDescriptionInProgress);
		// taskInProgress.appendChild(taskDeadlineInProgress);

		// inProgress.appendChild(taskInProgress);


	}

	async function updateTaskStatus(taskId, status) {
		const response = await fetch('http://localhost:5000/api/changeTaskStatus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				taskId: taskId,
				status: status,
			}),
		});

		const responseData = await response.json();

		console.log(responseData);

		if (responseData.success) {
			window.location.reload();
		}
	}

	const [showIsland, setShowIsland] = useState(false);
	const [showTaskDetails, setShowTaskDetails] = useState(false);
	const [tasksTODO, setTasksTODO] = useState([]);
	const [tasksInProgress, setTasksInProgress] = useState([]);
	const [tasksDone, setTasksDone] = useState([]);

	const [boardId, setBoardId] = useState('');
	const [userId, setUserId] = useState('');

	const [users, setUsers] = useState([]);

	let assignedUser = '';

	useEffect(() => {


		async function getUsers() {
			const response = await fetch('http://localhost:5000/api/getUsers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				}
			});

			const responseData = await response.json();
			console.log(responseData);

			let usersMap = responseData.users.map((user) => {
				return { value: user.USER_ID, label: user.NAME };
			});


			setUsers(usersMap);
		}

		getUsers();


		let value_boardId = localStorage.getItem('boardId') || '';
		setBoardId(value_boardId);

		let value_userId = localStorage.getItem('userId') || '';
		setUserId(value_userId);

		async function getTasks() {
			const response = await fetch('http://localhost:5000/api/getTasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ boardId: value_boardId }),
			});
			const responseData = await response.json();

			console.log("haolo" + responseData);
			let todoTasks = [];
			let inProgressTasks = [];
			let doneTasks = [];
			console.log(responseData.tasks.length);
			for (let i = 0; i < responseData.tasks.length; i++) {
				if (responseData.tasks[i].STATUS === 'TODO') {
					todoTasks.push(responseData.tasks[i]);
				}
				if (responseData.tasks[i].STATUS === 'IN_PROGRESS') {
					inProgressTasks.push(responseData.tasks[i]);
				}
				if (responseData.tasks[i].STATUS === 'DONE') {
					doneTasks.push(responseData.tasks[i]);
				}
			}
			setTasksDone(doneTasks);
			setTasksInProgress(inProgressTasks);
			setTasksTODO(todoTasks);

			console.log(todoTasks);
			console.log(inProgressTasks);
			console.log(doneTasks);
		}

		getTasks();


	}, []);


	return (
		<form className="containerMare" onSubmit={sendNewTaskData}>

			<div className="header">
				<div className="addProject">
					<div className="buttonProject" onClick={() => setShowIsland(true)}>Add Task</div>
					{showUserDetails ? (
						<div onClick={handleLogout} className="buttonLogin">Log out</div>
					) : (
						<Link href="/login" className="buttonLogin">Log in</Link>
					)}

					<div className="scris">Projects</div>
					<Modal
						isOpen={showError}
						onRequestClose={() => setShowError(false)}
						contentLabel="Message Modal"
						style={{
							content: {
								width: '25%', // Set the width to 50% of the window
								height: '25%', // Set the height to 50% of the window
								margin: 'auto', // Center the modal in the window
								display: 'flex', // Use Flexbox for layout
								flexDirection: 'column', // Stack the items vertically
								justifyContent: 'center', // Center the items vertically
								alignItems: 'center', // Center the items horizontally
								backgroundColor: 'rgb(173, 216, 230)',
							},
						}}
					>
						<h4>{errorMessage}</h4>
						{!showStatus && (
							<button
								onClick={() => setShowError(false)}
								style={{
									backgroundColor: 'red',
									borderRadius: '10px',
									color: 'white',
									border: 'none',
									padding: '10px 20px',
								}}
							>
								Close
							</button>
						)}
					</Modal>
				</div>
			</div>
			<div className="columns">
				<div className="columnAssigned" onDragOver={(event) => {
					event.preventDefault();
				}}
					onDrop={(event) => {
						event.preventDefault();
						const taskId = event.dataTransfer.getData('task_id');
						const currentStatus = event.dataTransfer.getData('currentStatus');
						if (currentStatus !== 'TODO') {
							// moveTaskToDone(taskId, 'TODO');
							updateTaskStatus(taskId, 'TODO');
						}

					}}>
					<div className="title">
						TO DO
					</div>
					<div className="tasks" >
						{
							tasksTODO.map((task, index) => {
								return (
									<div key={index} className="task" draggable="true" onDragStart={(event) => {
										// const taskID = event.dataTransfer.setData('task_id', task.ID);
										// console.log(taskID);
										event.dataTransfer.setData('task_id', task.TASK_ID);
										event.dataTransfer.setData('currentStatus', 'TODO');
    									console.log(task.TASK_ID); // This will log the task ID
									}}


									>

										{/* BA PULA MEA VA UITATI SI VOI AICI */}
										<div className="taskName" >{task.TITLE}</div>
										<div className="taskDescription">{task.DESCRIPTION}</div>
										<div className="taskDeadline" >{new Date(task.DEADLINE).toISOString().substring(0, 16).replace('T', ' ')}</div>
									</div>
								);
							})
						}
					</div>
				</div>
				<div className="columnInProgress" onDragOver={(event) => {
					event.preventDefault();
				}}
					onDrop={(event) => {
						event.preventDefault();
						const taskId = event.dataTransfer.getData('task_id');
						// moveTaskToDone(taskId);
						const currentStatus = event.dataTransfer.getData('currentStatus');
						if (currentStatus !== 'IN_PROGRESS') {
							// moveTaskToDone(taskId, 'IN_PROGRESS');
							updateTaskStatus(taskId, 'IN_PROGRESS');
						}
					}}>
					<div className="title">
						In Progress
					</div>
					<div className="tasks" >
						{
							tasksInProgress.map((task, index) => {
								return (
									<div key={index} className="task" draggable="true" onDragStart={(event) => {
										// const taskID = event.dataTransfer.setData('task_id', task.ID);
										// console.log(taskID);
										event.dataTransfer.setData('task_id', task.TASK_ID);
										event.dataTransfer.setData('currentStatus', 'IN_PROGRESS');
    									console.log(task.TASK_ID); // This will log the task ID
									}}


									>

										{/* BA PULA MEA VA UITATI SI VOI AICI */}
										<div className="taskName" >{task.TITLE}</div>
										<div className="taskDescription">{task.DESCRIPTION}</div>
										<div className="taskDeadline" >{new Date(task.DEADLINE).toISOString().substring(0, 16).replace('T', ' ')}</div>
									</div>
								);
							})
						}
					</div>
				</div>
				<div className="columnDone"
					onDragOver={(event) => {
						event.preventDefault();
					}}
					onDrop={(event) => {
						event.preventDefault();
						const taskId = event.dataTransfer.getData('task_id');
						console.log(taskId)
						// moveTaskToDone(taskId);
						const currentStatus = event.dataTransfer.getData('currentStatus');
						if (currentStatus !== 'DONE') {
							// moveTaskToDone(taskId, 'DONE');
							updateTaskStatus(taskId, 'DONE');
						}
					}}
				//   SI AICI
				>
					<div className="title">
						Done
					</div>
					<div className="tasks" >
						{
							tasksDone.map((task, index) => {
								return (
									<div key={index} className="task" draggable="true" onDragStart={(event) => {
										// const taskID = event.dataTransfer.setData('task_id', task.ID);
										// console.log(taskID);
										event.dataTransfer.setData('task_id', task.TASK_ID);
										event.dataTransfer.setData('currentStatus', 'DONE');
    									console.log(task.TASK_ID); // This will log the task ID
									}}


									>

										{/* BA PULA MEA VA UITATI SI VOI AICI */}
										<div className="taskName" >{task.TITLE}</div>
										<div className="taskDescription">{task.DESCRIPTION}</div>
										<div className="taskDeadline" >{new Date(task.DEADLINE).toISOString().substring(0, 16).replace('T', ' ')}</div>
									</div>
								);
							})
						}
					</div>
				</div>
			</div>

			{showIsland &&
				<div className="overlay">
					<div className="island">
						<div className="islandHeader">
							<div className="closeButton" onClick={() => setShowIsland(false)}>Go back</div>
						</div >
						<div className="labelNume">
							Insert the name of the task:
							<input className="inputLog" type="text" name="taskName" />
						</div>
						<div className="labelDescriere">
							Provide a short description of the task:
							<input className="inputLog" type="text" name="taskDescription" />
						</div>
						<div className="labelData">
							Deadline:
							<input className="inputLog" type="date" name="taskDeadline" />
						</div>

						<Select 
							style = {customStyles}
							options={users}
							onChange={(e) => {
								console.log(e);

								assignedUser = e.value;

								console.log(assignedUser);
								// setselectedUsers(selUsers);
							}}
						/>

						<div className="label">
							<button className="button" >Create</button>
						</div>
					</div>
				</div>
			}

			{
				showTaskDetails &&

				<div className="overlay">
					<div className="island">
						<div className="islandHeader">
							<div className="closeButton" onClick={() => setShowTaskDetails(false)}>Go back</div>
						</div >

					</div>
				</div>

			}

		</form>

	);
}