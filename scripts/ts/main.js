import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
/**
 * Attributes for student section
 */
var studentName = document.getElementById('student-name');
var studentImage = document.getElementById('student-image');
var studentTable = document.getElementById('student-table');
/**
 * Atributes for courses section
 */
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByRange = document.getElementById("button-filterByRange");
var inputSearchMin = document.getElementById("search-min");
var inputSearchMax = document.getElementById("search-max");
/**
 * Atributes for the section zone
 */
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByRange.onclick = function () { return applyFilterByRange(); };
renderStudentTable(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML += "" + getTotalCredits(dataCourses);
/**
 * Llena los datos de la tabla de información del estudiante
 * @param student Estudiante para representar
 */
function renderStudentTable(student) {
    console.log('Desplegando estudiante');
    studentName == null ? '' : studentName.innerHTML = "" + student.nombre;
    studentImage == null ? '' : studentImage.src = "" + student.image;
    var tBodyElement = document.createElement("tbody");
    tBodyElement.innerHTML = "<tr><td>C\u00F3digo</td><td>" + student.codigo + "</td></tr>\n                              <tr><td>Cedula</td><td>" + student.cedula + "</td></tr>\n                              <tr><td>Edad</td><td>" + student.edad + " A\u00F1os</td></tr>\n                              <tr><td>Direcci\u00F3n</td><td>" + student.direccion + "</td></tr>\n                              <tr><td>Tel\u00E9fono</td><td>" + student.telefono + "</td></tr>";
    studentTable.appendChild(tBodyElement);
}
/**
 * Llena los datos de la tabla de cursos del estudiante
 * @param courses Cursos a representar
 */
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByRange() {
    var min = inputSearchMin.value.length == 0 ? parseInt(inputSearchMin.value) : parseInt(inputSearchMin.value);
    var max = inputSearchMax.value.length == 0 ? parseInt(inputSearchMax.value) : parseInt(inputSearchMax.value);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByRange(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByRange(min, max, courses) {
    return courses.filter(function (c) { return c.credits >= min && c.credits <= max; });
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
