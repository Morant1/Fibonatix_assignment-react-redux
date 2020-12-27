const initialState = {
    students: []
}

export function studentReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_STUDENTS':
            return {
                ...state,
                students: action.students
            }
        case 'UPDATE_STUDENTS':
            return {
                ...state, students: state.students.map(student => {
                    if (action.isSelect ? !student.isSelected : student.isSelected) student.isSelected = !student.isSelected;
                    return student;
                })
            }
        case 'UPDATE_STUDENT':
            return { ...state, students: state.students.map(student => student._id === action.student._id ? action.student : student) }

        case 'ADD_STUDENT':
            return { ...state, students: [...state.students, action.student] }

        case 'REMOVE_STUDENT':
            const students = state.students.filter(student => !student.isSelected);
            return { ...state, students }


        default:
            return state
    }
}