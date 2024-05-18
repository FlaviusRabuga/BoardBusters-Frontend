'use client';
import React from "react";
import "./style.css";
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Modal from 'react-modal';


export default function Page() {

  const items =['Manager', 'Employee']
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const modalMessageRegisteredSuccesfully = 'You registered succesfully!'

  function validateInput(username, password) {
    if (username === '' || password === '') {
      setModalMessage('Please fill in all fields');
      setModalIsOpen(true);
      return false;
    }
    return true;
  }

  async function sendRegisterData(event) {

    event.preventDefault();
    // console.log("buna");
    const data = new FormData(event.target);
    const username = data.get('username');
    const password = data.get('password');
    const email = data.get('email'); 

    if (selectedItem === "") {
      setModalMessage('Please select a function');
      setModalIsOpen(true);
      return false;
    }

    if (username === '' || password === '' || email === '') {
      setModalMessage('Please fill in all fields');
      setModalIsOpen(true);
      return false;
    }

    if (username.indexOf('(') !== -1 || username.indexOf(')') !== -1) {
      setModalMessage('Please do not use \'(\' or \')\' in your username');
      setModalIsOpen(true);
      return false;
    }

    if (email.indexOf('@') === -1) {
      // alert('Invalid email');
      setModalMessage('Invalid email');
      setModalIsOpen(true);
      return false;
    }

    setRegisterSuccess(true);

    console.log(username);
    console.log(password);
    console.log(email);
    console.log(selectedItem);

    // const valid =  validateInput(username, password);

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
		username,
		password,
		email,
		position: selectedItem
	  }),
    });

    const responseData = await response.json();
    console.log(responseData);
  }


  const [selectedItem, setSelectedItem] = useState("");
  return (

    <>
    <form className="containerLogIn" onSubmit={sendRegisterData}>
      <div className="pagina">
        <div className="headerLog">
          <div className="scris">Register your account
          </div>
        </div>
        <div className="input1"> <input className="inputLog" type="text" placeholder="Username" name="username">
        </input> </div>
        <div className="input2"> <input className="inputLog" type="password" placeholder="Password" password="password" name="password">
        </input> </div>
        <div className="input2"> <input className="inputLog" type="text" placeholder="Email" password="password" name="email">
        </input> </div>
        
        <h3>Choose your role</h3>
        <div style={{ textAlign: 'left' }}></div>
        <DropdownButton
          as={ButtonGroup}
          key={'down'}
          id={`dropdown-button-drop-${'down'}`}
          drop={'down'}
          variant="secondary"
          title={selectedItem}
          className = "butonFunctie"
        >
          {items.map((item, index) => (
            <Dropdown.Item key={index} onClick = { () => setSelectedItem(item)}>{item}</Dropdown.Item>
          ))
          }
        </DropdownButton>

        {/* <pre> selectedItem : {selectedItem}</pre> */}
        <div> <button className="buttonLog">Register</button> </div>
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

            <Modal
                isOpen={registerSuccess}
                onRequestClose={() => setRegisterSuccess(false)}
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
                <h4>{modalMessageRegisteredSuccesfully}</h4>
                <button 
                      onClick={() => setRegisterSuccess(false)}
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

            <Link href="/login">
            <button className="buttonLog">
            Go to Login</button>
          </Link>

      </div>
    </form>

    </>
  );
}