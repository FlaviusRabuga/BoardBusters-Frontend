'use client';
import React from "react";
import "./style.css";
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


export default function Page() {

  const items =['Manager', 'Employee']

  function validateInput(username, password) {
    if (username === '' || password === '') {
      alert('Please fill in all fields');
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
      alert('Please select a function');
      return false;
    }

    if (username === '' || password === '' || email === '') {
      alert('Please fill in all fields');
      return false;
    }

    if (email.contains('@') === false) {
      alert('Please enter a valid email');
      return false;
    }
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(selectedItem);

    // const valid =  validateInput(username, password);

    // const response = await fetch('http://localhost:5000/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, password }),
    // });

    // const responseData = await response.json();
    // console.log(responseData);
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
        
        <Dropdown>
          <Dropdown.Toggle  variant="success" id="dropdown-basic" className = "butonFunctie">
            Alege functia
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {items.map((item, index) => (
              <Dropdown.Item key={index} onClick = { () => setSelectedItem(item)}>{item}</Dropdown.Item>
            ))
          }
          </Dropdown.Menu>
        </Dropdown>
        <pre> selectedItem : {selectedItem}</pre>
        <div> <button className="buttonLog">Register</button> </div>
        

      </div>
    </form>

    </>
  );


  







}