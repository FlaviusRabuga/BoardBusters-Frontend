'use client';
import React from "react";
import { useState, useEffect } from 'react';
import "./style.css";
import Link from 'next/link';
// import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { BUILD_MANIFEST } from "next/dist/shared/lib/constants";
import Select from 'react-select'

let toggle = false





function logOut() {
	localStorage.removeItem('username');
	localStorage.removeItem('userId');
	window.location.href = '/login';
}

function goToBoard(boardId) {
	localStorage.setItem('boardId', boardId);
	window.location.href = '/board_curent';
}



export default function Page() {

	// get all boards once the page is loaded with useEffect

	const [boards, setBoards] = useState([]);
	const [username, setUsername] = useState('');
	const [userId, setUserId] = useState('');

	const [showIsland, setShowIsland] = useState(false);

	const [users, setUsers] = useState([]);
	const [selectedUsers, setselectedUsers] = useState([]);

	let selUsers = [];

	useEffect(() => {

		// get username and userId from local storage
		let value_username = localStorage.getItem('username') || '';
		setUsername(value_username);

		let value_userId = localStorage.getItem('userId') || '';
		setUserId(value_userId);

		async function getBoards() {
			const response = await fetch('http://localhost:5000/api/getBoards', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId: value_userId }),
			});

			const responseData = await response.json();
			console.log(responseData);
			setBoards(responseData.boards);
		}

		getBoards();

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


	}, []);

	async function createBoard(event) {
		// const [showIsland, setShowIsland] = useState(false);
	
		event.preventDefault();
		// setShowIsland(false);
		const data = new FormData(event.target);
		const boardName = data.get('boardName');
		const boardDescription = data.get('boardDescription');
	
		console.log(boardName);
		console.log(boardDescription);

		console.log("selUsers")
		console.log(selUsers);
	
		const response = await fetch('http://localhost:5000/api/createBoard', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				boardName,
				boardDescription,
				creator: localStorage.getItem('userId'),
				boardsUsers: selUsers
			}),
		});
	
		const responseData = await response.json();
	
		console.log(responseData);
	
	}

	console.log(boards); // sa dam muie ls js
	console.log(users);





	return (
		<>
			<form className="containerMare" onSubmit={createBoard}>

				<div className="header">
					<div className="addProject">
						<div className="buttonProject" onClick={() => setShowIsland(true)}>Add Project</div>
						{(username == '') &&
							<Link href="/login" className="buttonLogin">Log in</Link>
						}
						{(username !== '') &&
							<div className="buttonLogin" onClick={() => logOut()}>Log out</div>
						}

						<div className="scris">Projects</div>
					</div>
				</div>
				<div className="projects">


					{showIsland &&
						<div className="overlay">
							<div className="island">
								<div className="islandHeader">
									<div className="closeButton" onClick={() => setShowIsland(false)}>Go back</div>
								</div >
								<div className="label">
									Insert the name of the project:
									<input className="inputLog" type="text" name="boardName" />
								</div>
								<div className="label">
									Provide a description:
									<input className="inputLog" type="text" name="boardDescription" />
								</div>

								<Select options={users}
									onChange={(e) => {
										console.log(e);
										
										selUsers = e.map((user) => {
											return user.value;
										});
										console.log(selUsers);
										// setselectedUsers(selUsers);
									}} isMulti
								/>


								<div className="label">
									<button className="button">Create</button>
								</div>
							</div>
						</div>
					}

					{
						boards.map((board, index) => {
							return (
								<div className="project" key={index} onClick={() => goToBoard(board.BOARD_ID)}>
									<div className="projectName">{board.NAME}</div>
									<div className="projectDescription">{board.DESCRIPTION}</div>
								</div>
							);
						})
					}
				</div>

			</form>
		</>



	);
}

