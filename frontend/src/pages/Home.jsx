import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { StudentList } from '../cmps/StudentList'
import { loadStudents } from '../store/actions/studentActions'

class _Home extends Component {

    state = {
        pageSize: 8,
        pageIdx: 0,
        pageCount: 0,
        chosenBtn: 0

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
        this.setState({ pageIdx, chosenBtn: pageNumber }, () => { console.log(this.state) })
    }

    get getStudents() {
        const { students } = this.props;
        const { pageIdx, pageSize } = this.state;

        var startIdx = pageIdx * pageSize;
        return students.slice(startIdx, startIdx + pageSize);
    }


    render() {
        const students = this.getStudents;
        const { pageCount, chosenBtn } = this.state;

        if (!students) return <div>Loading....</div>
        return (
            <div className="student-app">
                <StudentList students={students} />
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
    loadStudents
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)