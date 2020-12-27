import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core';

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
                    <TextField label="Age:" type="number" autoComplete="off" name="age" onChange={this.handleInput} value={student.age} />
                    <TextField label="Age:" type="text" autoComplete="off" name="city" onChange={this.handleInput} value={student.city} />
                    <TextField label="Email:" type="email" autoComplete="off" name="email" onChange={this.handleInput} value={student.email} />
                    <TextField label="University:" type="text" autoComplete="off" name="university" onChange={this.handleInput} value={student.university} />
                    <div className="select">
                        <label>Gender:</label>
                        <select name="gender" value={student.gender} onChange={this.handleInput}>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    </div>

                    <div className="btns">
                        <Button variant="contained" color="primary" className="btn" type="submit">Save</Button>
                        <Button variant="contained" className="btn" type="button" onClick={() => { this.props.onEdit() }}>Back</Button>
                    </div>
                </form>

            </React.Fragment>
        )
    }
}


StudentEdit.propTypes = {
    student: PropTypes.object
}



