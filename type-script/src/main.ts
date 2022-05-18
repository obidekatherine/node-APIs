//const a = "1";
//console.log("aaa", a)

//function
/*const getFullName = (name: string, surname: string): string => {
    return name + "" + surname;
}
console.log(getFullName("aaa", "bbb"));*/

//objects
/*interface IUser { //I means interfaceUser
    name: string;
    age?: number; // question mark means optional
    getMessage?(): string; //creating function inside object
}
const user: IUser = {
    name: "aaaa",
    age: 30,
}

const user2: IUser = {
    name: "aaaa",
    getMessage() {
        return "Hello" + name;
    },
}*/

//properties inside TS
/*let userName : string = "aaaa";

let pageName: string | number = "1"; //| means or/union*/

//types in TS
/*type ID = string;
type PopularTage = string;
type MaybePopular = PopularTage |  null*/

//void in TS
/*const doSomething = (): void => {
    console.log("do something");
}
as operator makes type assertion
eg 
let vUnknown = unknown = 10;

let s: string = vUnknown as string;
*/

//DOM element
/*const someElement = document.querySelector(".foo") as HTMLInputElement;
console.log("someElement", someElement.value);

const someElement = document.querySelector(".foo");
someElement.addEventListener('blur', (event) => {
    const target = event.target as HTMLInputElement;
    console.log('event', target.value);
    
})*/
//class
class User {
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }

    getFullName(): string{
        return this.firstName + ' ' + this.lastName
    }
}






