# 日常学习总结

标签（空格分隔）： 零散笔记

---

[toc]
## 函数节流
函数节流，简单地讲，就是让一个函数无法在很短的时间间隔内连续调用，只有当上一次函数执行后过了你规定的时间间隔，才能进行下一次该函数的调用

函数节流的原理挺简单的，那就是定时器。当我触发一个时间时，先setTimout让这个事件延迟一会再执行，如果在这个时间间隔内又触发了事件，那我们就clear掉原来的定时器，再setTimeout一个新的定时器延迟一会执行

## Commonjs 与 AMD 规范
Commonjs是一种规范， nodejs就是这种规范的实现；
它分为四个模块：module exports require global

AMD也是一种规范，Commonjs是服务器端的规范，那么AMD就是浏览器端的规范。而且这种规范允许异步加载模块，也采用require()语句加载模块

## JSONP
1.JSONP支持GET请求，不支持POST请求

2.JSONP是JSON的一种使用方式，是JSON中的JSON。利用script标签不受“同源策略”的限制，通过**动态**创建script标签，请求地址

3.JSONP创建的script的src地址是由请求地址+一个callback处理数据的函数组成，形如：'http://suggestion.baidu.com/su?wd='+oTxt.value+'&amp;p=3&amp;cb=succ&amp;from=superpage';  其中cd就是我们自定义的一个函数，用来处理我们请求回来的数据，加以处理，再返回给客户端

4.凡是拥有"src"这个属性的标签都拥有跨域的能力，比如<script>、<img>、<iframe>

5.Ajax 与 JSONP的区别在于 ： ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加<script>标签来调用服务器提供的js脚本

## XMLHttpRequest 对象
XMLHttpRequest 对象用于在后台与服务器交换数据