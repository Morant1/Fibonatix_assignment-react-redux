import axios from 'axios'
import { storageService } from './storageService'
const BASE_URL = 'http://localhost:3001/student'


export const studentService = {
    query,
    getById,
    remove,
    save,
    getPrevNextId
}



const KEY = 'STUDENTS';
let gStudents = storageService.loadFromStorage(KEY);



async function query() {

    if (!gStudents || !gStudents.length) {
        let res = await axios.get(`${BASE_URL}`)
        gStudents = res.data;
        storageService.saveToStorage(KEY, gStudents);
    }

    return gStudents
}

function getById(studentId) {

    const student = gStudents.find(student => student._id === studentId);
    console.log(student)
    return Promise.resolve(student);

    // OR
    // let res = await axios.get(`${BASE_URL}/${studentId}`)
    // return res.data;

}

async function remove(studentId) {
    await axios.delete(`${BASE_URL}/${studentId}`)
}

async function save(student) {
    let res = await axios.put(`${BASE_URL}/${student._id}`, student);
    return res.data;
}


async function getPrevNextId(currStudent) {

    const currIdx = gStudents.findIndex(student => student._id === currStudent._id)
    const nextStudent = gStudents[currIdx + 1] || gStudents[0]
    const prevStudent = gStudents[currIdx - 1] || gStudents[gStudents.length - 1]

    return {
        prevId: prevStudent._id,
        nextId: nextStudent._id
    }
}