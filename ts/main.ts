import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

/**
 * Attributes for student section
 */
let studentName: HTMLElement = document.getElementById('student-name')!;
let studentImage:HTMLImageElement = <HTMLImageElement> document.getElementById('student-image')!;
let studentTable: HTMLElement = document.getElementById('student-table')!;

/**
 * Atributes for courses section
 */
let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnfilterByRange: HTMLElement = document.getElementById("button-filterByRange")!;
const inputSearchMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-min")!;
const inputSearchMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-max")!;

/**
 * Atributes for the section zone
 */
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();

btnfilterByRange.onclick = () => applyFilterByRange();

renderStudentTable(dataStudent);

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML += `${getTotalCredits(dataCourses)}`

/**
 * Llena los datos de la tabla de información del estudiante
 * @param student Estudiante para representar
 */
function renderStudentTable(student:Student):void{
    console.log('Desplegando estudiante');
    studentName == null? '' : studentName.innerHTML = `${student.nombre}`;
    studentImage == null? '' : studentImage.src = `${student.image}`;
    let tBodyElement = document.createElement("tbody");
    tBodyElement.innerHTML = `<tr><td>Código</td><td>${student.codigo}</td></tr>
                              <tr><td>Cedula</td><td>${student.cedula}</td></tr>
                              <tr><td>Edad</td><td>${student.edad} Años</td></tr>
                              <tr><td>Dirección</td><td>${student.direccion}</td></tr>
                              <tr><td>Teléfono</td><td>${student.telefono}</td></tr>`;
    studentTable.appendChild(tBodyElement);
}

/**
 * Llena los datos de la tabla de cursos del estudiante
 * @param courses Cursos a representar
 */
function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByRange(){
  let min:number = inputSearchMin.value.length == 0 ? parseInt(inputSearchMin.value) :  parseInt(inputSearchMin.value);
  let max:number = inputSearchMax.value.length == 0 ? parseInt(inputSearchMax.value) :  parseInt(inputSearchMax.value);
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByRange(min,max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByRange(min:number, max:number, courses: Course[]): Course[]{
  return courses.filter(c => c.credits>=min && c.credits<=max);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

