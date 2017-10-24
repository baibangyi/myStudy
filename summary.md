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
1.同步会阻塞代码执行，而异步不会
2.alert是同步，setTimeout是异步
### 一个关于setTimeout的笔试题
### 前端使用异步的场景有哪些
知识点：
**什么是异步**
**前端使用异步的场景**
1.定时任务：setTimeout，setInverval
2.网络请求：ajax请求，动态<img>加载
3.事件绑定：addEventListener ('click')
**异步和单线程**
执行异步代码时，会依次执行，当执行到以上三点异步代码时，将异步代码放一边，接着执行，执行完整段代码后，在将放在一边的异步代码拿来执
单线程就是一次只能做一件事

## 其他内容
### 题目：
**获取2017-06-10 格式的日期**

    function formatDate(dt){
        if (!dt) {
            dt = new Date()
        }
        var year = dt.getFullYear()
        var month = dt.getMonth() + 1
        var date = dt.getDate()
        if(month< 10) {
            month = '0' + month
        }
        if(date<10){
            date = '0' + date
        }
        return year + '-' + month  + '-' + data
    }
    var dt = new Date()
    var formatDate = formatDate(dt)
    console.log(formatDate)

**获取随机数，要求是长度一致的字符串格式**

    var random = Math.random()
    var random = random + '0000000000'
    var random = random.slice(1, 10)
    console.log(random)

**写一个能遍历对象和数组的通用forEach 函数**

    function forEach(obj,fn){
        var key
        if(obj instanceof Array){
        obj.forEach(function(item, index){
            console.log(index,item)
        })
        } else {
            for(key in obj){
                console.log(key,obj[key])
            }
        }
    }

### 知识点
**日期函数**
1.Date.now() //获取当前时间毫秒数
2.var dt = new Date() 
3.dt.getTime() //获取毫秒数
4.dt.getFullYear() //年
5.dt.getMonth() //月(0 - 11)
6.dt.getDate() //日（0 - 31）
7.dt.getHours() //小时（0 - 23）
8.dt.getMinute() //分钟（0 - 59）
9.dt.getSeconds() //秒（0 - 59）

**Math**
获取随机数Math.random（），返回0 - 1 之间的随机数

**数组API**
forEach 遍历所以元素
every 判断所有元素是否都符合条件
some 判断是否有至少一个元素符合条件
sort 排序
map 对元素重新组装，生成新数组
filter 过滤符合条件的元素

**对象API**
for in

## 从基础知识到JS-Wed-API
### DOM
**题目**：
1.DOM是哪种基本的数据结构
树
2.DOM操作的常用API有哪些
1.获取Dom节点，以及节点的prototype和Attribute
2.获取父节点，获取子节点
3.新增节点，删除节点
DOM节点的attr 和 property 有何区别
 前者是针对html标签属性的修改和获取，后者是针对js对象属性的修改和获取


**知识点**：
1.DOM本质
html是一种特殊xml
DOM可以理解为浏览器把拿到的html代码，结构化为一个浏览器能识别并且js可操作的一个模型
2.DOM节点操作
**获取DOM节点**
getElementById，querySelectorAll等
**prototype**
js对象上的属性
所有获取的元素都是对象，所以可以扩展属性，例如style，nodename
**Attribute**
getAttribute，setAttribute
获取的是html中的属性
3.DOM结构操作
**新增节点**
createElement（）后appendChild（）
**获取父元素**
parentElement
**获取子元素**
childNode（包含nodeType，nodeName）
**删除节点**
removeChild（）

 知识点
 ### BOM操作
 **题目**：
 如何检测浏览器的类型
 

    var ua = nvigator.userAgent
     var isChrom = ua.indexof('Chrom')
     console.log(isChrom)

 拆解url的各部分
 

    location.href
     location.protocol//'http','https'
     location.host//域名
     location.pathname//路径'/learn/199
     location.search//url中？后面的参数
     location.hash

 
 **粗体文本**
 navigator浏览器：
 var ua = navigator.userAgent浏览器特性
 screen屏幕：width屏幕大小
 location本地：
 location.href
 location.protocol//'http','https'
 location.host//域名
 location.pathname//路径'/learn/199
 location.search//url中？后面的参数
 location.hash
 history历史：
 history.back()//返回
 history.forward()//前进
 
 ## 事件
 **题目**：
 1.编写一个通用的事件监听函数
 2.描述事件冒泡
 3.对于一个无限下拉加载图片的页面，如何给每个图片绑定页面
 
 **知识点**
 1.通用事件绑定
 

    function bindEvent(elem,type,fn){
         elem.addEventListener(type,fn)
     }
     
     var a = document.createElement('a')
     bindEvent(a,'click',function(e){
         e.preventDefault()//阻止默认行为
         alert('clicked')
     })

 2.事件冒泡
 如果子元素上有一个点击事件，父元素上也有一个点击事件，那么子元素上的点击事件就会冒泡到父元素上，如果要阻止事件冒泡，可以用e.stopPropatation()
 3.代理
 代理的优势：
 1.代码简洁
 2.减少浏览器内存占用
 html页面代码：
 

    <div id="div1">
       <a href="#">a1</a>
       <a href="#">a2</a>
       <a href="#">a3</a>
       <a href="#">a4</a>
     </div>
     
