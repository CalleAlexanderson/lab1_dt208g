// json fil skapad med den data på kurser vi använt i tidigare kurs https://dahlgren.miun.se/ramschema_ht23.php
import courses from "./kurser.json"; //import kod hittat här https://bobbyhadz.com/blog/typescript-import-json-file
let coursesArr: CourseInfo[] = [];
console.log(coursesArr);
interface CourseInfo {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

for (let index = 0; index < courses.length; index++) {
  addCourseFromJson(index);
}

printCourses();
console.log(coursesArr);

function addCourseFromJson(nr: number) {
  let kurs: CourseInfo = {
    code: courses[nr].code,
    name: courses[nr].coursename,
    progression: courses[nr].progression,
    syllabus: courses[nr].syllabus,
  };
  coursesArr.push(kurs);
}

function printCourses() {
  let div = document.getElementById("courses");
  console.log(div);

  //lade till en if sats för annars för jag en varning att div kan vara null även om det funkar
  if (div != null) {
    for (let index = 0; index < coursesArr.length; index++) {
        let capsule: HTMLDivElement = document.createElement("div");
        let h3: HTMLHeadingElement = document.createElement("h3");
        h3.innerHTML = coursesArr[index].code;
    
        let p1: HTMLParagraphElement = document.createElement("p");
        p1.innerHTML = coursesArr[index].name;
    
        let p2: HTMLParagraphElement = document.createElement("p");
        p2.innerHTML = coursesArr[index].progression;
    
        let a: HTMLAnchorElement = document.createElement("a");
        a.innerHTML = "studieplan";
        a.href = coursesArr[index].syllabus;
        a.target = "_blank";
        capsule.appendChild(h3);
        capsule.appendChild(p1);
        capsule.appendChild(p2);
        capsule.appendChild(a);
        div.appendChild(capsule);
      }
  }
}
