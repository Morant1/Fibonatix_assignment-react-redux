import { studentService } from '../../services/studentService'


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

export function addstudent(student) {
    return async dispatch => {
        try {
            console.log("add",student)
            await studentService.save(student);
            dispatch({ type: 'ADD_STUDENT', student })
        } catch (err) {
            console.log('err in addStudent', err)

        }
    }
}


export function removeStudent(id) {
    return async dispatch => {
        try {
            await studentService.remove(id);
            dispatch({ type: 'REMOVE_STUDENT', id })
        } catch (err) {
            console.log('err in removeStudent', err);
        }
    }
}


