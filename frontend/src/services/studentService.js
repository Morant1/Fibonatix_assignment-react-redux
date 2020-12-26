import axios from 'axios'
import { storageService } from './storageService'
const BASE_URL = 'http://localhost:3001/student'


export const studentService = {
    query,
    getById,
    remove,
    save,
    getPrevNextId,
    getPageData,
    setPageData,
    selectAll
}



const KEY_STUDENTS = 'STUDENTS';
const KEY_PAGE = "PAGE"
let gStudents = storageService.loadFromStorage(KEY_STUDENTS);
let gPageData = storageService.loadFromStorage(KEY_PAGE) || {chosenBtn:0,pageIdx:0}



async function query() {
    if (!gStudents || !gStudents.length) {
        let res = await axios.get(`${BASE_URL}`)
        gStudents = res.data;
        storageService.saveToStorage(KEY_STUDENTS, gStudents);
    }

    return gStudents
}

function getById(studentId) {
    const student = gStudents.find(student => student._id === studentId);
    return Promise.resolve(student);
}

function remove() {
    gStudents = gStudents.filter(student => !student.isSelected)
    storageService.saveToStorage(KEY_STUDENTS,gStudents);
}

function save(currStudent) {
    const idx = gStudents.findIndex(student => student._id === currStudent._id)
    gStudents.splice(idx,1,currStudent);
    storageService.saveToStorage(KEY_STUDENTS,gStudents)

    return Promise.resolve(currStudent);
}


function getPrevNextId(currStudent) {

    const currIdx = gStudents.findIndex(student => student._id === currStudent._id)
    const nextStudent = gStudents[currIdx + 1] || gStudents[0]
    const prevStudent = gStudents[currIdx - 1] || gStudents[gStudents.length - 1]

    return Promise.resolve({
        prevId: prevStudent._id,
        nextId: nextStudent._id
    })
}

function getPageData() {
    return Promise.resolve(gPageData)
}
function setPageData(chosenBtn,pageIdx) {
    gPageData = {chosenBtn,pageIdx};
    storageService.saveToStorage(KEY_PAGE,gPageData)

}

function selectAll(isSelect) {

    gStudents = gStudents.map(student => {
        if (isSelect ? !student.isSelected: student.isSelected ) student.isSelected = !student.isSelected
        return student;
    })
    storageService.saveToStorage(KEY_STUDENTS,gStudents);
}



