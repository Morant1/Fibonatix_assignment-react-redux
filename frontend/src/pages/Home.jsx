import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { StudentList } from '../cmps/StudentList'
import { loadStudents,removeStudent } from '../store/actions/studentActions'


class _Home extends Component {

    state = {
        pageSize: 8,
        pageIdx: 0,
        pageCount: 0,
        chosenBtn: 0,
        idsToRemove: []
        // Make it in global state!

    }

    async componentDidMount() {
        await this.props.loadStudents();
        this.calcPageCount()
    }

    calcPageCount = () => {
        const { students } = this.props
        const pageCount = Math.ceil(students.length / this.state.pageSize);
        this.setState({ pageCount })
    }

    onNextPage = (pageNumber) => {
        const { pageCount } = this.state;
        const pageIdx = (pageNumber + 1 <= pageCount) ? pageNumber : 0;
        this.setState({ pageIdx, chosenBtn: pageNumber })
    }

    get getStudents() {
        const { students } = this.props;
        const { pageIdx, pageSize } = this.state;

        var startIdx = pageIdx * pageSize;
        return students.slice(startIdx, startIdx + pageSize);
    }
    remove = (studentId) => {
        let idsToRemove;
        const id = this.state.idsToRemove.find(id => id === studentId)
        if (!id) {
            console.log("needs to add")
            idsToRemove = [...this.state.idsToRemove, studentId];
        } else {
            console.log("needs to remove")
            idsToRemove = this.state.idsToRemove.filter(id => id !== studentId);
        }

        this.setState({ idsToRemove }, () => { console.log(this.state.idsToRemove) })

    }

    onRemoveBtn = () => {
        this.props.removeStudent(this.state.idsToRemove);
        this.setState({ idsToRemove : [] },()=>{this.calcPageCount()});
    }


    render() {
        const students = this.getStudents;
        const { pageCount, chosenBtn, idsToRemove } = this.state;

        if (!students) return <div>Loading....</div>
        return (
            <div className="student-app">
                {idsToRemove.length ?
                    <i className="fas fa-trash-alt" onClick={this.onRemoveBtn}></i>
                    : ''}
                <StudentList students={students} remove={this.remove} />
                <div className="navigation">
                    {[...Array(pageCount)].map((val, idx) => {
                        return (
                            <button className={`btn ${chosenBtn === idx ? 'color' : ''}`}
                                key={idx} onClick={() => { this.onNextPage(idx) }}>{idx + 1}</button>
                        )
                    })}
                </div>
            </div>
        )
    }
}

_Home.propTypes = {
    students: PropTypes.array
}

const mapStateToProps = state => {
    return {
        students: state.studentReducer.students
    }
}

const mapDispatchToProps = {
    loadStudents,
    removeStudent
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)