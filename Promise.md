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
    