js页面代码：

    var div1 = document.getElementById('div1')
    div1.addEventListener('click',function(e){
        var target = e.target//时间代理，获取到真正被点击的元素
        if(target.nodeName === A){
            alert(target,innerHTML)
        }
    })
    
**完善的通用事件绑定函数**

    function bindEvent(elem,type,selector,fn){
        if(fn == null){
            fn = selector
            selector = null
        }
        elem.addEventListener(type,function(e){
            var target
            if(selector){
                target = e.target
                if(target.matches(selector)){
                    //matches（）是说target是否符合selector标签
                    fn.call(target,e)
                }
            } else {
                fn(e)
            }
        })
    }
    
    //使用代理
    bindEvent(div1,'click','a',function(e){
        console.log(this.innerHTML)
        
        //不适用代理
        var a = document.createElement('a')
        bindEvent(div1,'click',function(e){
            console.log(a.innerHTML)
        })
    })
    
## Ajax
**题目**：
1.手动编写一个Ajax，不依赖第三方库
2.跨域的几种实现方法

**知识点**
1.XMLHttpReqest
2.状态吗说明
readyDtate:
0（未初始化）：还没有调用send（）方法
1（载入）：已调用send（），正在发送请求
2（载入完成）：send()方法执行完成，已经接收到全部相应内容
3（交互）：正在解析相应内容
4（完成）响应内容解析完成，可以在客户端调用了

status:
2xx:表示成功处理请求
3xx：需要重定向，浏览器直接跳转
4xx：客户端请求错误
5xx：服务端错误
3.跨域
**什么是跨域**
浏览器有同源策略，不允许ajax访问其他域的接口
跨域条件：协议，域名，端口有一个不同就是跨域
Ajax实现原理：

    var xhr = new XMLHttpRequest()//生成一个对象
    xhr.open("get","/api",false)
    xhr.onreadystatechange = function(){
        //这里是函数异步执行
        if(xhr.readyState == 4) {
            if(xhr.status == 200){
                alert(xhr.responseText)
            }
        }
    }

可以跨域的三个标签
<img>:打点统计，统计网站可能是其他域
<script>，<link>：都可以使用CDN，CDN的域名是其他域名
<script>:用于JSONP
**JSONP**
实现原理：
在script标签里请求地址并加上一个不存在的动态文件地址，如：http://www.sff.sad/ajsd.js,组合成的新地址用来返回一个包含我们需要的数据的callback，我们再定义callback执行
**服务器端设置http hearder**知道即可

### 存储
**题目**：
1.请描述一下cookie,sessionStorage 和 localStorage 的区别
容量
是否会携带到Ajax中
Api的易用性
**知识点**
1.**cookie**
1.本来用于客户端和服务器端通信
2.由于它本身有本地存储的能力，就被“借用”了
3.使用document.cookie = ....获取和修改即可
4.cookie用于存储的缺点：

> 存储量太小，只有4kb
> 所有http请求都带着它，会影响获取资源的xiaol
> 封装的API太简单了，需要我们自己封装才能用document.cookie = ...
2.**sessionStorage 和 localStorage**
它们是专门为存储设计的，因为不会再请求时携带，所以最大容量5M
API易用：localStorage.setItem(key,value);localStorage.getItem(key,value)
而sessionStorage是在容量过大时会自动清理，localStorage不会，所以一般用后者


 



