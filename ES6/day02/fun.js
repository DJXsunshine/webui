let fun = () => {};
let fun2 = (item,item2) => {};

function Person(){
    this.name = 'person';
}
Person.prototype.say = function(){
    console.log(this.name);
}
function Dog(){
    this.name = 'Dog';
}
//new Dog().say();//TypeError: (intermediate value).say is not a function
Dog.prototype = new Person();
Dog.prototype.constructor = Dog;
// new Dog().say();//Dog
console.log(new Person())
console.log(new Dog())
