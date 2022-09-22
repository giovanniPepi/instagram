// https://www.educative.io/blog/typescript-tutorial

// let variableName: typeScriptType = value;

let num: number = 0.444;
let hex: number = 0xbeef;
let bin: number = 0b0010;


let yes: boolean = true;
let no: boolean = false;

// array supports multiple types
const arr3: (Date | string[])[] = [new Date(), new Date(), ['1', 'a']];

//tuple 
let numberTuple = [number, number, number];

// enum
enum MyStringEnum {
  ChoiceA = "A",
  ChoiceB = "B",
}


//functions 

function functionWithParameters(arg1: string, arg2: number) { }