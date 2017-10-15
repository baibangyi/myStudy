//阻塞代码的实例
// var fs = require('fs');

// var data = fs.readFileSync('./input.txt');

// console.log(data.toString());
// console.log('程序执行结束！');

//非阻塞代码的实例
// var fs = require("fs");

// fs.readFile('input.txt', function (err, data) {
//     if (err) return console.error(err);
//     console.log(data.toString());
// });

// console.log("程序执行结束!");

//创建事件驱动程序
// 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
// var connectHandler = function connected() {
//    console.log('连接成功。');
  
//    // 触发 data_received 事件 
//    eventEmitter.emit('data_received');
// }

// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);
 
// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//    console.log('数据接收成功。');
// });

// // 触发 connection 事件 
// eventEmitter.emit('connection');

// console.log("程序执行完毕。");


//读取流
// var fs = require('fs')
// var data = ''

// var readerStream = new fs.createReadStream('input.txt');

// readerStream.setEncoding('UTF8')

// readerStream.on('data', function(chunk) {
// 	data += chunk
// })

// readerStream.on('end', function(){
// 	console.log(data)
// })

// readerStream.on('error', function(err) {
// 	console.log(err.stack)
// })

// console.log('程序执行完毕!')

//写入流
// var fs = require('fs')
// var writerStream = new fs.createWriteStream('output.txt')

// var data = '写入流'

// writerStream.write(data, 'UTF8')

// writerStream.end()

// writerStream.on('finish', function() {
// 	console.log('写入完成')
// })

// writerStream.on('error', function(err) {
// 	console.log(err.stack)
// })

// console.log('程序执行完毕')

// //管道流
// var fs = require('fs')

// var readerStream = new fs.createReadStream('input.txt')

// var writerStream = new fs.createWriteStream('output.txt')

// readerStream.pipe(writerStream)

// console.log('执行完毕')

//链式流完成文件压缩/解压
var fs = require('fs')
var zlib = require('zlib')

var readerStream = new fs.createReadStream('input.txt')

readerStream.pipe(zlib.createGzip())
            .pipe(fs.createWriteStream('input.txt.gz'))

console.log('文件压缩完成')
