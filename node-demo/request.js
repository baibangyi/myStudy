// var http = require('http')
// var url = require('url')
// var util = require('util')

// http.createServer(function(req, res) {
// 	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
// 	res.end(util.inspect(url.parse(req.url,true)))
// }).listen(3000)

// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain'});
 
//     // 解析 url 参数
//     var params = url.parse(req.url, true).query;
//     res.write("网站名：" + params.name);
//     res.write("\n");
//     res.write("网站 URL：" + params.url);
//     res.end();
 
// }).listen(3000);

// console.log('执行完毕')

// var http = require('http')
// var querystring = require('querystring')
// var util = require('util')

// http.createServer(function(req,res) {
// 	var post = ''

// 	req.on('data', function(chunk) {
// 		data += chunk
// 	})

// 	req.on('end', function() {
// 		post = querystring.parse(post)
// 		res.end(util.inspect(post))
// 	})
// }).listen(3000)

// console.log('获取http参数成功')


var http = require('http');
var querystring = require('querystring');

var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

  http.createServer(function(req, res) {
  	var body = ''

  	req.on('data', function(chunk) {
		body += chunk
	})

	req.on('end', function() {
		body = querystring.parse(body)
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

		if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(3000);