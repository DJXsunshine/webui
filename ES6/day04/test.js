// var obj = { info:'Hello' };

// obj.info = 'World';

// console.log(obj.info);
// console.log(obj['info']);

let name = Symbol('My symbol');

let obj = {};
obj.name = 'Hello';
obj[name] = 'World';
console.log(obj);//{ name: 'Hello', [Symbol(My symbol)]: 'World' }

console.log(obj.name);//Hello
console.log(obj[name]);//World


for(let key of  Reflect.ownKeys(obj)){
    console.log(key,obj[key]);
}
console.log(Object.keys(obj));//[ 'name' ]
console.log(Object.getOwnPropertyNames(obj));//[ 'name' ]
console.log(Object.getOwnPropertySymbols(obj));//[ Symbol(My symbol) ]