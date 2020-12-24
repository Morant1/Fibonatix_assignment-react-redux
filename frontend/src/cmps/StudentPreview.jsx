import React from 'react'
import PropTypes from 'prop-types'


export function StudentPreview({ student }) {

    const capitalizeText = (txt) => {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    }

    return (
        <div className="preview">
            <img src={`https://robohash.org/${student._id}`} />
            <h1>{capitalizeText(student.name)}</h1>
            <ul>
                <li><span>Age:</span>{student.age}</li>
                <li><span>Gender:</span>{capitalizeText(student.gender)}</li>
                <li><span>city:</span>{capitalizeText(student.city)},Israel</li>
            </ul>
        </div>
    )
}

StudentPreview.propTypes = {
    students: PropTypes.object
}
