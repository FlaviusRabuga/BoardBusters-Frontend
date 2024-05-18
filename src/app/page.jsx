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


function sendBoardData(event) {
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



  // PT MAI TARZIU LA API
  const proj = document.getElementsByClassName("projects")[0];
  let newProject = document.createElement("a");
  newProject.className = "project";

  let newProjectName = document.createElement("div");
  newProjectName.className = "projectName";
  newProjectName.innerHTML = field1;

  let newProjectDescription = document.createElement("div");
  newProjectDescription.className = "projectDescription";
  newProjectDescription.innerHTML = field2;

  newProject.appendChild(newProjectName);
  newProject.appendChild(newProjectDescription);
  proj.appendChild(newProject);



  // de pus si useru curent

  // const response = fetch('http://localhost:5000/api/board', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ field1, field2 }),
  // });

}



export default function Page() {

  const [showIsland, setShowIsland] = useState(false);

  return (
    <>
      <form className="containerMare" onSubmit={sendBoardData}>

        <div className="header">
          <div className="addProject">
            <div className="buttonProject" onClick={() => setShowIsland(true)}>Add Project</div>
            <Link href="/login" className="buttonLogin">Log in</Link>
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
        </div>

      </form>
    </>



  );
}

