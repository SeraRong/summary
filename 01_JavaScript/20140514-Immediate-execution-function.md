# 立即调用的函数表达式


在JavaScript里，**任何function在执行的时候都会创建一个执行上下文**，因为为function声明的变量和function有可能只在该function内部，这个上下文，在**调用function**的时候，提供了一种简单的方式来**创建自由变量或私有子function**。
```javascript
// 由于该function里返回了另外一个function，其中这个function可以访问自由变量i
// 所有说，这个内部的function实际上是有权限可以调用内部的对象。

function makeCounter() {
    // 只能在makeCounter内部访问i
    var i = 0;

    return function () {
        console.log(++i);
    };
}

// 注意，counter和counter2是不同的实例，分别有自己范围内的i。

var counter = makeCounter();
counter(); // logs: 1
counter(); // logs: 2

var counter2 = makeCounter();
counter2(); // logs: 1
counter2(); // logs: 2

alert(i); // 引用错误：i没有defind（因为i是存在于makeCounter内部）。
```
很多情况下，不需要makeCounter多个实例，甚至某些case下，也不需要显示的返回值。这时可以考虑自执行。
 
- **自执行方式**：

声明类似`function foo(){}`或`var foo = function(){}`函数的时候，通过在后面**加个括弧**就可以**实现自执行**。
```javascript
// 因为想下面第一个声明的function可以在后面加一个括弧()就可以自己执行了，比如foo()，
// 因为foo仅仅是function() { /* code */ }这个表达式的一个引用
 
var foo = function(){ /* code */ }
 
// ...是不是意味着后面加个括弧都可以自动执行？
 
function(){ /* code */ }(); // SyntaxError: Unexpected token (
//
```
上述代码，如果甚至运行，第2个代码会出错，因为在解析器解析全局的function或者function内部function关键字的时候，**默认是认为function声明，而不是function表达式**，如果你不显示告诉编译器，它**默认会声明成一个缺少名字的function**，并且抛出一个语法错误信息，因为function声明需要一个名字。

- **函数**(function)，**括弧**(paren)，**语法错误**(SyntaxError)

即便为上面那个错误的代码加上一个名字，他也会提示语法错误，只不过和上面的原因不一样。在一个表达式后面加上括号()，该表达式会立即执行，但是在一个语句后面加上括号()，是完全不一样的意思，他的只是分组操作符。
```javascript
// 下面这个function在语法上是没问题的，但是依然只是一个语句
// 加上括号()以后依然会报错，因为分组操作符需要包含表达式
 
function foo(){ /* code */ }(); // SyntaxError: Unexpected token )
 
// 但是如果你在括弧()里传入一个表达式，将不会有异常抛出
// 但是foo函数依然不会执行
function foo(){ /* code */ }( 1 );
 
// 因为它完全等价于下面这个代码，一个function声明后面，又声明了一个毫无关系的表达式： 
function foo(){ /* code */ }

( 1 );
```
