# 模式

标签（空格分隔）： 面试笔记

---

[toc]
## 工厂模式
### 什么是工厂模式
工厂模式就是我们提供一个模子，然后通过这个模子复制出我们需要的对象

    var createPerson = function(name, age) {
    
        // 声明一个中间对象，该对象就是工厂模式的模子
        var o = new Object();
    
        // 依次添加我们需要的属性与方法
        o.name = name;
        o.age = age;
        o.getName = function() {
            return this.name;
        }
    
        return o;
    }
    
    // 创建两个实例
    var perTom = createPerson('TOM', 20);
    var PerJake = createPerson('Jake', 22);

## 构造函数模式

 - 与普通函数相比，构造函数并没有任何特别的地方，首字母大写只是我们约定的小规定，用于区分普通函数；
 - new关键字让构造函数具有了与普通函数不同的许多特点，而new的过程中，执行了如下过程：
  - 声明一个中间对象
  - 该中间对象的原型指向构造函数的原型
  - 将构造函数的this，指向该中间对象
  - 返回该中间对象，即返回实例对象


>     function Person(name,age,job){
>     	this.name = name;
>     	this.age = age;
>     	this.job= job
>     	this.sayName= function(){
>     		console.log(this.name)
>     	}
>     }
>     
>     var Person1 = new Person('asf',20,'sdb')

## 工厂模式 & 构造函数模式 的 区别
构造函数没有显示的创建对象var o = new Object();
构造函数直接将作用域赋给新对象（这里this指向新对象）
构造函数没有return语句

## 原型模式
将公共属性和方法放在原型上定义

    function Person(name,age,job){
    	this.prototype.name = name;
    	this.prototype.age = age;
    	this.prototype.job= job
    	this.prototype.sayName= function(){
    		console.log(this.name)
    	}
    }
    
    var Person1 = new Person('asf',20,'sdb')
    

## 动态原型模式
同时保留构造函数和原型模式的有点，判断某个应该存在的方法是否有效，来决定是否要初始化原型

    function Person(name,age,job){
    	this.name = name;
    	this.age = age;
    	this.job= job
    	if(typeof this.sayName != "function"){
    		Person.prototype.sayName= function(){
    		console.log(this.name)
    	}
    }
    }
    
    var Person1 = new Person('asf',20,'sdb')
    Person1.sayName()
    
## 寄生构造函数模式
该函数仅仅用来封装创建的对象，然后返回新建的对象

    var createPerson = function(name, age) {
        
            // 声明一个中间对象，该对象就是工厂模式的模子
            var o = new Object();
        
            // 依次添加我们需要的属性与方法
            o.name = name;
            o.age = age;
            o.getName = function() {
                return this.name;
            }
        
            return o;
        }
        
        // 创建两个实例
        var perTom = new createPerson('TOM', 20);
        
## 稳妥构造函数模式
稳妥对象：指没有公共属性，而且其方法也不引用this的对象。该对象最适用于安全环境（这种环境禁止使用this和new）或者在防止其他应用程序改动数据时

var createPerson = function(name, age) {
        
            // 声明一个中间对象，该对象就是工厂模式的模子
            var o = new Object();
        
            // 依次添加我们需要的属性与方法
            o.name = name;
            o.age = age;
            o.getName = function() {
                return this.name;
            }
        
            return o;
        }
        
        // 创建两个实例
        var perTom =    createPerson('TOM', 20);