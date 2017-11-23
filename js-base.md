# js基础题

标签（空格分隔）： 面试题

---

## 隐式转换
1.运算符（+符号比较特殊）

    1 + '2' = 12
    1 + 2 + '3' = 33

2.if，for-in，while条件循环语句

    if(1){} //会转换为boolean值

3.valueof（）和tostring（），number（）

## 将字符串转换为数值的方法
Number（），parseInt（），值运算

## null和undefined的区别
null：是设置了一个对象并赋值了，只是这个值是空的
undefined：是设置了但没赋值

## 节点操作
### nodetype类型
1.nodetype == 1   元素节点
2.nodetype == 2   属性节点
3.nodetype == 3   文本节点

### 添加节点
appendChild()  在childNodes列表末尾添加节点
insertBefore() 在childNodes列表指定位置添加节点
replaceChild() 替换列表中的某节点
removeChild()  移出列表中的某节点

### Document类型
firstChild  ==  childNodes[0]
三个与网页有关的属性：
1.URL：包含完整的url
2.domain：包含页面的域名
3.referrer： 保存着链接到当前页面的那个页面的URL

### 查找元素
1.getElementById()
2.getElementByTagName()
3.getElementByClassName()

### 属性
1.getAttribute()      获取属性
2.setAttribute()      设置属性
3.removeAttribute()   移出属性  


### 创建
1.createElement()     创建元素
2.createTextNode()    创建文本节点

## 数组
### 创建一个数组的方法
1.new Array（）实例对象
可以传入数组长度new Array（5）
可以复制new Array([1,2,3])
2.创建表达式
var arr1 = []
可以直接复制var arr1 = [1,2,3]

### 数组的内置方法们
1.length（）  返回数组长度
2.push（） 从数组尾部添加
3.unshift（） 从数组头部添加
4.pop() 从数组尾部删除
5.shift（） 从数组头部删除
6.concat（） 合并两个数组
7.join（） 把当前数组用指定字符串连接起来，并返回的字符串
8.slice（） 截取数组部分长度，并返回新数组
9.splice（） 在指定位置添加/删除指定位数的数组项
10.indexof（） 返回指定数组项的位置索引，没有返回-1
11.sort（） 将数组重新排序后，返回新数组
12.reverce（） 将数组倒序后返回新数组

### 数组去重
1.基本数组去重

    array.prototype.unique = function(){
    	var result = [];
    	this.foreach(function(v){
    		if(result.indexof(v) < 0) {
    			result.push(v)
    		}
    		return result
    	})
    }

2.先排序在去重

    array.prototype.unique = function(){
    	var result = [];
    	this.foreach(function(v){
    		if(result.indexof(v) , 0) {
    			result.push(v)
    		}
    		return result
    	})
    }

## 合并对象
1.jQuery.extend([deep], target, object1, [objectN])
2.用 Object.assign()
3.遍历赋值法 

    var extend = function(o,n){
        for(p in n){
           if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) )){
              o[p] = n[p]
           }
        }
    }
4.展开符

    let arr = ['b','c']
    ['a',...arr,'d']
    //['a','b','c','d']

## map 和 foreach的区别
map是根据函数执行后返回一个新数组，foreach是没有返回值的，所以没有办法终止或跳出循环的

## 遍历一个对象的方法
1.迭代遍历foreach
2.ES6之6种遍历对象属性的方法：for in 、 Obejct.keys(obj) 、 Object.getOwnPropertyNames(obj) 、 Object.getOwnPropertySymbols(obj) 、 Reflect.ownKeys(obj) 、 Reflect.enumerate(obj)
3.jquery方法each

## 缓存机制
http的响应头中有一个叫Expires的字段，告诉浏览器一个过期时间，在过期时间前，浏览器可以直接读取缓存不需要再次请求。但是这是一个老东西了现在基本不用了。
代替expires的是cache-control，也是指明资源的有效期来判断是否发起新的请求，好像比expires要高级一点具体的我不太清楚。
然后如果资源到期了，就要判断Last-Modified资源最后修改的时间，如果过期且有最后修改的时间，则向服务器发送If-Modified-Since带着最后修改时间与服务器上的资源的最后修改时间进行比对，如果资源有修改返回200，把新资源发送给浏览器，如果没有修改则返回304读取缓存就好。
然后还有一种ETag的方式，也是最准确的
etag是将文件的索引（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到。
 如果过期了将etag发送给服务器，与服务器上的资源的校验串进行比对，决定是200还是304.
etag解决了可以比Last-Modified更精确，精确到了毫秒级。
如果文件被定期生成但是内容却没有任何变化Last-Modified也不能正确判断

