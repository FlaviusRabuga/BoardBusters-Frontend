'use client';
import React from "react";
import "./style.css";
import Link from 'next/link';


export default function Page() {

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

    const valid =  validateInput(username, password);

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const responseData = await response.json();
    console.log(responseData);
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
          <Link href="/register">
            <button className="buttonLog1">Need an account?</button>
          </Link>
        </div>

      </div>
    </form>
  );






}