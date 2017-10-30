# Promise

标签（空格分隔）： 笔记

---

[toc]
## 什么是Promise
Promise是一个构造函数，自己身上有all、reject、resolve这几个眼熟的方法，原型上有then、catch等同样很眼熟的方法

## Promise 的运用
用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数

    function runAsync(){
        var p = new Promise(function(resolve, reject){
            //做一些异步操作
            setTimeout(function(){
                console.log('执行完成');
                resolve('随便什么数据');
            }, 2000);
        });
        return p;            
    }
    runAsync()
    
## 链式操作的用法

    runAsync1()
    .then(function(data){
        console.log(data);
        return runAsync2();
    })
    .then(function(data){
        console.log(data);
        return runAsync3();
    })
    .then(function(data){
        console.log(data);
    });
    
运行结果

    异步执行1完成
    数据1
    异步执行2完成
    数据2
    异步执行3完成
    数据3

## reject的用法

    function getNumber(){
        var p = new Promise(function(resolve, reject){
            //做一些异步操作
            setTimeout(function(){
                var num = Math.ceil(Math.random()*10); //生成1-10的随机数
                if(num<=5){
                    resolve(num);
                }
                else{
                    reject('数字太大了');
                }
            }, 2000);
        });
        return p;            
    }
    
    getNumber()
    .then(
        function(data){
            console.log('resolved');
            console.log(data);
        }, 
        function(reason, data){
            console.log('rejected');
            console.log(reason);
        }
    );
    
## catch的用法

    getNumber()
    .then(function(data){
        console.log('resolved');
        console.log(data);
    })
    .catch(function(reason){
        console.log('rejected');
        console.log(reason);
    });

## all的用法
Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调

    Promise
    .all([runAsync1(), runAsync2(), runAsync3()])
    .then(function(results){
        console.log(results);
    });
    
运行结果

    异步执行1完成
    异步执行2完成
    异步执行3完成
    ["数据1","数据2","数据3"]

## race的用法
all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race方法

    Promise
    .race([runAsync1(), runAsync2(), runAsync3()])
    .then(function(results){
        console.log(results);
    });
    
运行结果

    异步执行1完成
    数据1
    异步执行2完成
    异步执行3完成


