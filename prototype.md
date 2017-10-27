# 原型 & 原型链

标签（空格分隔）： 笔记

---

[toc]
## 什么是原型
原型是一个对象，其他对象可以通过它实现属性继承

## prototype和__proto__的区别
prototype是函数才有的属性，而__proto__是所有对象都有的属性，但是__proto__不是一个标准属性，只有部分浏览器支持她，相应的标准属性是[[Prototype]]

    var a = {};
    console.log(a.prototype);  //undefined
    console.log(a.__proto__);  //Object {}
    
    var b = function(){}
    console.log(b.prototype);  //b {}
    console.log(b.__proto__);  //function() {}
    
## __proto__属性指向谁

 - 字面量表达式 var a = {}

> 这个表达式其实是调用new function
> object（）函数构造的一个对象，所以他的__proto__属性指向构造函数的prototype属性

 - 构造器方式

> var A = function(){} var a = new A()
> 此时对象a的__proto__属性指向他的构造函数A的prototype属性

 - Objectcreate()方式

> var a1 = {} var a2 = Object.create(a1);
此时a2的__proto__属性指向a1

    /*1、字面量方式*/
    var a = {};
    console.log(a.__proto__);  //Object {}
    
    console.log(a.__proto__ === a.constructor.prototype); //true
    
    /*2、构造器方式*/
    var A = function(){};
    var a = new A();
    console.log(a.__proto__); //A {}
    
    console.log(a.__proto__ === a.constructor.prototype); //true
    
    /*3、Object.create()方式*/
    var a1 = {a:1}
    var a2 = Object.create(a1);
    console.log(a2.__proto__); //Object {a: 1}
    
    console.log(a.__proto__ === a.constructor.prototype); //false（此处即为图1中的例外情况）
    
## 什么是原型链

> 由于__proto__属性是任何对象都具有的属性，在JS中万物皆对象。所以就形成了一条原型链，递归访问__proto__属性必须到头，并且值是null
> 当JS引擎查找对象的属性时，先查找对象本身是否存在该属性，如果不存在，会在原型链上查找，但不会查找自身的prototype

    var A = function(){};
    var a = new A();
    console.log(a.__proto__); //A {}（即构造器function A 的原型对象）
    console.log(a.__proto__.__proto__); //Object {}（即构造器function Object 的原型对象）
    console.log(a.__proto__.__proto__.__proto__); //null

 
 
 
 
