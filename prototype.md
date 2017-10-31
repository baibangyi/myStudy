# 原型 & 原型链

标签（空格分隔）： 笔记

---

[toc]
## 什么是原型
我们创建的每一个函数，都可以有一个prototype属性，该属性指向一个对象。这个对象，就是我们这里说的原型。

## prototype和__proto__的区别
prototype是函数才有的属性，而__proto__是所有对象都有的属性，但是__proto__不是一个标准属性，只有部分浏览器支持她，相应的标准属性是[[Prototype]]

    var a = {};
    console.log(a.prototype);  //undefined
    console.log(a.__proto__);  //Object {}
    
    var b = function(){}
    console.log(b.prototype);  //b {}
    console.log(b.__proto__);  //function() {}
    
## __proto__属性指向谁
而每一个new出来的实例，都有一个__proto__属性，该属性指向构造函数的原型对象，通过这个属性，让实例对象也能够访问原型对象上的方法。因此，当所有的实例都能够通过__proto__访问到原型对象时，原型对象的方法与属性就变成了共有方法与属性。

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
    
## in 
我们还可以通过in来判断，一个对象是否拥有某一个属性/方法，无论是该属性/方法存在与实例对象还是原型对象

    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    
    Person.prototype.getName = function() {
        return this.name;
    }
    
    var p1 = new Person('tim', 10);
    
    console.log('name' in p1); // true
    
## 什么是原型链

> 由于__proto__属性是任何对象都具有的属性，在JS中万物皆对象。所以就形成了一条原型链，递归访问__proto__属性必须到头，并且值是null
> 当JS引擎查找对象的属性时，先查找对象本身是否存在该属性，如果不存在，会在原型链上查找，但不会查找自身的prototype

    var A = function(){};
    var a = new A();
    console.log(a.__proto__); //A {}（即构造器function A 的原型对象）
    console.log(a.__proto__.__proto__); //Object {}（即构造器function Object 的原型对象）
    console.log(a.__proto__.__proto__.__proto__); //null


## 原型继承
只需要将子级的原型对象设置为父级的一个实例，加入到原型链中即可

    // 继承原型
    cPerson.prototype = new Person(name, age);
    
    // 添加更多方法
    cPerson.prototype.getLive = function() {}

 
 
