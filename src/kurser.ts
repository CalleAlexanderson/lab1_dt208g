// json fil skapad med den data på kurser vi använt i tidigare kurs https://dahlgren.miun.se/ramschema_ht23.php 
import courses from './kurser.json'; //import kod hittat här https://bobbyhadz.com/blog/typescript-import-json-file
let coursesArr: CourseInfo[] = [];
interface CourseInfo {
    code : string,
    name : string,
    progression : string,
    syllabus : string
}

let kurs1 : CourseInfo = { 
    code: courses[0].code, 
    name: courses[0].coursename, 
    progression: courses[0].progression,
    syllabus: courses[0].syllabus
}
printCourses();

function printCourses() {
    let div = document.getElementById("courses");
    console.log(div);

    for (let index = 0; index < coursesArr.length; index++) {
        let capsule : HTMLDivElement = document.createElement("div");
        let h3 : HTMLHeadingElement = document.createElement("h3");
        h3.innerHTML = coursesArr[index].code;

        let p1 : HTMLParagraphElement = document.createElement("p");
        p1.innerHTML = coursesArr[index].name;

        let p2 : HTMLParagraphElement = document.createElement("p");
        p2.innerHTML = coursesArr[index].progression;

        let a : HTMLAnchorElement = document.createElement("a");
        a.innerHTML = "studieplan";
        a.href = coursesArr[index].syllabus;
    }
}
