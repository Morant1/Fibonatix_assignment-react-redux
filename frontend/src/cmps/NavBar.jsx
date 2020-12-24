import React from 'react'
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";


function _NavBar(props) {
    return (
        <div className="navbar">
            <div className="container">
           <div className="logo-conatiner">
            {props.location.pathname === '/' && <img src={require('../assets/img/logo.jpg').default}/>}
            <Link to="/">
            <h1 className="logo" style={{color: props.location.pathname !== '/' ? '#f3d1d5' :'#0f1940',textShadow: props.location.pathname === '/' ? '0px 0px 5px white, 0px 0px 5px white':'none'}}>MatchOUT</h1>
            </Link>
            </div>

        {props.location.pathname === '/' && <ul>
                <li>Have an accout?</li>
                <li className="sign"><Link to="/login">Sign in</Link></li>
            </ul>}
            </div>
            
        </div>
    )
}

export const NavBar = withRouter(_NavBar);
