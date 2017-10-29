# 浏览器缓存机制

标签（空格分隔）： 笔记

---

[toc]
## 什么是浏览器缓存
浏览器缓存就是把一个已经请求过的Web资源（如html页面，图片，js，数据等）拷贝一份副本储存在浏览器中

## 为什么使用缓存
（1）减少网络带宽消耗
（2）降低服务器压力
（3）减少网络延迟，加快页面打开速度

## 浏览器端的缓存规则
对于浏览器端的缓存来讲，这些规则是在HTTP协议头和HTML页面的Meta标签中定义的。他们分别从新鲜度和校验值两个维度来规定浏览器是否可以直接使用缓存中的副本，还是需要去源服务器获取更新的版本。

**新鲜度（过期机制）：**也就是缓存副本有效期。一个缓存副本必须满足以下条件，浏览器会认为它是有效的，足够新的：

 - 含有完整的过期时间控制头信息（HTTP协议报头），并且仍在有效期内；
 -  浏览器已经使用过这个缓存副本，并且在一个会话中已经检查过新鲜度；

**校验值（验证机制）：**校验值（验证机制）：服务器返回资源的时候有时在控制头信息带上这个资源的实体标签Etag（Entity Tag），它可以用来作为浏览器再次请求过程的校验标识。如过发现校验标识不匹配，说明资源已经被修改或过期，浏览器需求重新获取资源内容

## 浏览器缓存的控制
（1）**使用HTML Meta 标签**
Web开发者可以在HTML页面的<head>节点中加入<meta>标签，代码如下：

    <meta http-equiv="Pragma" content="no-cache"> 
    
（2）**使用缓存有关的HTTP消息报头**
**Cache-Control：**
告诉浏览器忽略资源的缓存副本，强制每次请求直接发送给服务器，拉取资源，但不是“不缓存”
**Expires：**
用缓存和定义缓存时间。告诉浏览器资源缓存过期时间，如果还没过该时间点则不发请求
**Last-Modified：**
告诉浏览器这个资源最后的修改时间。服务器将资源传递给客户端时，会将资源最后更改的时间以“Last-Modified: GMT”的形式加在实体首部上一起返回给客户端
**ETag**
告诉浏览器当前资源在服务器的唯一标识符（生成规则又服务器决定）

**Cache-Control与Expires**
Cache-Control与Expires的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。只不过Cache-Control的选择更多，设置更细致，如果同时设置的话，其优先级高于Expires。

**Last-Modified/ETag与Cache-Control/Expires**
配置Last-Modified/ETag的情况下，浏览器再次访问统一URI的资源，还是会发送请求到服务器询问文件是否已经修改，如果没有，服务器会只发送一个304回给浏览器，告诉浏览器直接从自己本地的缓存取数据；如果修改过那就整个数据重新发给浏览器；

Cache-Control/Expires则不同，如果检测到本地的缓存还是有效的时间范围内，浏览器直接使用本地副本，不会发送任何请求。两者一起使用时，Cache-Control/Expires的优先级要高于Last-Modified/ETag。即当本地副本根据Cache-Control/Expires发现还在有效期内时，则不会再次发送请求去服务器询问修改时间（Last-Modified）或实体标识（Etag）了

一般情况下，使用Cache-Control/Expires会配合Last-Modified/ETag一起使用，因为即使服务器设置缓存时间, 当用户点击“刷新”按钮时，浏览器会忽略缓存继续向服务器发送请求，这时Last-Modified/ETag将能够很好利用304，从而减少响应开销

## 不能缓存的请求

 - HTTP信息头中包含Cache-Control:no-cache，pragma:no-cache（HTTP1.0），或Cache-Control:max-age=0等告诉浏览器不用缓存的请求
 -  需要根据Cookie，认证信息等决定输入内容的动态请求是不能被缓存的
 -  过HTTPS安全加密的请求（有人也经过测试发现，ie其实在头部加入Cache-Control：max-age信息，firefox在头部加入Cache-Control:Public之后，能够对HTTPS的资源进行缓存，参考《HTTPS的七个误解》）
 -  POST请求无法被缓存
 -  HTTP响应头中不包含Last-Modified/Etag，也不包含Cache-Control/Expires的请求无法被缓存

 

 
