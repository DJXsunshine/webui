// var obj = {
//     name:'xpf',
//     age:25,
//     gender:'man'
// }
// console.log(obj.name,obj.age,obj.gender);

// let {age,name,gender:address}=obj;
// console.log(name,age,address);

let obj = {
    name:'xpf',
    address:{
        province:'安徽',
        city:'合肥'
    }
}
let {address:{province}} = obj;
console.log(province)

let obj = {
    name:'xpf',
    address:{
        province:'安徽',
        city:'合肥'
    }
}
let {address:{province:xxx}} = obj;
console.log(xxx);  //安徽