import { studentService } from '../../services/studentService'

// THUNK
export function loadStudents() {
    return async dispatch => {
        try {
            const students = await studentService.query();
            dispatch({ type: 'SET_STUDENTS', students })
        } catch (err) {
            console.log('err in loadStudents', err);
        }

    }
}


// THUNK
export function updateStudent(student) {
    return async dispatch => {
        try {
            await studentService.save(student);
            dispatch({ type: 'UPDATE_STUDENT', student })
        } catch (err) {
            console.log('err in updateStudent', err)

        }
    }
}

// THUNK
export function addstudent(student) {
    return async dispatch => {
        try {
            await studentService.save(student);
            dispatch({ type: 'ADD_STUDENT', student })
        } catch (err) {
            console.log('err in addStudent', err)

        }
    }
}


export function removeStudent() {
    return dispatch => {
        try {
            studentService.remove();
            dispatch({ type: 'REMOVE_STUDENT' })
        } catch (err) {
            console.log('err in removeStudent', err);
        }
    }
}


export function selectAll(isSelect) {
    return dispatch => {
        try {
            studentService.selectAll(isSelect);
            dispatch({ type: 'UPDATE_STUDENTS' , isSelect})
        } catch (err) {
            console.log('err in updateStudents', err);
        }
    }
}




