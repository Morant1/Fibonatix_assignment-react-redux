import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { cloudinary } from '../services/cloudinary-service.js';


export class StudentEdit extends Component {
    state = {
        student: {
            name: '',
            age: '',
            gender: '',
            city: '',
            email:'',
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
            <div>
                <form onSubmit={this.onSaveStudent} className="edit-student">
                <label htmlFor="name">Name:</label><input id="name" type="text" value={student.name} onChange={this.handleInput} name="name" />
                        <label htmlFor="age">Age:</label><input id="age" type="number" value={student.age} onChange={this.handleInput} name="age" />
                        <label>Gender:</label>
                            <select name="gender" value={student.gender} onChange={this.handleInput}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        <label htmlFor="city">City:</label><input id="city" type="text" value={student.city} onChange={this.handleInput} name="city" />
                        <label htmlFor="email">Email:</label><input id="email" type="email" value={student.email} onChange={this.handleInput} name="email" />
                        <label htmlFor="university">University:</label><input id="university" type="text" value={student.university} onChange={this.handleInput} name="university" />
                    
                    <button type="submit">Save</button>
                </form>
                <button onClick={() => { this.props.onEdit() }}>Back</button>
            </div>
        )
    }
}


StudentEdit.propTypes = {
    student: PropTypes.object
}



