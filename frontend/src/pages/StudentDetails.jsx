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
        this.setState({ student }, () => { this.getPrevNext() });
    }

    getPrevNext = async () => {
        const { prevId, nextId } = await studentService.getPrevNextId(this.state.student);
        this.setState({ prevId, nextId })
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
        const { student, isEditMode, nextId, prevId } = this.state
        if (!student) return <div>Loading...</div>

        return (
            <div className="student-details">
                {!isEditMode && <div className="details-container">

                    <div className="img-container">
                        <i onClick={() => { this.onBack() }} className="back fas fa-arrow-circle-left"></i>
                        <img alt="img_profile" src={`https://randomuser.me/api/portraits/${student.gender === 'male' ? 'men' : 'women'}/${student._id}.jpg`} />
                    </div>

                    <h1><i className="fas fa-user-graduate"></i> {student.name} <span>{student.age} years old</span></h1>
                    <ul>
                        <li><span><i className="fas fa-venus-mars"></i></span>{student.gender}</li>
                        <li><span><i className="fas fa-map-marker-alt"></i></span>{student.city} ,Israel</li>
                        <li><span><i className="fas fa-at"></i></span>{student.email}</li>
                        <li><span><i className="fas fa-university"></i></span>{student.university} ,Israel</li>
                    </ul>
                    <div className="edit" onClick={() => { this.onEdit() }}><i className="fas fa-user-edit"></i> Edit</div>

                    <div className="next-prev">
                        <div className="btn prev"><Link to={`/${prevId}`}><i className="fas fa-arrow-left"></i></Link></div>
                        <div className="btn next"><Link to={`/${nextId}`}><i className="fas fa-arrow-right"></i></Link></div>
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