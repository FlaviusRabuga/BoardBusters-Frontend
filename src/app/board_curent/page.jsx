'use client';
import React, { useEffect } from "react";
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


  // adaugare in assigned

  // const assigned = document.querySelector('.columnAssigned .tasks');

  // const task = document.createElement('div');
  // const taskName = document.createElement('div');
  // const taskDescription = document.createElement('div');
  // const taskDeadline = document.createElement('div');

  // task.classList.add('task');
  // taskName.classList.add('taskName');
  // taskDescription.classList.add('taskDescription');
  // taskDeadline.classList.add('taskDeadline');

  // taskName.textContent = name;
  // taskDescription.textContent = descr;
  // taskDeadline.textContent = time;

  // task.appendChild(taskName);
  // task.appendChild(taskDescription);
  // task.appendChild(taskDeadline);

  // assigned.appendChild(task);

  // adauga in inProgress

  const inProgress = document.querySelector('.columnInProgress .tasks');

  const taskInProgress = document.createElement('div');
  const taskNameInProgress = document.createElement('div');
  const taskDescriptionInProgress = document.createElement('div');
  const taskDeadlineInProgress = document.createElement('div');


  taskInProgress.addEventListener('click', () => {
    setShowTaskDetails(true)
  }
  )

  taskInProgress.classList.add('task');
  taskNameInProgress.classList.add('taskName');
  taskDescriptionInProgress.classList.add('taskDescription');
  taskDeadlineInProgress.classList.add('taskDeadline');

  taskNameInProgress.textContent = name;
  taskDescriptionInProgress.textContent = descr;
  taskDeadlineInProgress.textContent = time;

  taskInProgress.appendChild(taskNameInProgress);
  taskInProgress.appendChild(taskDescriptionInProgress);
  taskInProgress.appendChild(taskDeadlineInProgress);

  inProgress.appendChild(taskInProgress);


}

export default function Page() {

  const [showIsland, setShowIsland] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [tasksTODO, setTasksTODO] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);

  const [boardId, setBoardId] = useState('');

  useEffect(() => {


    let value_boardId = localStorage.getItem('boardId') || '';
    setBoardId(value_boardId);

    async function getTasks() {
      const response = await fetch('http://localhost:5000/api/getTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boardId: value_boardId }),
      });
      const responseData = await response.json();

      console.log("haolo" + responseData);
      let todoTasks = [];
      let inProgressTasks = [];
      let doneTasks = [];
      console.log(responseData.tasks.length);
      for (let i = 0; i < responseData.tasks.length; i++) {
        if (responseData.tasks[i].STATUS === 'TODO') {
          todoTasks.push(responseData.tasks[i]);
        }
        if (responseData.tasks[i].STATUS === 'IN_PROGRESS') {
          inProgressTasks.push(responseData.tasks[i]);
        }
        if (responseData.tasks[i].STATUS === 'DONE') {
          doneTasks.push(responseData.tasks[i]);
        }
      }
      setTasksDone(doneTasks);
      setTasksInProgress(inProgressTasks);
      setTasksTODO(todoTasks);
    }

    getTasks();
    

  }, []);

  console.log("todo "+tasksTODO);
  console.log("proges " +tasksInProgress);
  console.log("done" +tasksDone);


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
    <form className="containerMare" onSubmit={sendNewTaskData}>

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
            {
              tasksTODO.map((task, index) => {
                return (
                  <div key={index} className="task">
                    <div className="taskName">{task.TITLE}</div>
                    <div className="taskDescription">{task.DESCRIPTION}</div>
                    <div className="taskDeadline">{task.DEADLINE}</div>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="columnInProgress">
          <div className="title">
            In Progress
          </div>
          <div className="tasks">
          {
            tasksInProgress.map((task, index) => {
              return (
                <div key={index} className="task">
                  <div className="taskName">{task.TITLE}</div>
                  <div className="taskDescription">{task.DESCRIPTION}</div>
                  <div className="taskDeadline">{task.DEADLINE}</div>
                </div>
              );
            })
          }
          </div>
        </div>
        <div className="columnDone">
          <div className="title">
            Done
          </div>
          <div className="tasks">
            {
              tasksDone.map((task, index) => {
                return (
                  <div key={index} className="task">
                    <div className="taskName">{task.TITLE}</div>
                    <div className="taskDescription">{task.DESCRIPTION}</div>
                    <div className="taskDeadline">{task.DEADLINE}</div>
                  </div>
                );
              })
            }
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
              <button className="button" >Create</button>
            </div>
          </div>
        </div>
      }

      {
        showTaskDetails &&

        <div className="overlay">
          <div className="island">
            <div className="islandHeader">
              <div className="closeButton" onClick={() => setShowTaskDetails(false)}>Go back</div>
            </div >

          </div>
        </div>

      }

    </form>

  );
}