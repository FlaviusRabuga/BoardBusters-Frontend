'use client';
import React from "react";
import { useState, useEffect } from 'react';
import "./style.css";
import Link from 'next/link';
// import {Link} from 'react-router-dom';


function sendBoardData(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const field1 = data.get('field1');
  const field2 = data.get('field2');
  console.log(field1);
  console.log(field2);

  // de pus si useru curent

  const response = fetch('http://localhost:5000/api/board', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ field1, field2 }),
  });

}

export default function Page() {

  const [showIsland, setShowIsland] = useState(false);


  // useEffect(() => {
  //   // This code runs after the component has mounted
  //   setShowIsland(true);
  // }, []);
  return (

    <div className="container">
      <div className="header">
        <div className="addProject">
          <button className="button" onClick={() => setShowIsland(true)}>Add Project</button>
          <Link href="/login" className="buttonLogin">Log in</Link>
          <div className="scris">Projects</div>
        </div>
      </div>
      <div className="projects">
        <div className="project">
          <div className="projectName">Project 1</div>
          <div className="projectDescription">Description 1</div>
        </div>
        <div className="project">
          
          <div className="projectName">Project 2</div>
          <div className="projectDescription">Description 2</div>
          
        </div>
        <div className="project" onClick = {() => console.log("clicked")}>
          <div className="projectName">Project 3</div>
          <div className="projectDescription">Description 3</div>
        </div>
        {showIsland &&
          <div className="overlay">
            <div className="island">
              <div className="islandHeader">
                <div className="closeButton" onClick={() => setShowIsland(false)}>Go back</div>
              </div >
              
              <form className="formBoard" >
                <div className = "label">
                <label className = "scris">
                  Insert the name of the project:
                  <input className = "inputLog" type="text" name="field1" />
                </label>
                </div>
                <label className = "scris">
                  Provide a description:
                  <input className = "inputLog" type="text" name="field2" />
                </label >
                <input className= "submitButton" type="submit" value="Submit" />
              </form>
            </div>
          </div>
        }
      </div>
    </div>


  );
}

