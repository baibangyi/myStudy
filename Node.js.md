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
    
## Node.js模块系统
为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统，一个 Node.js 文件就是一个模块

### 创建模块
就是创建一个文件，Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象，有时候只是想把一个对象封装到模块中，格式如下：

    module.exports = function() {
      // ...
    }
    
来一个例子

    //hello.js 
    function Hello() { 
        var name; 
        this.setName = function(thyName) { 
            name = thyName; 
        }; 
        this.sayHello = function() { 
            console.log('Hello ' + name); 
        }; 
    }; 
    module.exports = Hello;
    
### 服务端的模块放在哪里
Node.js 中自带了一个叫做 http 的模块，我们在我们的代码中请求它并把返回值赋给一个本地变量。这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。

由于 Node.js 中存在 4 类模块（原生模块和3种文件模块），尽管 require 方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同，Node.js 的 require 方法中的文件查找策略基本就是：
1.**从文件模块缓存中加载**：尽管原生模块与文件模块的优先级不同，但是都会优先于从文件模块的缓存中加载已经存在的模块。
2.**从原生模块加载**：原生模块的优先级仅次于文件模块缓存的优先级。require 方法在解析文件名之后，优先检查模块是否在原生模块列表中。以http模块为例，尽管在目录下存在一个 http/http.js/http.node/http.json 文件，require("http") 都不会从这些文件中加载，而是从原生模块中加载。原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行。
3.**从文件加载**：当文件模块缓存中不存在，而且不是原生模块的时候，Node.js 会解析 require 方法传入的参数，并从文件系统中加载实际的文件

**require方法接受以下几种参数的传递：**

 - http、fs、path等，原生模块。
 - ./mod或../mod，相对路径的文件模块。
 - /pathtomodule/mod，绝对路径的文件模块。
 - mod，非原生模块的文件模块。

## Node.js 路由
我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。

我们需要的所有数据都会包含在 request 对象中，该对象作为 onRequest() 回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的 Node.JS 模块，它们分别是 url 和 querystring 模块。（解析器）

例子：给 onRequest() 函数加上一些逻辑，找出浏览器请求的 URL 路径
    
    //server.js
    var http = require("http");
    var url = require("url");
     
    function start() {
      function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }
     
      http.createServer(onRequest).listen(8888);
      console.log("Server has started.");
    }
     
    exports.start = start;
    
编写路由

    //router.js
    function route(pathname) {
      console.log("About to route a request for " + pathname);
    }
    exports.route = route;
    
把路由和服务器整合起来，扩展一下server.js

    var http = require("http");
    var url = require("url");
     
    function start(route) {
      function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
     
        route(pathname);
     
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }
     
      http.createServer(onRequest).listen(8888);
      console.log("Server has started.");
    }
     
    exports.start = start;
    
同时，我们会相应扩展 index.js，使得路由函数可以被注入到服务器中：
> var server = require("./server");
> var router = require("./router");
 
> server.start(router.route);

启动应用

> $ node index.js
Server has started.

浏览器访问 http://127.0.0.1:8888/，输出hello world

## Node.js 全局对象
 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
 
### __filename

> __filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

### __dirname

> __dirname 表示当前执行脚本所在的目录。

### setTimeout(cb, ms)

> setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
> 返回一个代表定时器的句柄值。

### setInterval(cb, ms)

> setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。 返回一个代表定时器的句柄值。可以使用
> clearInterval(t) 函数来清除定时器。 setInterval() 方法会不停地调用函数，直到 clearInterval()
> 被调用或窗口被关闭。

### console
console方法详见[此处][3]

 
 
 
 


  [1]: http://www.runoob.com/nodejs/nodejs-npm.html
  [2]: http://www.runoob.com/nodejs/nodejs-event.html
  [3]: http://www.runoob.com/nodejs/nodejs-global-object.html
  

### process

> process 是一个全局变量，即 global 对象的属性。 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口

process事件

 1. exit
 2. beforeExit
 3. uncaughtException
 4. Signal 事件

## Node.js 常用工具
util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。

