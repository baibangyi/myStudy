var express = require('express')
var app = express()

// app.get('/', function (req, res) {
// 	console.log("主页 GET 请求");
// 	res.send('hello GET')
// })

// app.post('/', function(req,res){
// 	console.log("主页 POST 请求");
// 	res.send('hello POST')
// })

// app.get('/del_user', function(req,res) {
// 	console.log("/del_user 响应 DELETE 请求");
// 	res.send('删除用户')
// })

// app.get('/list_user',function(req,res){
// 	console.log("/list_user GET 请求");
// 	res.send('用户列表页')
// })

// var server = app.listen(8081, function() {
// 	var host = server.address().address
// 	var port = server.address().port

// 	console.log("应用实例，访问地址为 http://%s:%s", host, port)
// })

app.use(express.static('public'))

app.get('/index.htm', function(req,res){
	res.sendFile(__dirname + '/' +'index.htm')
})

app.get('/process_get', function(req,res) {
	var response = {
		"first_name": req.query.first_name,
		"last_name": req.query.last_name
	}
	console.log(response);
	res.end(JSON.stringify(response))
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})