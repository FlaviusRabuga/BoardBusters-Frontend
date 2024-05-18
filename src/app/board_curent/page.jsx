'use client';
import React from "react";
import "./style.css";
import Link from 'next/link';
import { useState } from 'react';

function sendNewTaskData(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = data.get('field1');
    const descr = data.get('field2');
    const time = data.get('field3');
    console.log(name);
    console.log(descr);
    console.log(time);


    const tasks = document.getElementsByClassName("tasks")[0];

    let newTask = document.createElement("div");
    newTask.className = "task";
    newTask.innerHTML = name;
}

export default function Page() {

    const [showIsland, setShowIsland] = useState(false);

    // const [tasks, setTasks] = useState({
    //     assigned: ['Task1', 'Task2'],
    //     inProgress: [],
    //     done: []
    // });


    // function handleDragStart(e) {
    //     e.dataTransfer.setData('text/plain', e.target.textContent);
    // }
    
    // function handleDragOver(e) {
    //     e.preventDefault(); // Necessary to allow drop
    // }
    
    // function handleDrop(e, column) {
    //     e.preventDefault();
    //     const task = e.dataTransfer.getData('text');
    
    //     // Remove the task from its original column and add it to the new column
    //     setTasks(prevTasks => {
    //         const newTasks = {...prevTasks};
    //         Object.keys(newTasks).forEach(key => {
    //             newTasks[key] = newTasks[key].filter(t => t !== task);
    //         });
    //         newTasks[column].push(task);
    //         return newTasks;
    //     });
    // }

    return (
        <form className="containerMare" onSubmit = {sendNewTaskData}>

        <div className="header">
        <div className="addProject">
            <div className="buttonProject" onClick={() => setShowIsland(true)}>Add Task</div>
            <Link href="/login" className="buttonLogin">Log in</Link>
            <div className="scris">Projects</div>
        </div>
        </div>
        <div className="columns">
            <div className="columnAssigned">
                <div className="title">
                    Assigned
                </div>
                <div className="tasks">
                {/* <div className="tasks" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'assigned')}>
                    {tasks.assigned.map((task, index) => (
                        <div key={index} className="task" draggable="true" onDragStart={handleDragStart}>{task}</div>
                    ))}
                </div> */}
                    {/* <div className="task" draggable="true" onDragStart={handleDragStart}>Task1</div> */}
                    <div className="task">Task1</div>
                    <div className="task">Task2</div>
                </div>
            </div>
            <div className="columnInProgress">
                <div className="title">
                    In Progress
                </div>
                <div className="tasks">
                    <div className="task">Task1</div>
                    <div className="task">Task2</div>
                    <div className="task">Task3</div>
                </div>
            </div>
            <div className="columnDone">
                <div className="title">
                    Done
                </div>
                <div className="tasks">
                    <div className="task">Task1</div>
                </div>
            </div>
        </div>

        {showIsland &&
            <div className="overlay">
              <div className="island">
                <div className="islandHeader">
                  <div className="closeButton" onClick={() => setShowIsland(false)}>Go back</div>
                </div >
                <div className="labelNume">
                  Insert the name of the task:
                  <input className="inputLog" type="text" name="field1" />
                </div>
                <div className="labelDescriere">
                  Provide a short description of the task:
                  <input className="inputLog" type="text" name="field2" />
                </div>
                <div className="labelData">
                    Deadline:
                    <input className="inputLog" type="date" name="field3" />
                </div>
                <div className="label">
                  <button  className="button" >Create</button>
                </div>
              </div>
            </div>
          }
          
        </form>

    );
}