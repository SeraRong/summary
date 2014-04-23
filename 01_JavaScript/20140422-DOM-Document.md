JavaScript DOM —— Document类型
=========

Javascript通过Document类型表示文档。

在浏览器中，document对象是HTMLDocument（继承自Document）的一个实例，来表示整个HTML页面，而且document对象是window对象的是个属性，可以将其作为全局对象来访。

**Document节点**有下列**特征**：
- *nodeType的值为9*
- *nodeName的值为“#document”*
- *nodeValue的值为null*
- *parentNode的值为null*
- *ownerDocument的值为null*
- *子节点可能是一个DocumentType（最多一个）、Element（最多一个）、ProcessingInstruction或Comment*

###1、子节点属性
- **documentElement属性**。始终指向HTML页面的<html>元素

```javascript
// 这三种方式获取到的元素相同  
var html = document.documentElement;    // 取得<html>元素的引用 
alert(html == document.childNodes[0]);  // true
alert(html == document.firstChild);     // true
```
- **body属性**。直接指向<body>元素。

- **doctype属性**。通常将<!DOCTYPE>标签看成一个与文档其他部分不同的实体，可以通过doctype属性类访问。

**【注】**
- *所有浏览器都支持documentElement和body属性*。
- *浏览器对document.doctype属性的支持不一致，这个属性的用处很有限*。

###2、文档信息属性
- **title属性**。获取和设置文档title。

```javascript
//取得文档标题  
var title = document.title;  
//设置文档标题  
document.title = "new page";  
```
- **URL**、**domain**、**referrer属性**。

    - **URL属性**中包含页面完整的URL（浏览器地址栏中显示的URL）。
    - **domain属性**包含页面的域名。
    - **referrer属性**保存着链接到当前页面的源URL。

在没有来源的情况下，referrer属性可能会包含空字符串。所有这些信息都存在于请求的HTTP头部，只不过是通过这些属性让我们能够在Javascript中访问它们而已。

```javascript
// 取得完整的URL  
var url = document.URL;  
// 取得域名  
var domain = document.domain;  
// 取得当前页面的源URL  
var src = document.referrer;  
```
这三个属性只有domain可以设置，但有限制。新的domain应该比旧domain范围大，而且不能反过来设置；新domain和旧domain相关。
```javascript
// 假设页面来自bbs.baidu.com  
// 这样设置可以  
document.domain = "baidu.com";  
// 这样设置不可以  
document.domain = "sina.com.cn";  
// 设置为baidu.com之后无法再设置回去  
document.domain = "bbs.baidu.com";  
```

###3、操作方法

- **getElementById()**方法

参数：要取得的元素id。找到相应的元素则返回该元素，否则返回null。如果页面中有多个元素的id相同，该方法只返回文档中第一次出现的元素。
```html
<div id="myDiv">Some text</div> 
```  
```javascript
// 取得<div>元素的引用() 
var div = document.getElementById("myDiv"); 
  
// 错误示范(不区分大小写，但在IE7及以前可用) 
var div = document.getElementById("mydiv"); 
```
```html
<!-- 特殊的IE7及以前版本 -->
<input type="text" name="MyElement" value="text"/> 
<div id="MyElement">div</div> 
<!-- 在使用document.getElementById("MyElement"),IE7及以前版本会取得对input元素的引用，而不是对div元素的引用 -->
```

- **getElementByTagName()**方法

参数：要取得的元素标签名。返回包含零或者多个元素的NodeList。在HTML文档中，返回一个HTMLCollection对象，作为一个动态集合，类似NodeList。
```javascript
// 获取标签元素集合  
var  images = document.getElementByTagName("img");  
// 获取所有元素  
var all = document.getElementByTagName("*");  
// 访问HTMLCollection对象中的元素  
alert(iamges.length);  
alert(iamges.item(1).src);  
alert(iamges[0].src);  
// 通过名称访问集合中指定的元素  
alert(iamges.namedItem("myimage").src);  
// 或者通过下面方式访问指定名称的元素  
alert(images["myimage"].src);  
```

- **getElementByName()**方法

类似getElementByTagName()方法，返回一个HTMLCollection对象。

- **createElement()**方法

使用document.createElement()方法可以创建新元素。参数：要创建元素的标签名。
```javascript
// 创建元素  
var div = document.createElement("div");  
// 添加属性  
div.id = "mydiv";  
div.className = "style";  
// 添加到文档合适位置  
document.body.appendChild(div);  
```

- **write()**方法

文档写入。参数：要写入到输出流的文本字符串。
```javascript
// 写入文本内容  
document.write(new Date());  
```
此外，还可以使用write()方法动态的包含外部资源，例如Javascript文件等。在包含Javascript文件时，必须注意不能直接包含字符串<script>，这样会导致该字符串被解释为脚本块的结束，后面的代码将无法执行。
```javascript
// 动态加载脚本，但是直接写</script>是错误的，需要用到转义<\/script>  
document.write("<script type=\"text/javascript\" src=\"file.js\">"+"</script>");  ```
如果在文档加载结束后再调用document.write()方法，那么输出的内容将会重写整个页面。
