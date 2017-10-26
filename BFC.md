# BFC

标签（空格分隔）： 布局

---

[toc]
## 流体特性
就像放在容器中的水流一样，内容区域会随着margin, padding, border的出现自动填满剩余空间，这就是块状元素的流体特性

## BFC元素特性表现原则
内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素。所以，避免margin穿透啊，清除浮动什么的也好理解了。

## 触发BFC

 - float的值不为none
 - overflow的值为auto,scroll或hidden
 - isplay的值为table-cell, table-caption, inline-block中的任何一个
 - position的值不为relative和static

## BFC自适应布局模块间的间距
可以使用浮动元素的margin-right或者padding-right轻松实现间距效果

## 与纯流体特性布局的优势

 - 自适应内容由于封闭，更健壮，容错性强。比方说，内部clear:both不会与兄弟float产生矛盾。而纯流体布局，clear:both会让后面内容无法和float元素在一个水平上，产生布局问题。
 - 自适应内容自动填满浮动以为区域，无需关心浮动元素宽度，可以整站大规模应用。而纯流体布局，需要大小不确定的margin/padding等值撑开合适间距，无法CSS组件化。

**对BFC声明家族大致过了一遍，能担任自适应布局重任的也就是**：

 - overflow:auto/hidden IE7+
 - display:inline-block IE6/IE7
 - display:table-cell IE8+

 
 
