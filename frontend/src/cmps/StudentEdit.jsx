import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core';

// import { cloudinary } from '../services/cloudinary-service.js';


export class StudentEdit extends Component {
    state = {
        student: {
            name: '',
            age: '',
            gender: '',
            city: '',
            email: '',
            university: ''
        }
    }



    componentDidMount() {
        const { student } = this.props;
        this.setState({ student })
    }


    handleInput = ({ target }) => {
        const field = target.name
        let value = (target.type === 'number') ? +target.value : target.value;



        this.setState(prevState => {
            return {
                student: {
                    ...prevState.student,
                    [field]: value
                }
            }
        })
    }

    onSaveStudent = (ev) => {
        ev.preventDefault()
        console.log(this.state.student)
        this.props.onUpdate(this.state.student)
    }


    render() {
        const { student } = this.state
        return (
            <React.Fragment>
                <form onSubmit={this.onSaveStudent} className="edit-student">
                    <TextField label="Name:" type="text" autoComplete="off" name="name" onChange={this.handleInput} value={student.name} />
                    {/* <label htmlFor="name">Name:</label><input id="name" type="text" value={student.name} onChange={this.handleInput} name="name" /> */}
                    <TextField label="Age:" type="number" autoComplete="off" name="age" onChange={this.handleInput} value={student.age} />
                    {/* <label htmlFor="age">Age:</label><input id="age" type="number" value={student.age} onChange={this.handleInput} name="age" /> */}
                    <TextField label="Age:" type="text" autoComplete="off" name="city" onChange={this.handleInput} value={student.city} />
                    {/* <label htmlFor="city">City:</label><input id="city" type="text" value={student.city} onChange={this.handleInput} name="city" /> */}
                    <TextField label="Email:" type="text" autoComplete="off" name="email" onChange={this.handleInput} value={student.email} />
                    {/* <label htmlFor="email">Email:</label><input id="email" type="email" value={student.email} onChange={this.handleInput} name="email" /> */}
                    <TextField label="University:" type="text" autoComplete="off" name="university" onChange={this.handleInput} value={student.university} />
                    {/* <label htmlFor="university">University:</label><input id="university" type="text" value={student.university} onChange={this.handleInput} name="university" /> */}
                    <div className="select">
                    <label>Gender:</label>
                    <select name="gender" value={student.gender} onChange={this.handleInput}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                    </div>



                    <div className="btns">
                        <Button variant="contained" color="primary" className="btn" type="submit">Save</Button>
                        <Button variant="contained"  className="btn" type="button" onClick={() => { this.props.onEdit() }}>Back</Button>
                    </div>
                </form>

            </React.Fragment>
        )
    }
}


StudentEdit.propTypes = {
    student: PropTypes.object
}



