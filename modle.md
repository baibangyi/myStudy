# 模式 & 构造函数

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

## 构造函数

 - 与普通函数相比，构造函数并没有任何特别的地方，首字母大写只是我们约定的小规定，用于区分普通函数；
 - new关键字让构造函数具有了与普通函数不同的许多特点，而new的过程中，执行了如下过程：
  - 声明一个中间对象
  - 该中间对象的原型指向构造函数的原型
  - 将构造函数的this，指向该中间对象
  - 返回该中间对象，即返回实例对象

