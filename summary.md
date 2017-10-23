# 视频面试题

标签（空格分隔）： 面试

---

[toc]
## JS中使用typeof能得到哪些类型
**考点**：JS变量类型

### 值类型
赋值不会影响原来的值，因为它是分块存储的
### 引用类型
赋值会改变原始值，因为它是指向同一个指针
引用类型有对象，函数，数组
引用类型的特点，无限制扩大属性
### typeof 运算符
typeof undefined // undefine
typeof 'adc' // string
typeof true // boolean
typeof {} // object
typeof [] //object
typeof null // object
typeof comsole.log //function
typeof只能区分出值类型，引用类型不能区分，都是object

## JS中的内置函数 和 内置对象
**函数**：
Object
Array
Boolean
Number
String
Function
Date
RegExp
Error
**对象**
JSON
Math

## JS 的内置对象 JSON
JSON也是一个数据格式
JSON.stringify():把对象变成字符串
JSON.parse():把字符串变成对象

## 何时使用 === 何时使用 ==
**考点**： 强制类型转换
**==**： 包含强制类型转换
**===**： 完全没有强制类型转换
只有当if(obj.a == null)可用==【即，a是被定义的属性或者参数什么的，比如obj.a】 ，其余都用===
if 在 0、NaN、''、null、undefined、false条件下判断为false

## window.onload 和 DOMContentLoaded 的区别
**考点**： 浏览器的渲染过程

## 用JS创建 10 个<a>标签，点击的时候弹出来对应的序号
**考点**： 作用域

## 简述如何实现一个模块加载器，实现类似require.js的基本功能
**考点**： JS 模块化

## 实现数组的随机排序
**考点**： JS基础算法

## DOM

## 原型 和 原型链
### 构造函数（扩展）
特点： 大些字母开头命名，本质上就是一个模块对象
var a = {}：var a = new Object()的 语法糖 
var a = []：var a = new Array()的 语法糖
function Foo(){...}： var Foo = new Function()的 语法糖
使用 instanof 判断一个函数是否是一个变量的构造函数

### 如何准确判断一个变量是数组类型
就是用instanof Array来判断

### 原型规则 和 示例
1.所有的引用类型都具有对象的特性，即可自由扩展属性（除‘null’外）
2.所有引用类型都有一个__proto__（即隐式原型）属性，属性值是一个普通对象
3.所有函数，都有一个prototype（显示原型）属性，属性值是一个普通的对象
4.所有的引用类型，__proto__属性值指向它的构造函数的”prototype“属性值
5.当试图得到一个引用类型的某个属性时，如果这个这个对象本身没有这个属性，那么回去它的__proto__（即它的构造函数的prototype）中寻找

### 循环对象自身的属性

    var item
    for (item in f) {
      //高级浏览器已经在 for in 中屏蔽了来自自原型的属性，但还是建议加上一个判断
      if (f.hasOwnPrototype(item)) {
        console.log(item)
    }


### 写一个原型链继承的例子

    function Elem (id) {
      this.elem = document.getelementById(id)
    }
    
    Elem.ptototype.html = function(val) {
      var elem = this.elem
      if(val) {
        elem.innerHTML = val
        return this //为了链式操作
    } else {
      return elem.innerHTML
     }
    }
    
    Elem.protyotype.on = function (type, fn){
      var elem = this.elem
      elem.addEventListener(type,fn)
      return this
    }
    
    var div1 = new Elem('xxx')
    
    div1.html('<p>hello</p>').on('click', function(){
        alert('sf')
      } 
    )//链式操作



### 描述new 一个对象的过程
1.创建一个新对象
2.this指向这个新对象
3.执行代码，对this赋值
4.返回this

### 某一框架中如何使用原型链

## 作用域 和 闭包
###知识点：

 **执行上下文**：
 范围：一段<script>或者一个函数
 全局：针对一段<script>，在执行之前会先把变量定义、函数声明提出来
 函数：针对一个函数，在执行之前也会先把变量定义，函数声明、this、arguments提出来
 **this**：
 this是要在执行时确认的，定义时时无法确认的
 

 **作用域**
 没有块级作用域，即：
 

    if （true）{
         var num = 2
     }
     console.log(num)
     //如果在java等高级语言中，外面是不可以访问if中的num的，因为if是一个块但js可以
 **作用域链**
 即子作用域和父作用域行程的作用域链，父作用域是在函数定义时规定的，不是函数执行的时候规定的
 **闭包**
 使用场景：
 函数作为返回值
 

    function fn () {
         var  a = 100;
         return function () {
             console.log(a)  //a是自由变量，所以向父级寻找值
         }
     }
     var f1 = fn() //此时f1就是返回的函数
     var a = 200
     f1() //100
     
函数作为参数传递

    function F1() {
        var a = 100;
        return function () {
            console.log(a)
        }
    }
    
    var f1 = F1()
    
    function F2(fn) {
        var a = 200
        fn()//此时是执行fn，而父级作用域是声明时的
    } 
    F2() //100

### 说一下对变量提升的理解
1.变量定义
2.函数声明（声明和表达式的区别）
### 说明this 几种不同的使用场景
this使用场景：
 

> 作为构造函数执行
 作为对象属性执行
 作为普通函数执行
 call apply bind（bind必须是函数表达式的形式，函数声明不可以）
### 创建 10 个<a>标签，点击的时候弹出来对应的序号

    var i, a
    for (i=0;i<10;i++){
        (function(i){
            //函数作用域
            a = document.createElement('a')
            a.innerHTML = i + '<br/>'
            a.addEventListrner('click',function(){
                console.log(i)//自由变量，要去父级查值
            })
            document.body.qppendChild('a')
        })(i)//自执行函数只要定义之后，就会立即执行，不需要认为调用
    }

### 如何理解作用域
1.自由变量
2.作用域链，即自由变量的查找
2.闭包的两个场景
### 实际开发中闭包的应用

    //闭包实际应用中主要用于封装变量，收敛权限
    var isFirstLoad() {
        var _list = []
        return function() {
            if(_list.indexOf(id >= 0) {
                return false
            } else {
                _list.push(id)
                return true
            }
        }
    }
    //使用
    var firstLoad = isFirstLoad()
    firstLoad(10)//true
    firstLoad(10)//false
    //即在函数外边根本不可能修改list的值
    
## 异步和单线程
题目：
### 同步和异步的区别是什么
### 一个关于setTimeout的笔试题
### 前端使用异步的场景有哪些
知识点：
**什么是异步**
**前端使用异步的场景**
1.定时任务：setTimeout，setInverval
2.网络请求：ajax请求，动态<img>加载
3.事件绑定：addEventListener ('click')
**异步和单线程**




