import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


export function StudentPreview({ student }) {

    const capitalizeText = (txt) => {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    }

    return (
        <Link to={`/${student._id}`}>
            <div className="preview">
                <img src={`https://robohash.org/${student._id}`} />
                <h1>{capitalizeText(student.name)}</h1>
            </div>
        </Link>
    )
}

StudentPreview.propTypes = {
    students: PropTypes.object
}
