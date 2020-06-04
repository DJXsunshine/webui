$(function(){
    $('.left-nav li').click(function () {
        var text = $(this).text();
        // 判断切换
        if(text=='首页'){
            $('.right-content').load('./pages/home.html');
        }
        if(text=='栏目管理'){
            $('.right-content').load('./pages/category.html');
        }
        if(text=='文章管理'){
            $('.right-content').load('./pages/article.html');
        }
        if(text=='用户管理'){
            $('.right-content').load('./pages/user.html');
        }
        if(text=='评论管理'){
            $('.right-content').load('./pages/comment.html');
        }
        // 改变背景色
        $(this).css({
            backgroundColor:'rgb(240,242,245)',
            color:'#333'
        })
        $(this).siblings().css({
            backgroundColor:'rgb(48,65,86)',
            color:'#ccc'
        })
    })

    // 点击显示和隐藏左侧栏目
    $('.right-header i').click(function () {
        $('.left').toggle();
    })

    //页面加载默认显示首页
    $('.left-nav li:first-child').click();

    //判断是否有token，没有则去登录
    var token = localStorage.getItem('token');
    if (token) {
        myAjax('/manager/user/info', 'get', { token: token }, function (res) {
            $('#userFace').prop('src', res.data.userface)
        })
    } else {
        location.href = location.href.replace('index.html', 'login.html');
    }
})

// 显示提示框
function tips(str){
    $('.toast .toast-body').text(str);
    $('.toast').toast('show');
}