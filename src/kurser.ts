// json fil skapad med den data på kurser vi använt i tidigare kurs https://dahlgren.miun.se/ramschema_ht23.php
import courses from "./kurser.json"; //import kod hittat här https://bobbyhadz.com/blog/typescript-import-json-file
let g: any;
let f: string[] = [];
let inStorage: boolean = true;

if (localStorage.getItem("courses") != null) {
  g = localStorage.getItem("courses");
  f = g.split(",");
  console.log(f);
} else {
  inStorage = false;
}

let coursesArr: CourseInfo[] = [];
console.log(coursesArr);
interface CourseInfo {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}
console.log(inStorage);
if (inStorage == false) {
  for (let index = 0; index < courses.length; index++) {
    addCourseFromJson(index);
  }
} else{
  for (let index = 0; index < f.length; index=index+4) {
    console.log('tar från storage ' + index);
    addCourseFromStorage(index);
  }
}

printCourses();
console.log(coursesArr);

function addCourseFromStorage(nr: number){
  let kurs: CourseInfo = {
    code: f[nr],
    name: f[nr+1],
    progression: f[nr+2],
    syllabus: f[nr+3],
  };
  coursesArr.push(kurs);
}

function addCourseFromJson(nr: number) {
  let kurs: CourseInfo = {
    code: courses[nr].code,
    name: courses[nr].coursename,
    progression: courses[nr].progression,
    syllabus: courses[nr].syllabus,
  };
  coursesArr.push(kurs);
}
document.getElementById("add_course")?.addEventListener("click", addCourse);

function addCourse() {
  let codeInput = (document.getElementById("code") as HTMLInputElement).value;
  let nameInput = (document.getElementById("name") as HTMLInputElement).value;
  let progInput = (document.getElementById("progress") as HTMLInputElement)
    .value;
  let syllabusInput = (document.getElementById("syllabus") as HTMLInputElement)
    .value;

  console.log(codeInput);
  console.log(nameInput);
  console.log(progInput);
  console.log(syllabusInput);

  let kurs: CourseInfo = {
    code: codeInput,
    name: nameInput,
    progression: progInput,
    syllabus: syllabusInput,
  };
  coursesArr.push(kurs);

  console.log(coursesArr);
  printCourses();
}

function printCourses() {
  let div = document.getElementById("courses") as HTMLDivElement;
  let arr: string[] = [];
  div.innerHTML = "";
  for (let index = 0; index < coursesArr.length; index++) {
    let capsule: HTMLDivElement = document.createElement("div");
    let h3: HTMLHeadingElement = document.createElement("h3");
    h3.innerHTML = coursesArr[index].code;
    arr.push(coursesArr[index].code);

    let p1: HTMLParagraphElement = document.createElement("p");
    p1.innerHTML = coursesArr[index].name;
    arr.push(coursesArr[index].name);

    let p2: HTMLParagraphElement = document.createElement("p");
    p2.innerHTML = coursesArr[index].progression;
    arr.push(coursesArr[index].progression);

    let a: HTMLAnchorElement = document.createElement("a");
    a.innerHTML = "studieplan";
    a.href = coursesArr[index].syllabus;
    arr.push(coursesArr[index].syllabus);

    capsule.appendChild(h3);
    capsule.appendChild(p1);
    capsule.appendChild(p2);
    capsule.appendChild(a);
    div.appendChild(capsule);
  }
  console.log(coursesArr);
  console.log("arr " + arr);
  localStorage.setItem("courses", arr.join());
  console.log("storage " + localStorage.getItem("courses"));
  let b: any;
  if (localStorage.getItem("courses") != null) {
    b = localStorage.getItem("courses");

    console.log(b.split(","));
  }
}
