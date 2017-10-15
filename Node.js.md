# Node.js
[toc]
## 创建第一个实例
先了解下 Node.js 应用是由哪几部分组成的：

> 1.引入 required 模块：我们可以使用 require 指令来载入 Node.js 模块。
> 2.创建服务器：服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。
> 3.接收请求与响应请求 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。


###创建服务器
使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据

    //引入http模块
    var http = require('http');
    
    http.createServer(function (request, response) {
    
        // 发送 HTTP 头部 
        // HTTP 状态值: 200 : OK
        // 内容类型: text/plain
        response.writeHead(200, {'Content-Type': 'text/plain'});
    
        // 发送响应数据 "Hello World"
        response.end('Hello World\n');
    }).listen(8888);
    
    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8888/');

使用 node 命令执行以上的代码：

    //结果显示
    node server.js
    Server running at http://127.0.0.1:8888/
    
打开浏览器访问 http://127.0.0.1:8888/，你会看到一个写着 "Hello World"的网页。

## NPM 使用介绍
###　什么是NPM
NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题

### 使用 npm 命令安装模块
npm 的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已，比如：

> npm install express          # 本地安装
npm install express -g   # 全局安装
    
### 本地安装

 1. 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
 2. 可以通过 require() 来引入本地安装的包

###　全局安装

 1. 将安装包放在 /usr/local 下或者你 node 的安装目录
 2. 可以直接在命令行里使用

###　使用 package.json

> package.json 位于模块的目录下，用于定义包的属性

详见[此处][1]

  
 


### 卸载模块

    $ npm uninstall express
    
### 更新模块

    $ npm update express
    
###　搜索模块

    $ npm search express
    
### 创建模块
创建模块，package.json 文件是必不可少的。我们可以使用 NPM 生成 package.json 文件，生成的文件包含了基本的结果。

    $ npm init
    
## Node.js 回调函数
Node.js 异步编程的直接体现就是回调。Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

### 阻塞代码实例
创建一个文件 input.txt 

创建 main.js 文件, 代码如下：

    var fs = require("fs");
    
    var data = fs.readFileSync('input.txt');
    
    console.log(data.toString());
    console.log("程序执行结束!");
    
执行$ node main.js

### 非阻塞代码实例

    var fs = require("fs");
    
    fs.readFile('input.txt', function (err, data) {
        if (err) return console.error(err);
        console.log(data.toString());
    });
    
    console.log("程序执行结束!");
    
## Node.js 事件循环
Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

### 事件驱动程序
Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户

Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件

    // 引入 events 模块
    var events = require('events');
    // 创建 eventEmitter 对象
    var eventEmitter = new events.EventEmitter();
    
    // 创建事件处理程序
    var connectHandler = function connected() {
       console.log('连接成功。');
      
       // 触发 data_received 事件 
       eventEmitter.emit('data_received');
    }
    
    // 绑定 connection 事件处理程序
    eventEmitter.on('connection', connectHandler);
     
    // 使用匿名函数绑定 data_received 事件
    eventEmitter.on('data_received', function(){
       console.log('数据接收成功。');
    });
    
    // 触发 connection 事件 
    eventEmitter.emit('connection');
    
执行程序

    $ node main.js
    连接成功。
    数据接收成功。
    程序执行完毕。
    
    console.log("程序执行完毕。");
    
### Node 应用程序是如何工作的？
 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数
 

    var fs = require("fs");
    
    fs.readFile('input.txt', function (err, data) {
       if (err){
          console.log(err.stack);
          return;
       }
       console.log(data.toString());
    });
    console.log("程序执行完毕");
## Node.js EventEmitter

> Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。
Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。

### EventEmitter 类
events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装

    //event.js 文件
    var EventEmitter = require('events').EventEmitter; 
    var event = new EventEmitter(); 
    event.on('some_event', function() { 
        console.log('some_event 事件触发'); 
    }); 
    setTimeout(function() { 
        event.emit('some_event'); 
    }, 1000); 
    
运行结果

> $ node event.js 
some_event 事件触发

EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器，当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递

    //event.js 文件
    var events = require('events'); 
    var emitter = new events.EventEmitter(); 
    emitter.on('someEvent', function(arg1, arg2) { 
        console.log('listener1', arg1, arg2); 
    }); 
    emitter.on('someEvent', function(arg1, arg2) { 
        console.log('listener2', arg1, arg2); 
    }); 
    emitter.emit('someEvent', 'arg1 参数', 'arg2 参数')
    
