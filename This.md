# This

标签（空格分隔）： 面试笔记

---

[toc]
## this的指向
this的指向，是在函数被调用的时候确定的,也就是执行上下文被创建时确定的

## 函数中的this
在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。如果函数独立调用，那么该函数内部的this，则指向undefined。但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。

## 使用call，apply显示指定this
call与applay后面的参数，都是向将要执行的函数传递参数。其中call以一个一个的形式传递，apply以数组的形式传递。这是他们唯一的不同。

## call/apply 多处的场景
### 将类数组对象转换为数组

    function exam(a, b, c, d, e) {
        
        // 先看看函数的自带属性 arguments 什么是样子的
        console.log(arguments);
    
        // 使用call/apply将arguments转换为数组, 返回结果为数组，arguments自身不会改变
        var arg = [].slice.call(arguments);
    
        console.log(arg);
    }
    
    exam(2, 8, 9, 10, 3);
    
    // result: 
    // { '0': 2, '1': 8, '2': 9, '3': 10, '4': 3 }
    // [ 2, 8, 9, 10, 3 ]
    // 
    // 也常常使用该方法将DOM中的nodelist转换为数组
    // [].slice.call( document.getElementsByTagName('li') );


### 根据自己的需要灵活修改this指向

### 实现继承

    // 定义父级的构造函数
    var Person = function(name, age) {
        this.name = name;
        this.age  = age;
        this.gender = ['man', 'woman'];
    }
    
    // 定义子类的构造函数
    var Student = function(name, age, high) {
    
        // use call
        Person.call(this, name, age);
        this.high = high;
    }
    Student.prototype.message = function() {
        console.log('name:'+this.name+', age:'+this.age+', high:'+this.high+', gender:'+this.gender[0]+';');
    }
    
    new Student('xiaom', 12, '150cm').message();
    
    // result
    // ----------
    // name:xiaom, age:12, high:150cm, gender:man;

## 构造函数与原型方法上的this
### new一个新的对象的过程

 - 创建一个新的对象
 - 将构造函数的this指向这个新对象
 - 指向构造函数的代码，为这个对象添加属性，方法等
 - 返回新对象

### 例子

    function Person(name, age) {
    
        // 这里的this指向了谁?
        this.name = name;
        this.age = age;   
    }
    
    Person.prototype.getName = function() {
    
        // 这里的this又指向了谁？
        return this.name;
    }
    
    // 上面的2个this，是同一个吗，他们是否指向了原型对象？
    
    var p1 = new Person('Nick', 20);
    p1.getName();

### 原型方法上的this
指向调用者
 
