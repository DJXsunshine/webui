let obj = {
    address: '浙江省',
    say(){
        console.log(this.address)
    },
    person: function Person(){
        console.log('Person');
    }
}
let {say,person} = obj;
say();//undefined
new person();//Person

let obj2 = {id:1}
let obj3 = Object.assign({},obj2);
console.log(obj2==obj3)//false
console.log(obj2===obj3)//false


var object = {
    name: function(){
        console.log('name');
    },
    age(){
        console.log('age');
    }
}
let {name,age} = object;
new name();//123
new age();//TypeError: age is not a constructor
