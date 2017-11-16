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

