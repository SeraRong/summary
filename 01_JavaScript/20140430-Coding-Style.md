
JavaScript 编码风格
=========

###1、最小全局变量(Minimizing Globals)

**JavaScript通过函数管理作用域**。在函数内部声明的变量只在这个函数内部，函数外面不可用。

**全局变量**就是在任何**函数外面声明**的或是**未声明直接简单使用**的。

每个JavaScript环境有一个全局对象，当你在任意的函数外面使用this的时候可以访问到。你创建的每一个全部变量都成了这个全局对象的属性。在浏览器中，方便起见，该全局对象有个附加属性叫做window，此window(通常)指向该全局对象本身。下面的代码片段显示了如何在浏览器环境中创建和访问的全局变量：
```javacript
myglobal = "hello"; // 不推荐写法
console.log(myglobal); // "hello"
console.log(window.myglobal); // "hello"
console.log(window["myglobal"]); // "hello"
console.log(this.myglobal); // "hello"
``` 

###2、全局变量的问题

**全局变量的问题**在于，JavaScript应用程序和web页面上的**所有代码**都**共享**了这些**全局变量**，他们住在**同一个全局命名空间**，所以当程序的**两个不同部分定义同名但不同作用的全局变量**的时候，**命名冲突**在所难免。

web页面包含不是该页面开发者所写的代码也是比较常见的，例如：
- 第三方的JavaScript库
- 广告方的脚本代码
- 第三方用户跟踪和分析脚本代码
- 不同类型的小组件，标志和按钮

因此，要想和其他脚本成为好邻居的话，**尽可能少的使用全局变量**是很重要的。

**减少全局变量的策略**：
- *命名空间模式或是函数立即自动执行。*
- *始终使用var来声明变量。*

由于JavaScript的两个特征，不自觉地创建出全局变量是出乎意料的容易。
- 不需要声明就可以使用变量。
- JavaScript有隐含的全局概念，意味着你不声明的任何变量都会成为一个全局对象属性。

```javacript
function sum(x, y) {
   // 不推荐写法: 隐式全局变量 
   result = x + y;
   return result;
}
```
```javacript
function sum(x, y) {
   // 推荐写法：使用var声明变量
   var result = x + y;
   return result;
}
```
```javacript
// 反例，勿使用 
function foo() {
   var a = b = 0;
   // ...
}
```
```javacript
// 推荐使用
function foo() {
   var a, b;
   // ... a = b = 0; // 两个均局部变量
}
``` 

另外一个避免全局变量的原因是可移植性。如果你想你的代码在不同的环境下（主机下）运行，使用全局变量如履薄冰，因为你会无意中覆盖你最初环境下不存在的主机对象（所以你原以为名称可以放心大胆地使用，实际上对于有些情况并不适用）。

###3、忘记var的副作用(Side Effects When Forgetting var)

**隐式全局变量**和**明确定义的全局变量**间有些小的差异，就是通过delete操作符让变量未定义的能力。
- 通过**var创建的全局变量**（任何函数之外的程序中创建）是**不能被删除**的。
- **无var创建的隐式全局变量**（无视是否在函数中创建）是**能被删除**的。

这表明，在技术上，**隐式全局变量**并**不是真正的全局变量**，但它们**是全局对象的属性**。属性是可以通过delete操作符删除的，而变量是不能的：
```javacript
// 定义三个全局变量
var global_var = 1;
global_novar = 2; // 反面教材
(function () {
   global_fromfunc = 3; // 反面教材
}());

// 试图删除
delete global_var; // false
delete global_novar; // true
delete global_fromfunc; // true

// 测试该删除
typeof global_var; // "number"
typeof global_novar; // "undefined"
typeof global_fromfunc; // "undefined"
```
**【注】**
在ES5严格模式下，未声明的变量工作时会抛出一个错误。

###4、访问全局对象(Access to the Global Object)

- 在**浏览器**中，**全局对象**可以通过**window属性**在代码的任何位置访问。
- 在**其他环境**下，这个方便的属性可能被叫做其他什么东西（甚至在程序中不可用）。

如果你需要在没有硬编码的window标识符下访问全局对象，你可以在任何层级的函数作用域中做如下操作：
```javacript
var global = (function () {
   return this;
}());
``` 
这种方法可以随时获得全局对象，因为其在函数中被当做函数调用了（不是通过new构造），this总是指向全局对象。

实际上这个并不适用于ECMAScript5严格模式，所以，在严格模式下时，你必须采取不同的形式。

例如，你正在开发一个JavaScript库，你可以将你的代码包裹在一个即时函数中，然后从全局作用域中，传递一个引用指向this作为你即时函数的参数。

###5、单var形式（Single var Pattern）

在**函数顶部**使用**单var**语句是比较有用的一种形式，其**好处**在于：
- *提供了一个单一的地方去寻找功能所需要的所有局部变量。*
- *防止变量在定义之前使用的逻辑错误。*
- *帮助你记住声明的全局变量，因此较少了全局变量。*
- *少代码（类型啊传值啊单线完成）。*

单var形式长得就像下面这个样子：
```javacript
function func() {
   var a = 1,
       b = 2,
       sum = a + b,
       myobject = {},
       i,
       j;
   // function body...
}
``` 
使用一个var语句声明多个变量，并以逗号分隔。这样子可以**防止逻辑错误**（所有未初始化但声明的变量的初始值是undefined）和**增加代码的可读性**。在你看到代码后，你可以根据初始化的值知道这些变量大致的用途，例如是要当作对象呢还是当作整数来使。

可以在声明的时候做一些实际的工作，例如前面代码中的sum = a + b这个情况，另外一个例子就是当你使用DOM（文档对象模型）引用时，你可以使用单一的var把DOM引用一起指定为局部变量，就如下面代码所示的：
```javacript
function updateElement() {
   var el = document.getElementById("result"),
       style = el.style;
   // 使用el和style干点其他什么事...
}
``` 
