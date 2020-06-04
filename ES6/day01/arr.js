let [age2="25",age=age2]=[];
console.log(age,age2);  //25 25

let [name=name2,name2="xxx"]=[];
console.log(name,name2); //ReferenceError: Cannot access 'name2' before initialization