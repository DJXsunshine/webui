// 封装jQuery的ajax
// 请求方式、请求地址、携带参数、响应内容
var baseUrl = 'http://106.54.117.183:8099';
function myAjax(url,method,param,successHandler,errorHandler) {
    $.ajax({
        url:baseUrl+url,
        method:method,
        data:param,
        success:successHandler,
        error:errorHandler
    });
}
