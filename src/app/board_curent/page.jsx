'use client';
import React from "react";
import "./style.css";
import Link from 'next/link';
import { useState } from 'react';



export default function Page() {

    const [showIsland, setShowIsland] = useState(false);


    return (
        <form className="containerMare">

        <div className="header">
        <div className="addProject">
            <div className="buttonProject" onClick={() => setShowIsland(true)}>Add Project</div>
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
        </form>

    );
}