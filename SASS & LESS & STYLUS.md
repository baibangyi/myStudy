# SASS & LESS & STYLUS

标签（空格分隔）： 面试笔记

---

[toc]
## 什么是SASS
SASS是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护

## 安装和使用
SASS是Ruby语言写的，但是两者的语法没有关系。不懂Ruby，照样使用。只是必须先安装Ruby，然后再安装SASS。
gem install sass

## 使用SASS
SASS文件就是普通的文本文件，里面可以直接使用CSS语法。文件后缀名是.scss，意思为Sassy CSS，下面的命令，可以在屏幕上显示.scss文件转化的css代码。（假设文件名为test。）
sass test.scss

## 基本用法
### 变量
SASS允许使用变量，所有变量以$开头

    $blue : #1875e7;　
    　　div {
    　　　color : $blue;
    　　}

如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中

    $side : left;
    　　.rounded {
    　　　　border-#{$side}-radius: 5px;
    　　}
    　　
### 计算功能
SASS允许在代码中使用算式

    body {
    　　　　margin: (14px/2);
    　　　　top: 50px + 100px;
    　　　　right: $var * 10%;
    　　}
    　　
### 嵌套
SASS允许选择器嵌套。比如，下面的CSS代码 

    div {
    　　　　hi {
    　　　　　　color:red;
    　　　　}
    　　}
属性也可以嵌套，比如border-color属性

    p {
    　　　　border: {
    　　　　　　color: red;
    　　　　}
    　　}
在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类

    a {
    　　　　&:hover { color: #ffb3ff; }
    　　}

### 注释
标准的CSS注释 /* comment */ ，会保留到编译后的文件
单行注释 // comment，只保留在SASS源文件中，编译后被省略。在/*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息

## 代码的重用
### 继承
SASS允许一个选择器，继承另一个选择器。比如，现有class1,class2要继承class1，就要使用@extend命令：

    .class2 {
    　　　　@extend .class1;
    　　　　font-size:120%;
    　　}
    　　
### Mixin
使用@mixin命令，定义一个代码块

    @mixin left {
    　　　　float: left;
    　　　　margin-left: 10px;
    　　}
    　　
使用@include命令，调用这个mixin

    div {
    　　　　@include left;
    　　}

### 颜色函数
SASS提供了一些内置的颜色函数，以便生成系列颜色lighten(#cc3, 10%) // #d6d65c

### 插入文件
@import命令，用来插入外部文件。

## 高级用法
### 条件语句
@if可以用来判断，配套的还有@else命令

    @if lightness($color) > 30% {
    　　　　background-color: #000;
    　　} @else {
    　　　　background-color: #fff;
    　　}
 
### 循环语句
for循环
　

    @for $i from 1 to 10 {
    　　　　.border-#{$i} {
    　　　　　　border: #{$i}px solid blue;
    　　　　}
    　　}

while循环

    $i: 6;
    　　@while $i > 0 {
    　　　　.item-#{$i} { width: 2em * $i; }
    　　　　$i: $i - 2;
    　　}

each命令，作用与for类似

    @each $member in a, b, c, d {
    　　　　.#{$member} {
    　　　　　　background-image: url("/image/#{$member}.jpg");
    　　　　}
    　　}
## 自定义函数

    @function double($n) {
    　　　　@return $n * 2;
    　　}
    　　#sidebar {
    　　　　width: double(5px);
    　　}

## LESS声明变量
LESS声明变量和Sass声明变量一样，唯一区别是变量名前面使用是的“@”字符著作权归作者所有
@mainColor: #0982c1;
