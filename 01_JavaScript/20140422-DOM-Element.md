JavaScript DOM —— Element类型
=========

除了Document类型之外，Element类型就要算是Web编程中最常用的类型了。Element类型用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问。

**Element节点**具有以下**特征**：
- *nodeType的值为1*
- *nodeName的值为元素的标签名*
- *nodeValue的值为null*
- *parentNode可能是Document或Element*
- *其子节点可能是Element、Text、Comment、ProcessingInstruction、CDATASection或EntityReference*

###1、基本属性
- **nodeName**
- **tagName**

要**访问元素的标签名**，可以使用**nodeName属性**，也可以使用**tagName属性**；这两个属性会返回相同的值（使用后者主要是为了清晰起见）。
```html
<div id="mydiv"></div>  
```
```javascript
// 两种方式获取标签的名称  
var div = document.getElementById("mydiv");  
alert(div.nodeName);  
alert(div.tagName);  
```
**【注】** div.tagName输出的是大写的DIV，检测这个名称的时候需要注意大小写转换。
```javascript
// 错误的名称检测方法  
if (element.tagName == "div") {}  

// 正确的名称检测方法  
if (element.tagName.toLowerCase() == "div") {}  
```
**【注】** *可以在任何浏览器中通过脚本访问Element类型的构造函数及原型，包括IE8及更高版本。*

###2、HTML属性
- **id**：元素在文档中的唯一标示符。
- **title**：有关元素的附加说明。
- **lang**：元素内容的语言代码，很少使用。
- **dir**：语言的方向，值为”ltr“（从左到右）、”rtl“（从右到左），很少使用。
- **className**：与元素的class属性对应。class为javascript的保留字。

```html
<div id="mydiv" class="bd" title="text" lang="en" dir="ltr"></div>  
```
```javascript
// 获取元素的各个属性值  
var div = document.getElementById("mydiv");  

alert(div.id);          // "mydiv"
alert(div.title);       // "text"
alert(div.lang);        // "en"
alert(div.dir);         // "ltr"
alert(div.className);   // "bd"

// 可以设置属性值  
div.id = "other";  
div.title = "other";  
div.lang = "cn";  
div.dir = "rtl";  
div.className = "hi";  
```

###3、操作方法
操作特性的DOM方法主要有三个：
- **getAttribute()**：传递的参数和实际属性名称相同，class不是className。
- **setAttribute()**：属性存在则替换现有值，不存在则创建该属性并设置相应的值。
- **removeAttribute()**：清除属性的值，并且从元素中完全删除该属性。

####1）getAttribute()方法
```html
<div id="mydiv" class="bd" title="text" lang="en" dir="ltr" hello="hello"></div>
```
```javascript
var div = document.getElementById("mydiv");
alert(div.getAttribute("id"));      // "mydiv"
alert(div.getAttribute("title"));   // "text"
alert(div.getAttribute("lang"));    // "en"
alert(div.getAttribute("dir"));     // "ltr"
alert(div.getAttribute("class"));   // "bd"
alert(div.getAttribute("hello"));   // "hello"

alert(div.className); // "bd"
alert(div.hello);     // undefined (IE除外)
```
**【注】**
*自定义特性在Safari、Opera、Chrome、Firefox中是不存在的，在IE中会为自定义特性创建属性。*

有两类特殊的特性，有对应的属性名，但属性的值和通过getAttribute()返回的值不相同。
- **1）style：用于通过CSS为元素指定样式**。
    - *通过getAttribute()访问时，返回的style特性值中包含的是CSS文本。*
    - *通过属性来访问时，返回一个对象。*
    - style属性是用于以编程方式访问元素样式的，没有直接映射到style特性。
- **2）事件处理程序**，如onclick。
    - *通过getAttribute()访问，返回JavaScript代码的字符串。*
    - *通过onclick属性访问，返回的是一个JavaScript函数（如果未在元素中指定相应特性，则返回null）。*
    - onclick及其他事件属性本身应该被赋予函数值。

####2）setAttribute()
```javascript
alert(div.setAttribute("id", "otherDiv"));  
alert(div.setAttribute("title", "otherText")); 
alert(div.setAttribute("lang", "cn"));   
alert(div.setAttribute("dir", "rtl"));    
alert(div.setAttribute("class", "ft"));   
alert(div.setAttribute("hello", "hello world"));   

div.id = "otherDiv";  
div.title = "otherText";  
div.lang = "cn";  
div.dir = "rtl";  
div.className = "ft";  
div.hello = "hello world";

// 大多数浏览器中，自定义属性不会自动变成元素的特性（IE除外）
alert(div.setAttribute("hello")); // null
```
**【注】**
由于浏览器之间的差异，在通过JavaScript以编程方式操作DOM时，开发人员经常不使用getAttribute()，而是只使用对象的属性。只有在取得自定义特性值的情况下，才会使用getAttribute()方法。

###4、attributes属性
**Element类型是使用attributes属性的唯一一个DOM节点类型**。attributes包含一个NamedNodeMap属性，和NodeList类似是一个动态集合，表示元素所有特性的集合，它以标签的一个属性为单元来操作。主要用于遍历元素（标签）的所有属性。在需要将DOM结构序列化为XML或HTML字符串时，通常会遍历元素特性。

- **getNamedItem(name)**：返回nodeName属性等于name的节点。
- **removeNamedItem(name)**：从列表中删除nodeName属性等于name的节点。
- **setNamedItem(node)**：添加节点。
- **item(pos)**：返回位于数字pos位置处的节点。

```javascript
// 获取元素的属性值
var id = element.attributes.getNamedItem("id").nodeValue;
var id = element.attributes["id"].nodeValue;

// 设置属性值
element.attributes["id"].nodeValue = "otherId";

// 删除属性
var oldAttr = element.attributes.removeNamedItem("id");

// 添加新属性
element.attributes.setNamedItem(newAttr);
```
```javascript
function iterator(element) {  
    var pairs = new Array(),  
        attrName,attrValue,i,len;  
    for (var i = 0, len = element.attributes.length; i < len ;i++) {  
        attrName = element.attributes[i].nodeName;  
        attrValue = element.attributes[i].nodeValue;  
        if (element.attributes[i].specified) {
            pairs.push(attrName + "=\""+attrValue + "\"");  
        }
    }  
    return pairs.join(" ");  
}  
```

###5、创建元素
使用**document.createElement()**方法可以**创建新元素**。只接受一个参数，即要创建元素的标签名。标签名在html中不区分大小写，在xml中区分大小写。
```javascript
// 适用于所有浏览器
var div = document.createElement("div");
div.id = "myDiv";
div.className = "box";

// 只适用于IE
var div = document.createElement("<div id=\"myDiv\" class=\"box\"></div>");

// 把新元素添加到文档树
document.body.appendChild(div);
```
- **appendChild()**
- **insertBefore()**
- **replaceChild()**

