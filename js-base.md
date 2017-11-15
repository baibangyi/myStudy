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