## js的几种数据类型
number boolean object undefined string null

## js的几种引用类型
函数，对象，数组

## js的几种内置对象
number string Function Array Object Boolean Date Math Regexp

## js的同步和异步
个人总结：由于js的主要用途是与用户交互以及操作Dom树，所以他只能是单线程的，所谓同步就是把任务放在主线程上，一次执行，只有执行完上一个任务才能执行下一个任务，而异步就是不进入主线程的任务，而进入任务队列中，在主线程的任务都结束了，之后，在来执行队列中的人物

## 标签语义化的理解
根据内容结构化选择合适的标签便于开发者阅读和浏览器爬虫爬去数据
好处是： 
1.可以在css加载失败时，页面也能呈现出良好的效果
2.在团队开发中，语义化标签有利于课增强可读性
3.便于搜索引擎，爬虫是根据标签确定还是那个下文的
4.方便其他设备解析代码
html5新增的语义化标签：header，footer,nav,articl,section,asied
注意点：
1.input标签对应的说明文本要用label标签，
2.使用表格时，标题用caption，表头用tHead，主体用tBody

## js事件流
定义：事件流就是接收时间的顺序（个人理解：事件发生的流水线）
事件流分为三个阶段：
事件捕获阶段：从最外层父元素开始，一次向下执行事件
目标阶段：找到最内层的目标对象
事件冒泡事件：从最具体的元素开始执行，一次向上执行

## TCP的三次握手和四次挥手
三次握手：
1.客户端发送一个SYN的请求，告诉服务端我想链接你
2.服务端收到请求，回答一个ACK，并告诉客户端我已经准备好了SYN
3.客户端收到回复后，回答一个ACK给服务端
于是便可进行数据请求了
四次挥手：
1.客户端发送一个FIN给服务端，告诉他我想断开了
2.服务端回答一个ACK说知道了，但我还有没完的数据要传给你
3.服务端将数据传递完以后，发送FIN告知客户端
4.客户端给了一个ACK的回应，say拜拜


## 输入一个url以后 会发生什么（请求数据过程）
第一步：DNS域名解析（缓存->操作系统->获取ip地址）
第二步：建立TCP连接：三次握手
第三步：发送http请求（报文头，主体，方式）
第四步：响应http请求（响应头，主体）
第五步：渲染页面（构建DOM树，css树，整合成RenderTree渲染树）

第一步涉及到缓存机制：
第五步涉及到性能优化：

## mvc & mvp & mvvm
1. mvc的全称是model view controlltor  ， 他们之间的关系就是view层通知controlltor用户需要改变，controlltor收到通知后通知model层做一些数据处理，最后model层将数据返回给view层，他的缺点是model层和view层没有解耦，在大型项目中会很麻烦
2. mvp 的全称是view model presenter  他们之间的关系是view层发出指令要改变，prsenter层接收到指令后，去操作model层，操作好以后将最终数据返回给view层  他的好处是view层和model层完全解耦，而且view层和presenter层可以通过相关接口连接
3. mvvm 的全称是view model viewmodel  他们之间的关系是view层和viewmodel层双向绑定，也就是他们两者之间任何一个改变，都会影响另一方改变，同样也是viewmodel层通知model层进行数据处理，model层将处理好的数据返回给viewmodel层，进而使view层发生改变


##  八大排序
插入排序
### 直接插入排序
基本思想：选择序列的第一项看作一个有序子序列，从第二个序列项开始逐个插入，直到整个序列变为有序序列
### 希尔排序
基本思想：将整个序列分为若干个子序列，在子序列中进行中直接插入排序，“基本有序”后再将整个序列进行直接插入排序，希尔排序相较于直接插入排序的优点是，节约的时间
方法：假设有n个序列项， 设相聚d=n/2的两项为一组，这样将整个序列分为d个子序列，将子序列进行直接排序，再取d=d/2，一次进行直接排序，直到整个序列有序
交换排序
### 冒泡排序
基本思想：从第一个序列项开始，一次与相邻项比较，反序则交换。这样让较小的项网上冒，较大的项往下沉
### 快速排序
基本思想：选择一个基准序列项，一般为第一个或者最后一个，然后将待排序列项分为两部分，左边为小于基准项的区域，右边为大于基准项的区域，重复上述步骤，直到有序
选择排序
### 简单选择排序
基本思想：以第一序列项为基准，选择其余序列项中最小的项与第一项交换位置，再以第二个序列项为准，选择其余项的最小项进行交换，重复进行，直到有序

### 堆排序
基本思想：将序列构造成一个堆，序列中最大项为堆顶，去除最大项，将剩余的项选出最大项，构成堆，重复操作，直到有序