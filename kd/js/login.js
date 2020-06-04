$(function () {
    /*
    * 通过ajax向后台发送数据 
    * contentType
    *   1. application/x-www-form-urlencoded; charset=UTF-8 
    *       参数：键值对 查询字符串 key1:value1&key2:value2
    *   2. application/json 调用JSON.stringify()方法
    *       参数：json字符串    {"key1":"value1","key2":"value2"}
    **/
    //登录按钮
    $('button').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            url: 'http://106.54.117.183:8099/manager/user/login',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function (res) {
                //将token设置到浏览器中
                localStorage.setItem('token', res.data.token);
                //从浏览器获取token
                var token = localStorage.getItem('token');
                if (token) {
                    //token存在时跳转
                    location.href = location.href.replace('login.html', 'index.html');
                }
            }
        })
    })
    $(window).keydown(function(event){
        switch(event.keyCode) {
          // ...
          // 不同的按键可以做不同的事情
          // 不同的浏览器的keycode不同
          // 更多详细信息:     https://unixpapa.com/js/key.html
          // 常用keyCode： 空格 32   Enter 13   ESC 27
          case 13:
            $('button').click();
            break;
        }
    });
})