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
let gStudents;



async function query() {

    gStudents = storageService.loadFromStorage(KEY);
    if (!gStudents || !gStudents.length) {
        let res = await axios.get(`${BASE_URL}`)
        gStudents = res.data;
        storageService.saveToStorage(KEY, gStudents);
    }

    console.log("gStudents",gStudents)
    return gStudents
}

async function getById(studentId) {
    let res = await axios.get(`${BASE_URL}/${studentId}`)
    return res.data;

}

async function remove(studentId) {
    await axios.delete(`${BASE_URL}/${studentId}`)
}

async function save(student) {
    let res = await axios.put(`${BASE_URL}/${student._id}`, student);
    console.log(res.data)
    return res.data;
}


async function getPrevNextId(currStudent){
    if (!gStudents) gStudents = storageService.loadFromStorage(KEY);

    const currIdx = gStudents.findIndex(student => student._id === currStudent._id)
    const nextStudent = gStudents[currIdx + 1] || gStudents[0]
    const prevStudent = gStudents[currIdx - 1] || gStudents[gStudents.length - 1]

     return {
       prevId: prevStudent._id,
       nextId: nextStudent._id
     }
}