### util.inherits
定义了一个基础对象Base 和一个继承自Base 的Sub，Base 有三个在构造函数 内定义的属性和一个原型中定义的函数，通过util.inherits 实现继承（Sub 仅仅继承了Base 在原型中定义的函数）

    util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
    
    var util = require('util'); 
    function Base() { 
        this.name = 'base'; 
        this.base = 1991; 
        this.sayHello = function() { 
        console.log('Hello ' + this.name); 
        }; 
    } 
    Base.prototype.showName = function() { 
        console.log(this.name);
    }; 
    function Sub() { 
        this.name = 'sub'; 
    } 
    util.inherits(Sub, Base); 
    var objBase = new Base(); 
    objBase.showName(); 
    objBase.sayHello(); 
    console.log(objBase); 
    var objSub = new Sub(); 
    objSub.showName(); 
    //objSub.sayHello(); 
    console.log(objSub); 
    
### util.inspect
util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。

    var util = require('util'); 
    function Person() { 
        this.name = 'byvoid'; 
        this.toString = function() { 
        return this.name; 
        }; 
    } 
    var obj = new Person(); 
    console.log(util.inspect(obj)); 
    console.log(util.inspect(obj, true)); 
    
运行结果

    Person { name: 'byvoid', toString: [Function] }
    Person {
      name: 'byvoid',
      toString: 
       { [Function]
         [length]: 0,
         [name]: '',
         [arguments]: null,
         [caller]: null,
         [prototype]: { [constructor]: [Circular] } } }
         
### util.isArray(object)
如果给定的参数 "object" 是一个数组返回true，否则返回false。

### util.isRegExp(object)
如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。

### util.isDate(object)
如果给定的参数 "object" 是一个日期返回true，否则返回false。

### util.isError(object)
如果给定的参数 "object" 是一个错误对象返回true，否则返回false。

## Node.js 文件系统
### 导入文件系统

    var fs = require("fs")
    
### 同步和异步
Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。

    var fs = require("fs");
    
    // 异步读取
    fs.readFile('input.txt', function (err, data) {
       if (err) {
           return console.error(err);
       }
       console.log("异步读取: " + data.toString());
    });
    
    // 同步读取
    var data = fs.readFileSync('input.txt');
    console.log("同步读取: " + data.toString());
    
    console.log("程序执行完毕。");

### 打开文件

    fs.open(path, flags[, mode], callback)
    //flags - 文件打开的行为
    
例子：

    var fs = require("fs");
    
    // 异步打开文件
    console.log("准备打开文件！");
    fs.open('input.txt', 'r+', function(err, fd) {
       if (err) {
           return console.error(err);
       }
      console.log("文件打开成功！");     
    });
    
### 获取文件信息

    fs.stat(path, callback)
    
fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：

    var fs = require('fs');
    
    fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
        console.log(stats.isFile());         //true
    })
    
### 写入文件

fs.writeFile(file, data[, options], callback)

    var fs = require("fs");
    
    console.log("准备写入文件");
    fs.writeFile('input.txt', '我是通过写入的文件内容！',  function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("数据写入成功！");
       console.log("--------我是分割线-------------")
       console.log("读取写入的数据！");
       fs.readFile('input.txt', function (err, data) {
          if (err) {
             return console.error(err);
          }
          console.log("异步读取文件数据: " + data.toString());
       });
    });

### 读取文件

    fs.read(fd, buffer, offset, length, position, callback)
    //fd - 通过 fs.open() 方法返回的文件描述符。
    //offset - 缓冲区写入的写入偏移量。
    //position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
    
例子
   

     var fs = require("fs");
        var buf = new Buffer(1024);
        
        console.log("准备打开已存在的文件！");
        fs.open('input.txt', 'r+', function(err, fd) {
           if (err) {
               return console.error(err);
           }
           console.log("文件打开成功！");
           console.log("准备读取文件：");
           fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
              if (err){
                 console.log(err);
              }
              console.log(bytes + "  字节被读取");
              
              // 仅输出读取的字节
              if(bytes > 0){
                 console.log(buf.slice(0, bytes).toString());
              }
           });
        });
        
### 关闭文件

    fs.close(fd, callback)
    
