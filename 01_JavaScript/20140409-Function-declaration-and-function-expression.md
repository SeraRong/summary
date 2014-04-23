Javascript 函数声明 Vs 函数表达式
==================

javascript中有2种主要方式来定义一个函数，即：通过声明和通过表达式。

在很多应用中，他们略有不同。

###函数声明：
```javascript
var sys = require('sys');

function helloWorld() {
    sys.puts('Hello World!');
}

helloWorld();
```

###函数表达式：
```javascript
var sys = require('sys');

var helloWorld = function() {
    sys.puts('Hello World!');
}

helloWorld();
```

上面结果都是hello world，
区别在什么地方呢？

###区别：

- 1、函数申明会在代码执行之前被加载到作用域；函数表达式在代码执行到那一行时才会定义；也就是说函数声明所有代码被执行之前运行，函数表达式仅当解释器到达代码时候才运行。

- 2、函数申请会给函数指定一个名字；函数表达式则是创建一个匿名函数，然后将这个匿名函数赋给一个变量

**【注】**

函数是一个对象，函数名是一个指向对象的指针。

```javascript
//Declaration 函数申明
var sys = require('sys');

helloWorld();
 
function helloWorld() {
    sys.puts('Hello World!');
}


//Expression 函数表达式
var sys = require('sys');

helloWorld();

var helloWorld = function() {
    sys.puts('Hello World!');
}
```

表达式会报错：
```javascript
undefined is not a function.
```