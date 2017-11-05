# 前端面试题汇总

标签（空格分隔）： 面试题

---

[toc]
## HTML + CSS 基础
**XHTML和HTML有什么区别**
HTML是一种基本的WEB网页设计语言，XHTML是一个基于XML的置标语言，所以XHTML必须正确嵌套，必须关闭标签，XHTML文档必须拥有根元素

**什么是语义化的HTML**
html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析，使用正确的标签，对搜索引擎有好处，使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解

**Doctype作用？标准模式与兼容模式各有什么区别?**
  
 - !DOCTYPE声明位于位于HTML文档中的第一行，处于html 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
 - 标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

**请描述一下 cookies，sessionStorage 和 localStorage 的区别？**
cookie是用于前后端交互信息的
sessionStorage和localStorage的存储空间更大
sessionStorage和localStorage有更多丰富易用的接口


**如何实现浏览器内多个标签页之间的通信?**
调用localstorge、cookies等本地存储方式

**CSS隐藏元素的几种方法**

 - Opacity:元素本身依然占据它自己的位置并对网页的布局起作用。它也将响应用户交互
 - Visibility:与 opacity唯一不同的是它不会响应任何用户交互。元素在读屏软件中也会被隐藏;
 - Display:display 设为none任何对该元素直接打用户交互操作都不可能生效。此外，读屏软件也不会读到元素的内容。这种方式产生的效果就像元素完全不存在
ps:Opacity的兼容

    .transparent_class {  
          filter:alpha(opacity=50);  
          -moz-opacity:0.5;  
          -khtml-opacity: 0.5;  
          opacity: 0.5;  
    }

**CSS引入的方式有哪些? link和@import的区别是** 
内联 内嵌 外链 导入

 - 区link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
 - link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
 - link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持
 - ink支持使用Javascript控制DOM去改变样式；而@import不支持

    
**CSS清除浮动的几种方法**

 - 使用带clear属性的空元素
 - 在父元素使用CSS的overflow属性
 - 使用CSS的:after伪元素

**内联元素居中的方法**

**水平居中**
设置 text-align:center
设置display:flex;justify-content:center;(灵活运用,支持Chroime，Firefox，IE9+)

**垂直居中**
父元素高度确定的单行文本（内联元素） height = line-height
父元素高度确定的多行文本（内联元素）先设置 display:table-cell 再设置 vertical-align:middle

**块级元素居中的方法**
 
 **水平居中**
 定宽块状元素 设置左右 margin 值为 auto
 不定宽块状元素 
 

 - 在元素外加入 table 标签（完整的，包括 table、tbody、tr、td），该元素写在 td 内，然后设置 margin 的值为auto
 - 给该元素设置 displa:inine 方法
 - 父元素设置 position:relative 和 left:50%，子元素设置 position:relative 和 left:50%

**垂直居中**

 - 使用position:absolute（fixed）,设置left、top、margin-left、margin-top的属性
 - 利用position:fixed（absolute）属性，margin:auto这个必须不要忘记了
 - 利用display:table-cell属性使内容垂直居中
 - 使用css3的新属性transform:translate(x,y)属性
 - 使用:before元素

## JS 基础
**谈一谈JavaScript作用域链**
**如何理解JavaScript原型链**
**JavaScript如何实现继承**
构造继承
原型继承
实例继承
拷贝继承
 **split() join() 的区别**
 前者是切割成数组的形式，后者是将数组转换成字符串
 **数组方法pop() push() unshift() shift()**
 push尾部添加pop尾部删除
 unshift头部添加shift头部删除
 **IE和DOM事件流的区别**
 执行顺序不一样
 参数不一样
 事件加不加on
 this指向问题
 **ajax请求的时候get 和post方式的区别**
 **IE和标准下有哪些兼容性的写法**

     Var ev = ev || window.event
    document.documentElement.clientWidth || document.body.clientWidth
    Var target = ev.srcElement||ev.target

**事件委托是什么** 
让利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行！
**闭包是什么，有什么特性，对页面有什么影响?简要介绍你理解的闭包**
**添加 删除 替换 插入到某个接点的方法**

    obj.appendChidl()
    obj.innersetBefore
    obj.replaceChild
    obj.removeChild

**如何阻止事件冒泡和默认事件**
function stopBubble(e)

    {
        if (e && e.stopPropagation)
            e.stopPropagation()
        else
            window.event.cancelBubble=true
    }
    
**谈谈This对象的理解。**
**了解Node么？Node的使用场景都有哪些？**
**说一下什么是JavaScript的同源策略**

**你做的页面在哪些流览器测试过?这些浏览器的内核分别是什么**
Ie(Ie内核) 火狐（Gecko） 谷歌（webkit） opear(Presto)

**写出几种IE6 BUG的解决方法**

**.标签上title与alt属性的区别是什么**
Alt 当图片不显示是 用文字代表。
Title 为该属性提供信息

**.描述css reset的作用和用途**
Reset重置浏览器的css默认属性 浏览器的品种不同，样式不同，然后重置，让他们统一

**解释css sprites，如何使用**
Css 精灵 把一堆小的图片整合到一张大的图片上，减轻服务器对图片的请求数量

**事件绑定和普通事件有什么区别？**
事件绑定就是针对dom元素的事件，绑定在dom元素上
普通事件即为非针对dom元素的事件；

**解释json 的原理，以及为什么不是真正的ajax？**
动态创建script标签，回调函数
Ajax是页面无刷新请求数据操作

**JavaScript的本地对象，内置对象和宿主对象？**
本地对象为array obj regexp等可以new 实例化
内置对象为gload Math等不可以实例化的
宿主为浏览器自带的document，window等

**document load 和 document ready 的区别？**
.load是当页面所有资源全部加载完成后（包括DOM文档树，css文件，js文件，图片资源等），执行一个函数
问题：如果图片资源较多，加载时间较长，onload后等待执行的函数需要等待较长时间，所以一些效果可能受到影响
2.$(document).ready()是当DOM文档树加载完成后执行一个函数 （不包含图片，css等）所以会比load较快执行
在原生的jS中不包括ready()这个方法，只有load方法就是onload事件

**.javascript的同源策略**
一段脚本只能读取来自同一来源的窗口和文档的属性，这里的同一来源指的是主机名，协议和端口号的组合
