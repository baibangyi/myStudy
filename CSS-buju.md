# 布局

标签（空格分隔）： CSS

---

[toc]
## 圣杯布局

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>圣杯布局</title>
    <style type="text/css">
        *{margin: 0;padding: 0;}
        body{min-width: 700px;}
        .header,
        .footer{ 
            border: 1px solid #333;
            background: #aaa;
            text-align: center;
        }
        .left,
        .middle,
        .right{ 
            position: relative;
            float: left;
            min-height: 130px;
        }
        .container{
            padding:0 220px 0 200px;
            overflow: hidden;
        }
        .left{
            margin-left: -100%;
            left: -200px;
            width: 200px;
            background: red;
        }
        .right{
            margin-left: -220px;
            right: -220px;
            width: 220px;
            background: green;
        }
        .middle{ 
            width: 100%;
            background: blue;
            word-break: break-all;
    
        }
        .footer{ 
            clear: both;
        }
    </style>
    </head>
    <body>
    <div class="header">
        <h4>header</h4>
    </div>
    <div class="container">
        <div class="middle">
            <h4>middle</h4>
            <p>HHHHHHHHHHHHHHHHHHHHHH
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            HHHHHHHHHHHHHHHHHHHHHH
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            </p>
        </div>
        <div class="left">
        <h4>left</h4>
            <p>oooooooooooooo
            0000000000000000
            00000000000000000
            ooooooooooooooo
            ooooooooooooooo
            000000000000000</p>
        </div>
        <div class="right">
        <h4>right</h4>
            <p>BBBBBBBBBBBBBB
            888888888888888888
            BBBBBBBBBBBBBBBBBB
            88888888888888888888</p>
        </div>
        </div>
        <div class="footer">
            <h4>footer</h4>
        </div>
    </body>
    </html>


## 双飞翼布局

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>双飞翼布局</title>
    <style type="text/css">
        *{margin: 0;padding: 0;}
        body{min-width: 700px;}
        .header,
        .footer{ 
            border: 1px solid #333;
            background: #aaa;
            text-align: center;
        }
        .sub,
        .main,
        .extra{ 
            float: left;
            min-height: 130px;
        }
        .sub{
            margin-left: -100%;
            width: 200px;
            background: red;
        }
        .extra{
            margin-left: -220px;
            width: 220px;
            background: blue;
        }
        .main{ 
            width: 100%;
        }
        .main-inner{ 
            margin-left: 200px;
            margin-right: 220px;
            min-height: 130px;
            background: green;
            word-break: break-all;
        }
        .footer{ 
            clear: both;
        }
    </style>
    </head>
    <body>
    <div class="header">
        <h4>header</h4>
    </div>
        <div class="main">
        <div class="main-inner">
            <h4>main</h4>
            <p>HHHHHHHHHHHHHHHHHHHHHH
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            HHHHHHHHHHHHHHHHHHHHHH
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            </p>
            </div>
        </div> 
        <div class="sub">
        <h4>sub</h4>
            <p>oooooooooooooo
            00000000000000000
            ooooooooooooooo
            ooooooooooooooo
            000000000000000</p>
        </div>
    
          <div class="extra">
        <h4>extra</h4>
            <p>BBBBBBBBBBBBBB
            BBBBBBBBBBBBBBBBBB
            88888888888888888888</p>
        </div>
        <div class="footer">
            <h4>footer</h4>
        </div>
    </body>
    </html>
    
## 圣杯布局 & 双飞翼布局 的对比
### **共同点**

 - 都是三栏布局
 - 都是两边定宽（eg:200px) 中间自适应（width:100%）
 - 中间的div要放在最前面

### **差异性**

 - 圣杯布局：最外层包围一个contain容器，包含middle，left，right三个div，设置contain的padding，来实现布局
 - 双飞翼布局：不需要外围包裹，而是在main这个div中加一个内置的main-inner容器，设置这个内置容器的margin来实现布局

## 单列布局
**水平居中**

 - **使用inline-block 和 text-align实现**

> .parent{text-align: center;}
.child{display: inline-block;}

 - **使用margin:0 auto来实现**

> .child{width: 200px; margin: 0 auto;}

 - **使用table实现**

> child{display: table; margin: 0 auto;}

 - **使用绝对定位实现**

> .parent{position:relative;}
> /*或者实用margin-left的负值为盒子宽度的一半也可以实现，不过这样就必须知道盒子的宽度，但兼容性好*/
> .child{position:absolute; left:50%; transform:translate(-50%);}

 - **实用flex布局实现**

> /*第一种方法*/ 
.parent{display:flex; justify-content:center;} 
/*第二种方法*/
> .parent{display:flex;} .child{margin:0 auto;}

**垂直居中**

 - **vertical-align**

> 只有一个元素属于inline或是inline-block（table-cell也可以理解为inline-block水平）水平，其身上的vertical-align属性才会起作用。在使用vertical-align的时候，由于对齐的基线是用行高的基线作为标记，故需要设置line-height或设置display:table-cell;
> /*第一种方法*/
> .parent{display:table-cell;vertical-align:middle;height:20px;}
> /*第二种方法*/
> .parent{display:inline-block;vertical-align:middle;line-height:20px;}

 - **实用绝对定位**

> .parent{position:relative;}
.child{positon:absolute; top:50%; transform:translate(0,-50%);}

**水平垂直全部居中**

 - **利用vertical-align,text-align,inline-block实现**

> .parent{display:table-cell; vertical-align:middle; text-align:center;}
> .child{display:inline-block;}

 - **利用绝对定位实现**

> .parent{position:relative;}
> .child{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}

 - **利用flex实现**

> .parent{display:flex;justify-content:center;align-items:center;}

## 多列布局
### **左列定宽，右列自适应**
该布局方式非常常见，适用于定宽的一侧常为导航，自适应的一侧为内容的布局

 - **利用float+margin实现**

> .left{float:left;width:100px;} 
.right{margin-left:100px;}

 - **利用float+margin(fix)实现**

>     <div class="parent">
>         <div class="left"></div>
>         <div class="right-fix">
>             <div class="right"></div>
>         </div>
>     </div>
> 
>     .left{width:100px;float:left;}
>     .right-fix{width:100%;margin-left:-100px;float:right;}
>     .right{margin-left:100px;}

 
 
 
 
 
 
 
 
 
 
 
 
 
 
