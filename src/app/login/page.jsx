'use client';
import React from "react";
import "./style.css";
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-modal';


export default function Page() {
	
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	function validateInput(username, password) {
		if (username === '' || password === '') {
			alert('Please fill in all fields');
			return false;
		}
		return true;
	}

	async function sendLoginData(event) {

		event.preventDefault();
		const data = new FormData(event.target);
		const username = data.get('username');
		const password = data.get('password');
		console.log(username);
		console.log(password);

		const valid = validateInput(username, password);

		const response = await fetch('http://localhost:5000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		const responseData = await response.json();

		console.log(responseData);

		if (responseData.success) {
			// redirect to home page
			window.location.href = '/';

			// save username in local storage
			localStorage.setItem('username', username);
			localStorage.setItem('userId', responseData.userId);
		}
		else {
			setModalMessage(responseData.message);
      		setModalIsOpen(true);
		}

	}

	return (

		<form className="containerLogIn" onSubmit={sendLoginData}>
			<div className="pagina">
				<div className="headerLog">
					<div className="scris">Login
					</div>
				</div>
				<div className="input1"> <input className="inputLog" type="text" placeholder="Username" name="username">
				</input> </div>
				<div className="input2"> <input className="inputLog" type="password" placeholder="Password" password="password" name="password">
				</input> </div>

				<div> <button className="buttonLog"
				>Login</button> </div>
				<div>
					<p className="paragraf"> Need an account? </p>
					<Link href="/register">
						<button className="buttonLog1">
							Register here</button>
					</Link>
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
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
						backgroundColor: 'yellow',
					},
				}}
			>
				<h2>{modalMessage}</h2>
				<button
					onClick={() => setModalIsOpen(false)}
					style={{
						backgroundColor: 'red', // Set the background color to red
						borderRadius: '10px', // Round the corners
						color: 'white', // Set the text color to white
						border: 'none', // Remove the border
						padding: '10px 20px', // Add some padding
					}}
				>
					Close
				</button>
			</Modal>
		</form>

	);






}