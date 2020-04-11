# iconfont的使用（https://www.iconfont.cn）
    1.Unicode方式
        /* 声明自定义字体库为iconfont */
        @font-face {
            font-family: 'iconfont';  /* project id 1741503 */
            src: url('//at.alicdn.com/t/font_1741503_mkdn950ojd9.eot');
            src: url('//at.alicdn.com/t/font_1741503_mkdn950ojd9.eot?#iefix') format('embedded-opentype'),
            url('//at.alicdn.com/t/font_1741503_mkdn950ojd9.woff2') format('woff2'),
            url('//at.alicdn.com/t/font_1741503_mkdn950ojd9.woff') format('woff'),
            url('//at.alicdn.com/t/font_1741503_mkdn950ojd9.ttf') format('truetype'),
            url('//at.alicdn.com/t/font_1741503_mkdn950ojd9.svg#iconfont') format('svg');
        }
        /* 使用声明的字体库 */
        .iconfont{
            font-family: iconfont;
            font-style: normal;
        }
        div{
            font-family: 'iconfont';
            content: "\e680";
        }
    2.Font class
        <!-- 1. 导入生成好的css文件 -->
        <link rel="stylesheet" href="https://at.alicdn.com/t/font_1741477_hz8bq8tgz2r.css">
        
        <!-- 2. 使用，class必须包含iconfont -->
        <i class="iconfont icon-RectangleCopy"></i>

# 样式重置
    body {
        font:12px 'Microsoft YaHei','微软雅黑';
    }
    body,ul{
        margin: 0;/*外边距*/
        padding: 0;/*内边距*/
    }
    ul{
        list-style: none;/*取消列表样式*/
    }
    a{
        text-decoration:none;/*文本的修饰线外观 取消下划线*/
    }

# 块元素居中显示
    1.方式一
        给块元素一个高度
        margin: 0 auto;
    2.方式二
        绝对定位(父元素为定位元素)
        position: absolute;
        left: 50%;/*距离左侧父元素的一半*/
        margin-left: -150px;/*向左边移动当前元素的一半*/

# 浮动元素的父元素没有高度
    1.所有子元素浮动，通过伪元素进行支撑
        ul::after{
            content:"";/*设置内容*/
            display:block;/*将一个元素设置为块元素*/
            clear:both;/*当前元素左右都不允许有浮动元素，换行*/
        }
    2.保留一个子元素不浮动，用于支撑父元素
        为了显示出来，可以加margin移动到合适的位置

# 选择器的优先级
    Importance 		特权
        !important
    Specificity 	权重（积分机制）
        1000 	style属性中
        100 	id选择器
        10 		类选择器，伪类过滤器，属性过滤器
        1 		元素选择器，伪元素选择器
    Source order 	顺序

# 背景图片
    1.拉伸铺满
        background-size: 100% 100%;
    2.图片不重复
        background-repeat: no-repeat;


# 背景参数
    1.背景色
        background-color
            关键字 		teal	red 	black white
            十六进制	#ffffff 	#000000 	#ff0000
            rgb函数 	rgb(255,255,255)
            rgba函数 	rgba(0,0,0,.5)
    2.背景覆盖区域
        background-clip
            border-box 	边框及边框以内全部覆盖
            padding-box 内边距及内边距以内全部覆盖
            content-box 内容区域全部覆盖
    3.背景图铺设的起点
        background-origin
            border-box
            padding-box
            content-box
    4.背景图
        background -image: url('./images/a.jpg');  
    5.背景图的重复方式
        background-repeat
    6.背景图的覆盖方式
        background-size 
            contain
            cover
    7.背景图开始铺设的坐标
        background-position: 50px 50px;
            关键字 center
            坐标点 1px 2px
        
# input 与 button始终对不齐
    1.button默认为内边框，因此将input设置为内边框    
        box-sizing: border-box;