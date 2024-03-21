// json fil skapad med den data på kurser vi använt i tidigare kurs https://dahlgren.miun.se/ramschema_ht23.php
import courses from "./kurser.json"; //import kod hittat här https://bobbyhadz.com/blog/typescript-import-json-file
let g: any;
let f: string[] = [];
let inStorage: boolean = true;

if (localStorage.getItem("courses") != null && localStorage.getItem("courses") != '') {
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
if (inStorage == false) {
  for (let index = 0; index < courses.length; index++) {
    addCourseFromJson(index);
  }
} else {
  for (let index = 0; index < f.length; index = index + 4) {
    addCourseFromStorage(index);
  }
}

printCourses();
console.log(coursesArr);

function addCourseFromStorage(nr: number) {
  let kurs: CourseInfo = {
    code: f[nr],
    name: f[nr + 1],
    progression: f[nr + 2],
    syllabus: f[nr + 3],
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
  let syllabusInput =
    "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/" +
    codeInput.toUpperCase() +
    "/";

  if (
    codeInput != "" &&
    nameInput != "" &&
    progInput != "" &&
    syllabusInput != ""
  ) {
    let kurs: CourseInfo = {
      code: codeInput,
      name: nameInput,
      progression: progInput,
      syllabus: syllabusInput,
    };
    coursesArr.push(kurs);
    printCourses();
  } else {
    alert("Var snäll och fyll i alla fält för att lägga till en kurs");
  }
}

function deleteCourse() {
  console.log(this.parentNode);
  console.log(coursesArr);

  for (let index = 0; index < coursesArr.length; index++) {
    let kod1: string = this.parentNode.children[0].innerHTML
    let kod2: string = coursesArr[index].code
    let name1: string = this.parentNode.children[1].innerHTML
    let name2: string = coursesArr[index].name
    let prog1: string = this.parentNode.children[2].innerHTML
    let prog2: string = coursesArr[index].progression
    let syll1: string = this.parentNode.children[3].href
    let syll2: string = coursesArr[index].syllabus

    if (
      kod1 == kod2 &&
      name1 == name2 &&
      prog1 == prog2 &&
      syll1 == syll2
    ) {
      console.log(coursesArr[index]);
      coursesArr.splice(index, 1);
    }
  }
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

    let btn: HTMLButtonElement = document.createElement("button");
    btn.innerHTML = "Ta bort";
    btn.addEventListener("click", deleteCourse);
    capsule.appendChild(h3);
    capsule.appendChild(p1);
    capsule.appendChild(p2);
    capsule.appendChild(a);
    capsule.appendChild(btn);
    div.appendChild(capsule);
  }
  localStorage.setItem("courses", arr.join());
  let b: any;
  if (localStorage.getItem("courses") != null) {
    b = localStorage.getItem("courses");
  }
}
