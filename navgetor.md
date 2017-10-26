# 浏览器兼容

标签（空格分隔）： 笔记

---

[toc]
## CSS

 - **浏览器兼容问题一：不同浏览器的标签默认的外补丁和内补丁不同**

> 问题症状：随便写几个标签，不加样式控制的情况下，各自的margin 和padding差异较大。
碰到频率:100%
解决方案：CSS里    *{margin:0;padding:0;}
备注：这个是最常见的也是最易解决的一个浏览器兼容性问题，几乎所有的CSS文件开头都会用通配符*来设置各个标签的内外补丁是0。

 - **浏览器兼容问题二：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大**

> 问题症状:常见症状是IE6中后面的一块被顶到下一行
碰到频率：90%（稍微复杂点的页面都会碰到，float布局最常见的浏览器兼容问题）
解决方案：在float的标签样式控制中加入 display:inline;将其转化为行内属性
备注：我们最常用的就是div+CSS布局了，而div就是一个典型的块属性标签，横向布局的时候我们通常都是用div float实现的，横向的间距设置如果用margin实现，这就是一个必然会碰到的兼容性问题。

 - **浏览器兼容问题三：设置较小高度标签（一般小于10px），在IE6，IE7，遨游中高度超出自己设置高度**

> 问题症状：IE6、7和遨游里这个标签的高度不受控制，超出自己设置的高度
碰到频率：60%
解决方案：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。
备注：这种情况一般出现在我们设置小圆角背景的标签里。出现这个问题的原因是IE8之前的浏览器都会给标签一个最小默认的行高的高度。即使你的标签是空的，这个标签的高度还是会达到默认的行高。

 - **浏览器兼容问题四：行内属性标签，设置display:block后采用float布局，又有横行的margin的情况，IE6间距bug**

> 问题症状：IE6里的间距比超过设置的间距
碰到几率：20%
解决方案：在display:block;后面加入display:inline;display:table;
备注：行内属性标签，为了设置宽高，我们需要设置display:block;(除了input标签比较特殊)。在用float布局并有横向的margin后，在IE6下，他就具有了块属性float后的横向margin的bug。不过因为它本身就是行内属性标签，所以我们再加上display:inline的话，它的高宽就不可设了。这时候我们还需要在display:inline后面加入display:talbe。

 - **浏览器兼容问题五：图片默认有间距**

> 问题症状：几个img标签放在一起的时候，有些浏览器会有默认的间距，加了问题一中提到的通配符也不起作用。
碰到几率：20%
解决方案：使用float属性为img布局
备注：因为img标签是行内属性标签，所以只要不超出容器宽度，img标签都会排在一行里，但是部分浏览器的img标签之间会有个间距。去掉这个间距使用float是正道。（我的一个学生使用负margin，虽然能解决，但负margin本身就是容易引起浏览器兼容问题的用法，所以我禁止他们使用）

 - **浏览器兼容问题六：标签最低高度设置min-height不兼容**

> 问题症状：因为min-height本身就是一个不兼容的CSS属性，所以设置min-height时不能很好的被各个浏览器兼容
碰到几率：5%
解决方案：如果我们要设置一个标签的最小高度200px，需要进行的设置为：{min-height:200px; height:auto !important; height:200px; overflow:visible;}
备注：在B/S系统前端开时，有很多情况下我们又这种需求。当内容小于一个值（如300px）时。容器的高度为300px；当内容高度大于这个值时，容器高度被撑高，而不是出现滚动条。这时候我们就会面临这个兼容性问题。

 - **浏览器兼容问题七：透明度的兼容CSS设置**

> 用hack来解决。不过hacker还是非常好用的。使用hacker我可以把浏览器分为3类：IE6 ；IE7和遨游；其他（IE8 chrome ff safari opera等）
◆IE6认识的hacker 是下划线_ 和星号 *
◆IE7 遨游认识的hacker是星号 *
比如这样一个CSS设置：
height:300px;*height:200px;_height:100px; 
IE6浏览器在读到height:300px的时候会认为高时300px；继续往下读，他也认识*heihgt， 所以当IE6读到*height:200px的时候会覆盖掉前一条的相冲突设置，认为高度是200px。继续往下读，IE6还认识_height,所以他又会覆盖掉200px高的设置，把高度设置为100px；
IE7和遨游也是一样的从高度300px的设置往下读。当它们读到*height200px的时候就停下了，因为它们不认识_height。所以它们会把高度解析为200px，剩下的浏览器只认识第一个height:300px;所以他们会把高度解析为300px。因为优先级相同且想冲突的属性设置后一个会覆盖掉前一个，所以书写的次序是很重要的。

## JavaScript

 - **HTML对象获取问题**

> FireFox：document.getElementById(“idName”);
ie:document.idname或者document.getElementById(“idName”).
解决办法：统一使用document.getElementById(“idName”);

 - **const问题**

> 说明:Firefox下,可以使用const关键字或var关键字来定义常量;
IE下,只能使用var关键字来定义常量.
解决方法：统一使用var关键字来定义常量.

 - **event.x与event.y问题**

> 说明:IE下,event对象有x,y属性,但是没有pageX,pageY属性;
Firefox下,event对象有pageX,pageY属性,但是没有x,y属性.
解决方法：使用mX(mX   =   event.x   ?   event.x   :   event.pageX;)来代替IE下的event.x或者Firefox下的event.pageX.

 - **window.location.href问题**

> 说明:IE或者Firefox2.0.x下,可以使用window.location或window.location.href;
Firefox1.5.x下,只能使用window.location.
解决方法：使用window.location来代替window.location.href.
ps:window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面

 - **frame问题**

> 以下面的frame为例：
> 
> 
>     <frame  src=”xxx.html”  id=”frameId”  name=”frameName”  />
> 
> (1)访问frame对象：
> IE:使用window.frameId或者window.frameName来访问这个frame对象.frameId和frameName可以同名。
> Firefox:只能使用window.frameName来访问这个frame对象. 
> 另外，在IE和Firefox中都可以使用window.document.getElementById(“frameId”)来访问这个frame对象.
> (2)切换frame内容: 在
> IE和Firefox中都可以使用window.document.getElementById(“testFrame”).src   =  
> “xxx.html”或window.frameName.location   =   “xxx.html”来切换frame的内容.
> 如果需要将frame中的参数传回父窗口(注意不是opener,而是parent  
> frame)，可以在frame中使用parent来访问父窗口。例如：parent.document.form1.filename.value=”Aqing”;

 - **firefox与IE的父元素(parentElement)的区别**

> IE：obj.parentElement
firefox：obj.parentNode
解决方法:   因为firefox与IE都支持DOM,因此使用obj.parentNode是不错选择.

 - **集合类对象问题**

> 问题说明：IE下，可以使用 () 或 [] 获取集合类对象；Firefox下，只能使用 [ ]获取集合类对象。
解决方法：统一使用 [] 获取集合类对象。

 - **input.type属性问题**

> 问题说明：IE下input.type属性为只读；但是Firefox下input.type属性为读写。
解决办法：不修改input.type属性。如果必须要修改，可以先隐藏原来的input，然后在同样的位置再插入一个新的input元素。

 - **列表项**

