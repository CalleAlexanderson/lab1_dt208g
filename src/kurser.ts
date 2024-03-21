// json fil skapad med den data på kurser vi använt i tidigare kurs https://dahlgren.miun.se/ramschema_ht23.php
import courses from "./kurser.json"; //import kod hittat här https://bobbyhadz.com/blog/typescript-import-json-file
let storageData: any;
let storageDataArr: string[] = [];
let inStorage: boolean = true;

if (
  localStorage.getItem("courses") != null &&
  localStorage.getItem("courses") != ""
) {
  storageData = localStorage.getItem("courses");
  storageDataArr = storageData.split(",");
} else {
  inStorage = false;
}

let coursesArr: CourseInfo[] = [];
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
  for (let index = 0; index < storageDataArr.length; index = index + 4) {
    addCourseFromStorage(index);
  }
}

printCourses();

function addCourseFromStorage(nr: number) {
  let kurs: CourseInfo = {
    code: storageDataArr[nr],
    name: storageDataArr[nr + 1],
    progression: storageDataArr[nr + 2],
    syllabus: storageDataArr[nr + 3],
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
document
  .getElementById("change_course_data")
  ?.addEventListener("click", editCourse);

function addCourse() {
  let codeInput = (document.getElementById("code") as HTMLInputElement).value;
  let nameInput = (document.getElementById("name") as HTMLInputElement).value;
  let progInput = (document.getElementById("progress") as HTMLInputElement)
    .value;
  let syllabusInput: string =
    "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/" +
    codeInput.toUpperCase() +
    "/";
  progInput = progInput.toUpperCase();
  let addCode: string = "";
  let addName: string = "";
  let addProg: string = "";

  let uniqueCode: boolean = true;
  for (let index = 0; index < coursesArr.length; index++) {
    if (coursesArr[index].code == codeInput) {
      uniqueCode = false;
    }
  }
  console.log(uniqueCode);
  if (codeInput != "" && uniqueCode == true) {
    addCode = codeInput;
  }

  if (nameInput != "") {
    addName = nameInput;
  }

  if (progInput == "A" || progInput == "B" || progInput == "C") {
    addProg = progInput.toUpperCase();
  }

  if (addCode != "" && addName != "" && addProg != "" && syllabusInput != "") {
    let kurs: CourseInfo = {
      code: addCode,
      name: addName,
      progression: addProg,
      syllabus: syllabusInput,
    };
    coursesArr.push(kurs);
    printCourses();
  } else {
    alert(
      "Var snäll och fyll i alla fält med information som följer riktlinjerna för att lägga till en kurs"
    );
  }
}

function editCourse() {
  let selectedCourse: string = (
    document.getElementById("choose_course") as HTMLInputElement
  ).value;
  // tar värdet på select element och gör till array
  let selectedCourseArr: string[] = selectedCourse.split(",");

  let kod1Edit: string = selectedCourseArr[0];
  let name1Edit: string = selectedCourseArr[1];
  let prog1Edit: string = selectedCourseArr[2];
  let syll1Edit: string = selectedCourseArr[3];

  let codeChangeIn = (
    document.getElementById("change_code") as HTMLInputElement
  ).value;
  let nameChangeIn = (
    document.getElementById("change_name") as HTMLInputElement
  ).value;
  let progChangeIn = (
    document.getElementById("change_progress") as HTMLInputElement
  ).value;
  let syllabusChangeIn = (
    document.getElementById("change_syllabus") as HTMLInputElement
  ).value;

  progChangeIn = progChangeIn.toUpperCase();
  let newCode: string;
  let newName: string;
  let newProg: string;
  let newSyll: string;

  let checkSyll1: string = "https://";
  let checkSyll2: string = "http://";

  for (let index = 0; index < coursesArr.length; index++) {
    let kod2Edit: string = coursesArr[index].code;
    let name2Edit: string = coursesArr[index].name;
    let prog2Edit: string = coursesArr[index].progression;
    let syll2Edit: string = coursesArr[index].syllabus;

    // kollar vilken kurs div som matchas med den kurs man valt
    if (
      kod1Edit == kod2Edit &&
      name1Edit == name2Edit &&
      prog1Edit == prog2Edit &&
      syll1Edit == syll2Edit
    ) {
      // kollar om input är blank där man ändrar, om inte får den värdet i input fältet annars får den värdet som tidigare varit i kurs div:en
      let uniqueCodeC: boolean = true;
      for (let index = 0; index < coursesArr.length; index++) {
        if (coursesArr[index].code == codeChangeIn) {
          uniqueCodeC = false;
        }
      }

      if (codeChangeIn != "" && uniqueCodeC == true) {
        newCode = codeChangeIn;
      } else {
        newCode = kod2Edit;
      }

      if (nameChangeIn != "") {
        newName = nameChangeIn;
      } else {
        newName = name2Edit;
      }

      if (progChangeIn == "A" || progChangeIn == "B" || progChangeIn == "C") {
        newProg = progChangeIn.toUpperCase();
      } else {
        newProg = prog2Edit;
      }

      if (syllabusChangeIn != "") {
        if (
          //kollar så att länken innehåller https:// eller http://
          syllabusChangeIn.includes(checkSyll1) ||
          syllabusChangeIn.includes(checkSyll2)
        ) {
          newSyll = syllabusChangeIn;
        } else {
          newSyll = syll2Edit;
        }
      } else {
        newSyll = syll2Edit;
      }

      let kurs: CourseInfo = {
        code: newCode,
        name: newName,
        progression: newProg,
        syllabus: newSyll,
      };
      coursesArr[index] = kurs;
      printCourses();
    }
  }
}

function deleteCourse() {
  for (let index = 0; index < coursesArr.length; index++) {
    let kod1: string = this.parentNode.children[0].innerHTML;
    let kod2: string = coursesArr[index].code;
    let name1: string = this.parentNode.children[1].innerHTML;
    let name2: string = coursesArr[index].name;
    let prog1: string = this.parentNode.children[2].innerHTML;
    let prog2: string = coursesArr[index].progression;
    let syll1: string = this.parentNode.children[3].href;
    let syll2: string = coursesArr[index].syllabus;

    if (kod1 == kod2 && name1 == name2 && prog1 == prog2 && syll1 == syll2) {
      coursesArr.splice(index, 1);
    }
  }
  printCourses();
}

function printCourses() {
  let div = document.getElementById("courses") as HTMLDivElement;
  let select = document.getElementById("choose_course") as HTMLSelectElement;
  let arr: string[] = [];
  div.innerHTML = "";
  select.innerHTML = "";
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

    let option: HTMLOptionElement = document.createElement("option");
    option.innerHTML = coursesArr[index].code;
    option.value = `${coursesArr[index].code},${coursesArr[index].name},${coursesArr[index].progression},${coursesArr[index].syllabus}`;
    select.appendChild(option);
  }
  localStorage.setItem("courses", arr.join());
}
