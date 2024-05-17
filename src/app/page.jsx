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

  // de pus si useru curent

  // const response = fetch('http://localhost:5000/api/board', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ field1, field2 }),
  // });

}

function buna() {
  console.log("clicked");

}



function faCeva() {
  console.log("clicked");
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
          <a className="project" href="/login">
            {/* href te duce la pagina proiectului ala */}
            <div className="projectName">Project 1</div>
            <div className="projectDescription">Description 1</div>
          </a>
          <a className="project" href="/login">
            {/* href te duce la pagina proiectului ala */}
            <div className="projectName">Project 2</div>
            <div className="projectDescription">Description 2</div>

          </a>
          <a className="project" href="/login">
            {/* href te duce la pagina proiectului ala */}
            <div className="projectName">Project 3</div>
            <div className="projectDescription">Description 3</div>
          </a>

          <a className="project" href="/login">
            {/* href te duce la pagina proiectului ala */}
            <div className="projectName">Project 3</div>
            <div className="projectDescription">Description 3</div>
          </a>

          <a className="project" href="/login">
            {/* href te duce la pagina proiectului ala */}
            <div className="projectName">Project 3</div>
            <div className="projectDescription">Description 3</div>
          </a>

          <a className="project" href="/login">
            {/* href te duce la pagina proiectului ala */}
            <div className="projectName">Project 3</div>
            <div className="projectDescription">Description 3</div>
          </a>

          <a className="project" href="/login">
            {/* href te duce la pagina proiectului ala */}
            <div className="projectName">Project 3</div>
            <div className="projectDescription">Description 3</div>
          </a>

          <a className="project" href="/login">
            {/* href te duce la pagina proiectului ala */}
            <div className="projectName">Project 3</div>
            <div className="projectDescription">Description 3</div>
          </a>

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

