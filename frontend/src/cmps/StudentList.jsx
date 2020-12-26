import React from 'react'
import PropTypes from 'prop-types'
import {StudentPreview} from './StudentPreview'


export function StudentList({ students,select }) {
    return (
        <div className="list">
            {students.map(student => <StudentPreview student={student} key={student._id} select={select} />)}
        </div>
    )
}

StudentList.propTypes = {
    students: PropTypes.array
}
