// let [a,b,c] = 'hello';
// console.log(a,b,c)

// let {length:len} = 'hello'
// console.log(len)

let a = 1;
let b = 2;
[a,b] = [b,a];
console.log(a,b)


function math(a,b){
    return {"add":a+b,"sub":a-b};
}
let {add,sub} = math(1,2);
console.log(add,sub)