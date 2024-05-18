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

let toggle = false



function createBoard(event) {
  // const [showIsland, setShowIsland] = useState(false);

  event.preventDefault();
  // setShowIsland(false);
  const data = new FormData(event.target);
  const field1 = data.get('field1');
  const field2 = data.get('field2');
  console.log(field1);
  console.log(field2);
  const date = new Date();
  let currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  console.log(currentDate);

  if (field1 === "" || field2 === "") {
    alert("Please fill in all the fields");
    return;
  }
}

function logOut() {
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
  window.location.href = '/login';
}

export default function Page() {

  // get all boards once the page is loaded with useEffect

  const [boards, setBoards] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

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

  }, []);

  console.log(boards);

  

  const [showIsland, setShowIsland] = useState(false);

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
                  <input className="inputLog" type="text" name="field1" />
                </div>
                <div className="label">
                  Provide a description:
                  <input className="inputLog" type="text" name="field2" />
                </div>
                <div className="label">
                  <button className="button">Create</button>
                </div>
              </div>
            </div>
          }

          {
            boards.map((board, index) => {
              return (
                <div className="project" key={index}>
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

