# json

标签（空格分隔）： 面试笔记

---

[toc]
## 什么是JSON
是一种数据格式，也是一个内置对象

## 语法
简单值，与JS表示一样，可表示字符串，数值。布尔值和null，但不可以表示unsefined
"ashd"（字符串必须使用双引号）
对象， 要求给属性加""，没有var 声明，没有末尾的分号

    {
       "name": "asd",
       "age":20
    }

## 数组

    [
      {
           "name": "asd",
           "age":20，
           "hobby":[
                      "sadj"
                   ]
        },
        {
           "name": "jiji",
           "age":20，
           "hobby":[
                      "zxc"
                   ]
        }
    ]

## stringigy() 
把JS对象转换为JSON对象
还可以接受两个参数，一个过滤器参数，一个保留缩进的参数，其中过滤器参数可以是一个数组，也可以是一个函数

    var book = {
    	"title": "ahsdj",
    	"authors": [
    		"hsfd"
    	],
    	edition: 3,
    	year: 2011
    
    };
    //可以是一个函数，也可以是类似["title","authors"]的数组
    var jsonText = JSON.stringify(book, function(key,value){
    	switch(key){
    		case "authors":
    		return value.join(",")
    		...
    	}
    })

## parse()
将JSON对象转换为JS对象，也接收一个参数，是一个过滤函数

    var book = {
        	"title": "ahsdj",
        	"authors": [
        		"hsfd"
        	],
        	edition: 3,
        	year: 2011
        
        };
        //可以是一个函数，也可以是类似["title","authors"]的数组
        var jsonText = JSON.stringify(book)；
        var bookcopy = JSON.parse(jsonText,function(key,value){
            if(key === "releaseDate"){
            return  ....
            } else {
            ...
            }
        })

