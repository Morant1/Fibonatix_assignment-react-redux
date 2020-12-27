import React from 'react'
import { Link } from 'react-router-dom';



export function NavBar() {
    return (
        <div className="navbar">
            <div className="wrapper">
                <Link className="logo" to="/"><img alt="logo" src={require('../assets/img/logo.jpg').default} />Students</Link>
                <ul>
                    <Link to="/"><li>HOME</li></Link>
                </ul>
            </div>
        </div>
    )
}

