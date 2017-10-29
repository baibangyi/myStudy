# CommonJS & AMD/CMD！

标签（空格分隔）： 笔记

---

[toc]
## CommonJS
### 什么是CommonJS
JS的模块规范，NodeJS是CommonJS规范的实现，webpack 也是以CommonJS的形式来书写

### CommonJS原理
浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。

 - module
 - exports
 - require
 - global

### 注意点
CommonJS是同步的

## AMD
### 什么是AMD
是客户端的模块规范，它采用**异步方式**加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。require([module],callback);有两个Javascript库实现了AMD规范：**require.js**和curl.js。

### 为什么要用require.js

 - 实现js文件的异步加载，避免网页失去响应；
 - 管理模块之间的依赖性，便于代码的编写和维护

### require.js的加载

 - 第一步，是先去官方网站下载最新版本
 - 下载后，假定把它放在js子目录下面，就可以加载了

    <script src="js/require.js"></script>
    

 - 为避免加载这个文件时也失去响应，所以借助async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上

    <script src="js/require.js" defer async="true" ></script>
    

 - 加载require.js以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是main.js，也放在js目录下面。那么，只需要写成下面这样就行了（data-main属性的作用是，指定网页程序的主模块。）

    <script src="js/require.js" data-main="js/main"></script>
    
### 主模块的写法

> 　// main.js 　　
require(['moduleA', 'moduleB', 'moduleC'], function(moduleA, moduleB, moduleC){
> 　　　　// some code here 　　
      });
      
require()函数接受两个参数。第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块

### 模块的加载
使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js）的头部。参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。

> require.config({
　　　　paths: {
　　　　　　"jquery": "jquery.min",
　　　　　　"underscore": "underscore.min",
　　　　　　"backbone": "backbone.min"
　　　　}
　　});
　　
上面的代码给出了三个模块的文件名，路径默认与main.js在同一个目录（js子目录）。如果这些模块在其他目录，比如js/lib目录，则有两种写法。一种是逐一指定路径。
> require.config({
　　　　paths: {
　　　　　　"jquery": "lib/jquery.min",
　　　　　　"underscore": "lib/underscore.min",
　　　　　　"backbone": "lib/backbone.min"
　　　　}
　　});
　　或者
　　　require.config({
　　　　baseUrl: "js/lib",
　　　　paths: {
　　　　　　"jquery": "jquery.min",
　　　　　　"underscore": "underscore.min",
　　　　　　"backbone": "backbone.min"
　　　　}
　　});
　　
如果某个模块在另一台主机上，也可以直接指定它的网址，比如：
> require.config({
　　　　paths: {
　　　　　　"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
　　　　}
　　});
　　
### AMD模块的写法
模块必须采用特定的define()函数来定义
> 　// main.js
　　require(['math'], function (math){
　　　　alert(math.add(1,1));
　　});
　　
### 加载非规范的模块
加载非规范的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征
> require.config({
> 　　　　shim: {
> 
> 　　　　　　'underscore':{
> 　　　　　　　　exports: '_'
> 　　　　　　},
> 　　　　　　'backbone': {
> 　　　　　　　　deps: ['underscore', 'jquery'],
> 　　　　　　　　exports: 'Backbone'
> 　　　　　　}
> 　　　　} 　　});

require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。

### require.js插件
domready插件，可以让回调函数在页面DOM结构加载完成后再运行

> require(['domready!'], function (doc){
> 　　　　// called once the DOM is ready 　　});

text和image插件，则是允许require.js加载文本和图片文件。

> define([
> 　　　　'text!review.txt',
> 　　　　'image!cat.jpg'
> 　　　　],
> 
> 　　　　function(review,cat){
> 　　　　　　console.log(review);
> 　　　　　　document.body.appendChild(cat);
> 　　　　} 　　);

### 注意点
这里有define，把东西包装起来啦，那Node实现中怎么没看到有define关键字呢，它也要把东西包装起来呀，其实吧，只是Node隐式包装了而已

## CMD
在CMD中，一个模块就是一个文件

  define( id?, deps?, factory );
define也可以接受两个以上的参数，字符串id为模块标识，数组deps为模块依赖

> define( 'module', ['module1', 'module2'], function( require, exports,
> module ){
>     // 模块代码 } );

### AMD 与 CMD 区别到底在哪里

 - 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行，不过 RequireJS 从 2.0
   开始，也改成可以延迟执行（根据写法不同，处理方式不同）
 - CMD 推崇依赖就近，AMD 推崇依赖前置

> // CMD define(function(require, exports, module) {
>     var a = require('./a')
>     a.doSomething()
>     // 此处略去 100 行
>     var b = require('./b') // 依赖可以就近书写
>     b.doSomething()
>     // ... })
> 
> // AMD 默认推荐的是 define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
>     a.doSomething()
>     // 此处略去 100 行
>     b.doSomething()
>     // ... })

 - AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。
 
 
 
 
 
 
 
 
