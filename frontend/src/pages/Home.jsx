import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { StudentList } from '../cmps/StudentList'
import { loadStudents, removeStudent, updateStudent, selectAll } from '../store/actions/studentActions'
import { studentService } from '../services/studentService'



class _Home extends Component {

    state = {
        pageSize: 8,
        pageCount: 0,
        checked: false

    }

    async componentDidMount() {
        await this.props.loadStudents();
        this.calcPageCount();
        this.setChecked();

        const { chosenBtn, pageIdx } = await studentService.getPageData();
        this.setState({ chosenBtn, pageIdx })
    }

    calcPageCount = () => {
        const { students } = this.props
        const pageCount = Math.ceil(students.length / this.state.pageSize);
        this.setState({ pageCount })
    }

    onNextPage = (pageNumber) => {
        const { pageCount } = this.state;
        const pageIdx = (pageNumber + 1 <= pageCount) ? pageNumber : 0;
        const chosenBtn = pageNumber;

        studentService.setPageData(chosenBtn, pageIdx);
        this.setState({ pageIdx, chosenBtn })
    }

    select = async (student) => {
        const currStudent = { ...student };
        currStudent.isSelected = !currStudent.isSelected;
        await this.props.updateStudent(currStudent);

        this.setChecked()
    }

    setChecked = () => {
        const isSelectedAll = this.props.students.every(student => student.isSelected);
        if (!this.state.checked && isSelectedAll) this.setState({ checked: true })
        if (this.state.checked && !isSelectedAll) this.setState({ checked: false })
    }

    onRemoveBtn = async () => {
        const { chosenBtn } = this.state
        await this.props.removeStudent();
        this.calcPageCount()

        const isSelectedAll = this.getStudents.every(student => student.isSelected);
        if (isSelectedAll && !!chosenBtn) this.onNextPage(chosenBtn - 1)
        if (!this.props.students.length) this.setState({ checked: false })

    }


    handleInput = (ev) => {
        const checked = !this.state.checked
        this.props.selectAll(checked)
        this.setState({ checked })
    }


    get getStudents() {
        const { students } = this.props;
        const { pageIdx, pageSize } = this.state;

        var startIdx = pageIdx * pageSize;
        return students.slice(startIdx, startIdx + pageSize);
    }

    get getRemoveSign() {
        const isSelected = this.props.students.find(student => student.isSelected)
        if (isSelected) return true;
        else return false;
    }



    render() {
        const students = this.getStudents;
        const { pageCount, chosenBtn, checked } = this.state;

        if (!students) return <div>Loading....</div>
        return (
            <div className="student-app">
                {this.getRemoveSign ?
                    <i className="trash fas fa-trash-alt" onClick={this.onRemoveBtn}></i>
                    : ''}


                <div className="wrapper">
                    <div className="checkbox">
                        <FormControlLabel
                            control={<Checkbox checked={checked} onChange={this.handleInput} style={{
                                color: "#88c5f9",
                                backgroundColor: "white"
                            }} />}
                            label="Select all"
                        />
                    </div>
                    <StudentList students={students} select={this.select} />
                    <div className="navigation">
                        {[...Array(pageCount)].map((val, idx) => {
                            return (
                                <button className={`btn ${chosenBtn === idx ? 'color' : ''}`}
                                    key={idx} onClick={() => { this.onNextPage(idx) }}>{idx + 1}</button>
                            )
                        })}
                    </div>
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
    removeStudent,
    updateStudent,
    selectAll
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)