运行结果

    $ node event.js 
    listener1 arg1 参数 arg2 参数
    listener2 arg1 参数 arg2 参数

### 其他事件，方法，类
详尽[此处][2]
    


  [1]: http://www.runoob.com/nodejs/nodejs-npm.html
  [2]: http://www.runoob.com/nodejs/nodejs-event.html
  
### error 事件

> EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。
当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。
我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。例如：

    var events = require('events'); 
    var emitter = new events.EventEmitter(); 
    emitter.emit('error'); 
    
### 继承 EventEmitter
大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类

## Node.js Buffer(缓冲区)
### 创建 Buffer 类

    //创建长度为 10 字节的 Buffer 实例：
    var buf = new Buffer(10);
    //通过给定的数组创建 Buffer 实例：
    var buf = new Buffer([10, 20, 30, 40, 50]);
    //通过一个字符串来创建 Buffer 实例：
    var buf = new Buffer("www.runoob.com", "utf-8");
    
### buffer可以做什么

 - 写入缓冲区 buf.write(string[, offset[, length]][, encoding])
 - 从缓冲区读取数据 buf.toString([encoding[, start[, end]]]
 - 将 Buffer 转换为 JSON 对象 buf.toJSON()
 - 缓冲区合并 Buffer.concat(list[, totalLength])
 - 缓冲区比较 buf.compare(otherBuffer);
 - 拷贝缓冲区 buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
 - 缓冲区裁剪 buf.slice([start[, end]]) 
 - 缓冲区长度 buf.length;

## Node.js Stream(流)
Node.js，Stream 有四种流类型：

 - Readable - 可读操作。
 - Writable - 可写操作。
 - Duplex - 可读可写操作.
 - Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

 - data - 当有数据可读时触发
 - end - 没有更多的数据可读时触发
 - error - 在接收和写入过程中发生错误时触发。
 - finish - 所有数据已被写入到底层系统时触发。

### 从流中读取数据

    var fs = require("fs");
    var data = '';
    
    // 创建可读流
    var readerStream = fs.createReadStream('input.txt');
    
    // 设置编码为 utf8。
    readerStream.setEncoding('UTF8');
    
    // 处理流事件 --> data, end, and error
    readerStream.on('data', function(chunk) {
       data += chunk;
    });
    
    readerStream.on('end',function(){
       console.log(data);
    });
    
    readerStream.on('error', function(err){
       console.log(err.stack);
    });
    
    console.log("程序执行完毕");
    
### 写入流

    var fs = require("fs");
    var data = '菜鸟教程官网地址：www.runoob.com';
    
    // 创建一个可以写入的流，写入到文件 output.txt 中
    var writerStream = fs.createWriteStream('output.txt');
    
    // 使用 utf8 编码写入数据
    writerStream.write(data,'UTF8');
    
    // 标记文件末尾
    writerStream.end();
    
    // 处理流事件 --> data, end, and error
    writerStream.on('finish', function() {
        console.log("写入完成。");
    });
    
    writerStream.on('error', function(err){
       console.log(err.stack);
    });
    
    console.log("程序执行完毕");
    
### 管道流
管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

    var fs = require("fs");
    
    // 创建一个可读流
    var readerStream = fs.createReadStream('input.txt');
    
    // 创建一个可写流
    var writerStream = fs.createWriteStream('output.txt');
    
    // 管道读写操作
    // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
    readerStream.pipe(writerStream);
    
    console.log("程序执行完毕");
    
### 链式流
链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。可用管道和链式来压缩和解压文件

    var fs = require("fs");
    var zlib = require('zlib');
    
    // 压缩 input.txt 文件为 input.txt.gz
    fs.createReadStream('input.txt')
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream('input.txt.gz'));
      
    console.log("文件压缩完成。");
    
    var fs = require("fs");
    var zlib = require('zlib');
    
    // 解压 input.txt.gz 文件为 input.txt
    fs.createReadStream('input.txt.gz')
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream('input.txt'));
      
    console.log("文件解压完成。");

 
 
 
