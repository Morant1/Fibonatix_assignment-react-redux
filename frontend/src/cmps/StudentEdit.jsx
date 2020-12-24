import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { cloudinary } from '../services/cloudinary-service.js';


export class StudentEdit extends Component {
    state = {
        student: {
            name: '',
            age: '',
            gender: '',
            city: ''
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
        console.log(this.state)
        this.props.onUpdate(this.state.student)
        // const { toy } = this.state

        // if (this.state.toy._id) {
        //     this.props.updateToy(toy)

        // } else {
        //     this.props.addToy(toy)
        // }

        // this.props.history.push('/toy')

    }

    // uploadImg = (ev) => {
    //     cloudinary.uploadImg(ev.target);
    // }

    render() {
        const { student } = this.state
        return (
            <div>
                <form onSubmit={this.onSaveStudent} className="edit-student">
                    <img src={`https://robohash.org/${student._id}`} />
                    <input type="text" value={student.name} onChange={this.handleInput} name="name" />

                    <ul>
                        <li><label>Age:</label><input type="number" value={student.age} onChange={this.handleInput} name="age" /></li>
                        <li><label>Gender:</label>
                            <select name="gender" value={student.gender} onChange={this.handleInput}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select></li>
                        <li><label>city:</label><input type="text" value={student.city} onChange={this.handleInput} name="city" /></li>
                    </ul>
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



