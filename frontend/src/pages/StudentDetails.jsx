import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import { StudentEdit } from '../cmps/StudentEdit'
import { studentService } from '../services/studentService'
import { updateStudent } from '../store/actions/studentActions'


class _StudentDetails extends Component {

    state = {
        isEditMode: false,
        nextId: null,
        prevId: null

    }

    componentDidMount() {
        this.loadStudent();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            this.loadStudent()
        }
    }

    loadStudent = async () => {
        const studentId = this.props.match.params._id;
        const student = await studentService.getById(studentId);
        this.setState({ student },()=>{this.getPrevNext()});


    }

    getPrevNext = async () => {
        const { prevId, nextId } = await studentService.getPrevNextId(this.state.student);
        this.setState({ prevId, nextId })
    }

    capitalizeText = (txt) => {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    }

    onBack = () => {
        this.props.history.push('/');
    }
    onEdit = () => {
        const isEditMode = !this.state.isEditMode;
        this.setState({ isEditMode });
    }

    updateStudent = async (currStudent) => {
        await this.props.updateStudent(currStudent);
        await this.loadStudent();

        this.onEdit();
    }

    render() {
        const { student, isEditMode,nextId, prevId } = this.state
        if (!student) return <div>Loading...</div>

        return (
            <div className="student-details">

                <button onClick={() => { this.onBack() }}>Back</button>

                <img alt="img_profile" src={`https://randomuser.me/api/portraits/${student.gender === 'male' ? 'men' : 'women'}/${student._id}.jpg` }/>

                {!isEditMode && <div className="details-container">
                    <h1>{this.capitalizeText(student.name)}</h1>
                    <ul>
                        <li><span>Age:</span>{student.age}</li>
                        <li><span>Gender:</span>{this.capitalizeText(student.gender)}</li>
                        <li><span>City:</span>{this.capitalizeText(student.city)},Israel</li>
                        <li><span>Email:</span>{this.capitalizeText(student.email)}</li>
                        <li><span>University:</span>{this.capitalizeText(student.university)},Israel</li>
                    </ul>
                    <button onClick={() => { this.onEdit() }}>Edit</button>

                    <div className="next-prev">
                    <div className="btn prev"><Link to={`/${prevId}`}><i className="fas fa-arrow-circle-left"></i></Link></div>
                    <div className="btn next"><Link to={`/${nextId}`}><i className="fas fa-arrow-circle-right"></i></Link></div>
                </div>

                </div>}

                {isEditMode && <div className="edit-container">
                    <StudentEdit student={student} onEdit={this.onEdit} onUpdate={this.updateStudent} />
                </div>}

            </div>
        )
    }
}



_StudentDetails.propTypes = {
    students: PropTypes.array
}

const mapStateToProps = state => {
    return {
        students: state.studentReducer.students
    }
}

const mapDispatchToProps = {
    updateStudent
}

export const StudentDetails = connect(mapStateToProps, mapDispatchToProps)(_StudentDetails)