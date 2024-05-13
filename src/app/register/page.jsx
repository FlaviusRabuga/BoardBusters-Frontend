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
    // const email = data.get('email'); 
    console.log(username);
    console.log(password);
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
          <div className="scris">Login
          </div>
        </div>
        <div className="input1"> <input className="inputLog" type="text" placeholder="Username" name="username">
        </input> </div>
        <div className="input2"> <input className="inputLog" type="password" placeholder="Password" password="password" name="password">
        </input> </div>
        <div className="input2"> <input className="inputLog" type="text" placeholder="email" password="password" name="email">
        </input> </div>
        
        <Dropdown>
          <Dropdown.Toggle  variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {items.map((item, index) => (
              <Dropdown.Item key={index} onClick = { () => setSelectedItem(item)}>{item}</Dropdown.Item>
            ))
          }
          </Dropdown.Menu>
        </Dropdown>
        <pre> selectedItem : {selectedItem}</pre>

        
        

        <div> <button className="buttonLog">Login</button> </div>
        

      </div>
    </form>

    </>
  );


  







}