### 截取文件

    fs.ftruncate(fd, len, callback)
    
### 删除文件

    fs.unlink(path, callback)

### 创建目录

    fs.mkdir(path[, mode], callback)
    
例子：

    var fs = require("fs");
    
    console.log("创建目录 /tmp/test/");
    fs.mkdir("/tmp/test/",function(err){
       if (err) {
           return console.error(err);
       }
       console.log("目录创建成功。");
    });
    
### 读取目录

    fs.readdir(path, callback)
    
例子：

    var fs = require("fs");
    
    console.log("查看 /tmp 目录");
    fs.readdir("/tmp/",function(err, files){
       if (err) {
           return console.error(err);
       }
       files.forEach( function (file){
           console.log( file );
       });
    });
    
### 删除目录

    fs.rmdir(path, callback)
    
## Node.js GET/POST请求
### 获取GET请求内容
node.js 中 url 模块中的 parse 函数提供了这个功能。

    var http = require('http');
    var url = require('url');
    var util = require('util');
     
    http.createServer(function(req, res){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(util.inspect(url.parse(req.url, true)));
    }).listen(3000);
    
获取 URL 的参数

    var http = require('http');
    var url = require('url');
    var util = require('util');
     
    http.createServer(function(req, res){
        res.writeHead(200, {'Content-Type': 'text/plain'});
     
        // 解析 url 参数
        var params = url.parse(req.url, true).query;
        res.write("网站名：" + params.name);
        res.write("\n");
        res.write("网站 URL：" + params.url);
        res.end();
     
    }).listen(3000);
    
    ### 获取 POST 请求内容
  

      var http = require('http');
    var querystring = require('querystring');
     
    http.createServer(function(req, res){
        // 定义了一个post变量，用于暂存请求体的信息
        var post = '';     
     
        // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data', function(chunk){    
            post += chunk;
        });
     
        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        req.on('end', function(){    
            post = querystring.parse(post);
            res.end(util.inspect(post));
        });
    }).listen(3000);
    
    ## Node.js Web 模块
    

> Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。

### Web 应用架构

 - Client - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
 - Server - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
 - Business - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等
 - Data - 数据层，一般由数据库组成

### 使用 Node 创建 Web 服务器

    var http = require('http');
    var fs = require('fs');
    var url = require('url');
    
    
    // 创建服务器
    http.createServer( function (request, response) {  
       // 解析请求，包括文件名
       var pathname = url.parse(request.url).pathname;
       
       // 输出请求的文件名
       console.log("Request for " + pathname + " received.");
       
       // 从文件系统中读取请求的文件内容
       fs.readFile(pathname.substr(1), function (err, data) {
          if (err) {
             console.log(err);
             // HTTP 状态码: 404 : NOT FOUND
             // Content Type: text/plain
             response.writeHead(404, {'Content-Type': 'text/html'});
          }else{             
             // HTTP 状态码: 200 : OK
             // Content Type: text/plain
             response.writeHead(200, {'Content-Type': 'text/html'});    
             
             // 响应文件内容
             response.write(data.toString());        
          }
          //  发送响应数据
          response.end();
       });   
    }).listen(8081);
    
    // 控制台会输出以下信息
    console.log('Server running at http://127.0.0.1:8081/');
    
    接下来我们在该目录下创建一个 index.htm 文件，代码如下：
        <html>
    <head>
    <title>Sample Page</title>
    </head>
    <body>
    Hello World!
    </body>
    </html>

浏览器中打开地址：http://127.0.0.1:8081/index.htm

### 使用 Node 创建 Web 客户端

    var http = require('http');
    
    // 用于请求的选项
    var options = {
       host: 'localhost',
       port: '8081',
       path: '/index.htm'  
    };
    
    // 处理响应的回调函数
    var callback = function(response){
       // 不断更新数据
       var body = '';
       response.on('data', function(data) {
          body += data;
       });
       
       response.on('end', function() {
          // 数据接收完成
          console.log(body);
       });
    }
    // 向服务端发送请求
    var req = http.request(options, callback);
    req.end();
    


 
 
  