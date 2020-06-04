/*
var date = new Date();

function getDate(){
    console.log(date);//undefined
    if(false){
        // 函数提升，当前作用域最顶端(函数)
        var date = 2020/05/18;
        console.log(date);
    }
}

function getDate2(){
    console.log(date);//2020-05-18T01:57:36.085Z
    if(false){
        let date = 2020/05/18;
        console.log(date);
    }
}

getDate();
getDate2();
*/

/*
var temp = 123;
if(true){
    temp = 'abc';   //ReferenceError: Cannot access 'temp' before initialization
    let temp;
}
*/