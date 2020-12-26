
import React from 'react'
import { Link } from 'react-router-dom';



export function NavBar() {
    return (
        <div className="navbar">
            <div className="wrapper">
                <Link to="/"><img alt="logo" src={require('../assets/img/logo.jpg').default} /></Link>
                <ul>
                    <Link to="/"><li>HOME</li></Link>
                </ul>
            </div>
        </div>
    )
}

