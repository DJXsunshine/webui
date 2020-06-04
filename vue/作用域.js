// 全局变量不使用修饰符，绑定到window或global对象属性上
{
    a = 1;
}
console.log('a：'+a);//1
console.log('global.a：'+global.a);//1

// 局部变量不会绑定到全局对象中
// var 没有块级作用域
{
    var b = 1;
}
console.log('b：'+b);//1
console.log('global.b：'+global.b);//undefined

// let 块级作用域
{
    let c = 1;
    console.log('c：'+c);//1
    console.log('global.c：'+global.c);//undefined
}
// console.log('c：'+c);//ReferenceError: c is not defined
console.log('global.c：'+global.c);//undefined

// const 块级作用域
{
    const d = 1;
    console.log('d：'+d);//1
    console.log('global.d：'+global.d);//undefined
}
// console.log('d：'+d);//ReferenceError: d is not defined
console.log('global.d：'+global.d);//undefined