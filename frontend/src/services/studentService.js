import axios from 'axios'
import { storageService } from './storageService'
const BASE_URL = 'http://localhost:3001/student'


export const studentService = {
    query,
    getById,
    remove,
    save
}



const KEY = 'STUDENTS';
let gStudents;



async function query() {

    gStudents = storageService.loadFromStorage(KEY);
    if (!gStudents || !gStudents.length) {
        let res = await axios.get(`${BASE_URL}`)
        gStudents = res.data;
        storageService.saveToStorage(KEY, gStudents);
    }

    return gStudents
}

async function getById(studentId) {
    const res = await axios.get(`${BASE_URL}/${studentId}`)
    return res.data;

}

async function remove(studentId) {
    await axios.delete(`${BASE_URL}/${studentId}`)
}

async function save(student) {
    let res;
    if (student._id) {
        res = await axios.put(`${BASE_URL}/${student._id}`, student);
    } else {
        res = await axios.post(BASE_URL, student);
    }
    return res.data;
}


