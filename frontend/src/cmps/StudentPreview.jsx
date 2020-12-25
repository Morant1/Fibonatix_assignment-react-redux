import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";



export class StudentPreview extends Component {

    state = {
        checked:false
    }

    
    handleInput = (ev) => {
        const checked = ev.target.checked;
        this.setState({checked},()=>{
            this.props.remove(this.props.student._id)
        });
    }


    render() {
        const {student} = this.props;
        const {checked} = this.state;
        return (
            
                <div className="preview">
                    <Checkbox
                    checked={checked}
                    onChange={this.handleInput}
                    style ={{
                        color: "#88c5f9",
                        backgroundColor: "white"
                      }}
                />
                    <img src={`https://randomuser.me/api/portraits/${student.gender === 'male' ? 'men' : 'women'}/${student._id}.jpg`} alt="img_profile" />
                    <div className="student-info">
                    <h1>{student.name}</h1>
                    <h2>{student.email}</h2>
                    </div>
                    <h2 className="university">{student.university}</h2>
                    <Link to={`/${student._id}`}><button>Details</button></Link>
                </div>
            
        )
    }
}

StudentPreview.propTypes = {
    students: PropTypes.object
}
