
基本类型VS引用类型
=========

ECMAScript变量包含两种数据类型的值：**基本类型值**和**引用类型值**。

- **基本类型值**指保存在**栈内存**中的简单数据段；

- **引用类型值**指保存在**堆内存**中的对象，变量中保存的是一个指向堆内存中对象的指针。

**5种基本数据类型：undefined、null、boolean、number、string。**

###基本类型与引用类型区别：

####1、分配内存位置不同

- 这5种基本数据类型的值在内存中分别占固定大小空间，保存在栈内存中。

- 引用数据类型的值大小不固定，不能保存在栈内存中，在堆内存中为其分配空间，将堆内存地址保存在栈内存中。

####2、动态添加或删除属性

可为引用类型值动态添加或删除属性，不能给基本类型值添加或删除属性（添加不会报错，只是属性无效）。

####3、复制变量值

- 基本类型值复制，是在栈中创建一个新地址，把复制的值放在新分配的位置上。改变一个变量的值对另一变量没有影响。

- 引用类型值复制，是在栈中创建一个新地址，把复制的值放在新分配的位置上，只是复制的值是一个地址，两个变量实际上引用同一对象。改变其中一个变量，会影响另一变量。

####4、传递参数

ECMAScript中**所有函数的参数**都是**按值传递**的。

访问变量有按值和按引用两种方式。

参照复制变量值，基本类型值传递的是复制得到的值，而引用类型值传递的是指向堆内存对象的指针。

####5、类型检测

`typeof`可确定一个变量是字符串string、数值number、布尔值boolean，还是undefined，但是变量的值是一个对象或null，则返回“object”。
```javascript
var s = "aaaaaaaaa";
var b = true;
var i = 22;
var u;
var n = null;
var o = new Object();
var f = new function() {};

alert(typeof s); //string
alert(typeof b); //boolean
alert(typeof i); //number
alert(typeof u); //undefined
alert(typeof n); //object
alert(typeof o); //object
alert(typeof f); //function
```

`instanceof`检测具体是哪种引用类型。
```javascript
alert(person instanceof Object); //变量person是Object吗？
alert(colors instanceof Array); //变量colors是Array吗？
alert(pattern instanceof RegExp); //变量pattern是RegExp吗？
```
