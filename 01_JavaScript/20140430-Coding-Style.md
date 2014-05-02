
JavaScript 编码风格
=========

###1、最小全局变量(Minimizing Globals)

**JavaScript通过函数管理作用域**。在函数内部声明的变量只在这个函数内部，函数外面不可用。

**全局变量**就是在任何**函数外面声明**的或是**未声明直接简单使用**的。

每个JavaScript环境有一个全局对象，当你在任意的函数外面使用this的时候可以访问到。你创建的每一个全部变量都成了这个全局对象的属性。在浏览器中，方便起见，该全局对象有个附加属性叫做window，此window(通常)指向该全局对象本身。下面的代码片段显示了如何在浏览器环境中创建和访问的全局变量：
```javascript
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

```javascript
function sum(x, y) {
   // 不推荐写法: 隐式全局变量 
   result = x + y;
   return result;
}
```
```javascript
function sum(x, y) {
   // 推荐写法：使用var声明变量
   var result = x + y;
   return result;
}
```
```javascript
// 反例，勿使用 
function foo() {
   var a = b = 0;
   // ...
}
```
```javascript
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
```javascript
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
```javascript
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
```javascript
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
```javascript
function updateElement() {
   var el = document.getElementById("result"),
       style = el.style;
   // 使用el和style干点其他什么事...
}
``` 

###6、预解析：var散布的问题(Hoisting: A Problem with Scattered vars)

JavaScript中，你可以在函数的任何位置声明多个var语句，并且它们就好像是在函数顶部声明一样发挥作用，这种行为称为 **hoisting（悬置/置顶解析/预解析）**。

当你使用了一个变量，然后不久在函数中又重新声明的话，就可能产生逻辑错误。对于JavaScript，只要你的变量是在同一个作用域中（同一函数），它都被当做是声明的，即使是它在var声明前使用的时候。
```javascript
// 反例
myname = "global"; // 全局变量
function func() {
    alert(myname); // "undefined"
    var myname = "local";
    alert(myname); // "local"
}
func();
```

在这个例子中，myname被当做了函数的局部变量（尽管是之后声明的），所有的变量声明当被悬置到函数的顶部了。因此，为了避免这种混乱，最好是预先声明你想使用的全部变量。

上面的代码片段执行的行为可能就像下面这样：
```javascript
myname = "global"; // global variable
function func() {
   var myname; // 等同于 -> var myname = undefined;
   alert(myname); // "undefined"
   myname = "local";
   alert(myname); // "local"}
func();
``` 

**代码处理**分**两个阶段**：
- 第一阶段是**变量**，**函数声明**，以及**正常格式的参数创建**，这是一个解析和进入上下文的阶段。
- 第二个阶段是**代码执行**，**函数表达式**和**不合格的标识符**（为声明的变量）被**创建**。

###7、for循环(for Loops)

可以通过for循环取得数组或是数组类似对象的值，譬如arguments和HTMLCollection对象。

通常的循环形式如下：
```javascript
// 次佳的循环
for (var i = 0; i < myarray.length; i++) {
   // 使用myarray[i]做点什么
}
```
这种形式的循环的不足在于每次循环的时候数组的长度都要去获取下。这会降低你的代码，尤其当myarray不是数组，而是一个HTMLCollection对象的时候。

**HTMLCollections**指的是**DOM方法返回的对象**。
```javascript
document.getElementsByName()
document.getElementsByClassName()
document.getElementsByTagName()
``` 

还有其他一些HTMLCollections，这些是在DOM标准之前引进并且现在还在使用的。
```javascript
document.images // 页面上所有的图片元素
document.links // 所有a标签元素
document.forms // 所有表单
document.forms[0].elements // 页面上第一个表单中的所有域
``` 
集合的麻烦在于它们实时查询基本文档（HTML页面）。这意味着每次你访问任何集合的长度，你要实时查询DOM，而DOM操作一般都是比较昂贵的。

循环获取值时，缓存数组(或集合)的长度是比较好的形式，正如下面代码显示的：
```javascript
for (var i = 0, max = myarray.length; i < max; i++) {
   // 使用myarray[i]做点什么
}
``` 
这样，在这个循环过程中，你只检索了一次长度值。

在所有浏览器下，循环获取内容时缓存HTMLCollections的长度是更快的。

注意到，当你明确想要修改循环中的集合的时候（例如，添加更多的DOM元素），你可能更喜欢长度更新而不是常量。

伴随着单var形式，你可以把变量从循环中提出来，就像下面这样：
```javascript
function looper() {
   var i = 0,
        max,
        myarray = [];
   // ...
   for (i = 0, max = myarray.length; i < max; i++) {
      // 使用myarray[i]做点什么
   }
}
``` 

**单var形式好处**：
- 具有**一致性**的好处，因为你坚持了单一var形式

**单var形式缺点**：
- 不足在于当重构代码的时候，复制和粘贴整个循环有点困难。

最后一个需要对循环进行调整的是使用下面表达式之一来替换i++。
```javascript
i = i + 1
i += 1
``` 
JSLint提示您这样做，原因是++和–-促进了“过分棘手(excessive trickiness)”。
如果你直接无视它，JSLint的plusplus选项会是false（默认是default）。

还有两种变化的形式，其又有了些微**改进**。少了一个变量(无max)，向下数到0，通常更快，因为和0做比较要比和数组长度或是其他不是0的东西作比较更有效率。
 
```javascript
// 第一种变化的形式：
var i, myarray = [];
for (i = myarray.length; i–-;) {
   // 使用myarray[i]做点什么
}

// 第二种使用while循环：
var myarray = [],
    i = myarray.length;
while (i–-) {
   // 使用myarray[i]做点什么
}
```

###8、for-in循环(for-in Loops)

**for-in循环**应该用在**非数组对象**的**遍历**上，使用for-in进行循环也被称为“**枚举**”。

**【注】**
- 从技术上将，你可以使用for-in循环数组（因为JavaScript中数组也是对象），但这是不推荐的。
    - 如果数组对象已被自定义的功能增强，就可能发生逻辑错误。
    - 在for-in中，属性列表的顺序（序列）是不能保证的。
- **数组**使用正常的**for循环**，**对象**使用**for-in循环**。

有个很重要的**hasOwnProperty()**方法，当遍历对象属性的时候可以**过滤掉从原型链上下来的属性**。

```javascript
// 对象
var man = {
   hands: 2,
   legs: 2,
   heads: 1
};

// 在代码的某个地方
// 一个方法添加给了所有对象
if (typeof Object.prototype.clone === "undefined") {
   Object.prototype.clone = function () {};
}
```
使用对象字面量定义了名叫man的对象。在man定义完成后的某个地方，在对象原型上增加了一个很有用的名叫clone()的方法。此原型链是实时的，这就意味着所有的对象自动可以访问新的方法。为了避免枚举man的时候出现clone()方法，需要应用hasOwnProperty()方法过滤原型属性。如果不做过滤，会导致clone()函数显示出来。
```javascript
// 1.
// for-in 循环
for (var i in m```javacriptan) {
   if (man.hasOwnProperty(i)) { // 过滤
      console.log(i, ":", man[i]);
   }
}
/* 控制台显示结果
hands : 2
legs : 2
heads : 1
*/
```
```javascript
// 2.
// 反面例子:
// for-in loop without checking hasOwnProperty()
for (var i in man) {
   console.log(i, ":", man[i]);
}
/*
控制台显示结果
hands : 2
legs : 2
heads : 1
clone: function()
*/
```

另外一种使用**hasOwnProperty()**的形式是**取消Object.prototype上的方法**。
```javascript
for (var i in man) {
   if (Object.prototype.hasOwnProperty.call(man, i)) { // 过滤
      console.log(i, ":", man[i]);
   }
}
``` 

其好处在于在man对象重新定义hasOwnProperty情况下避免命名冲突。也避免了长属性查找对象的所有方法，你可以使用局部变量“缓存”它。
```javascript
var i, hasOwn = Object.prototype.hasOwnProperty;
for (i in man) {
    if (hasOwn.call(man, i)) { // 过滤
        console.log(i, ":", man[i]);
    }
}
``` 

**【注】**
- **不使用hasOwnProperty()并不是一个错误**。根据任务以及你对代码的自信程度，你可以跳过它以提高些许的循环速度。
- 当你对当前对象内容（和其原型链）不确定的时候，**添加hasOwnProperty()更加保险些**。

**格式化的变化**：
- **缺点**：直接忽略花括号，通不过JSLint检测。
- **优点**：循环语句读起来就像一个完整的想法（每个元素都有一个自己的属性”X”，使用”X”干点什么）。

```javascript
// 警告： 通不过JSLint检测
var i, hasOwn = Object.prototype.hasOwnProperty;
for (i in man) if (hasOwn.call(man, i)) { // 过滤
    console.log(i, ":", man[i]);
}
```

###9、（不）扩展内置原型((Not) Augmenting Built-in Prototypes)
**增加内置原型**的**缺点**：
- *严重降低了可维护性，因为它让你的代码变得难以预测。*
- *可能会导致不使用hasOwnProperty属性时在循环中显示出来，这会造成混乱。*

因此，不增加内置原型是最好的。

满足以下三个条件可以考虑增加内置原型：
- 可以预期将来的ECMAScript版本或是JavaScript实现将一直将此功能当作内置方法来实现。
- 如果您检查您的自定义属性或方法已不存在——也许已经在代码的其他地方实现或已经是你支持的浏览器JavaScript引擎部分。
- 你清楚地文档记录并和团队交流了变化。

**给原型进行自定义的添加**，形式如下：
```javascript
if (typeof Object.protoype.myMethod !== "function") {
   Object.protoype.myMethod = function () {
      // 实现...
   };
}
``` 

###10、switch模式(switch Pattern)
通过类似下面形式的switch语句增强可读性和健壮性：
```javascript
var inspect_me = 0,
    result = '';
switch (inspect_me) {
case 0:
   result = "zero";
   break;
case 1:
   result = "one";
   break;
default:
   result = "unknown";
}
``` 

**switch语句风格约定**：
- *每个case和switch对齐（花括号缩进规则除外）。*
- *每个case中代码缩进。*
- *每个case以break清除结束。*
- *避免贯穿（故意忽略break）。*如果你非常确信贯穿是最好的方法，务必记录此情况，因为对于有些阅读人而言，它们可能看起来是错误的。
- *以default结束switch：确保总有健全的结果，即使无情况匹配。*

###11、避免隐式类型转换(Avoiding Implied Typecasting )

JavaScript的变量在比较的时候会隐式类型转换。这就是为什么一些诸如：false == 0 或 “” == 0 返回的结果是true。

为**避免**引起混乱的**隐含类型转换**，在比较值和表达式类型的时候始终**使用===和!==操作符**。
```javascript
var zero = 0;
if (zero === false) {
   // 不执行，因为zero为0, 而不是false
}

// 反面示例
if (zero == false) {
   // 执行了...
}
``` 
还有另外一种思想观点认为==就足够了===是多余的。例如，当你使用typeof你就知道它会返回一个字符串，所以没有使用严格相等的理由。然而，JSLint要求严格相等，它使代码看上去更有一致性，可以降低代码阅读时的精力消耗。

###12、避免(Avoiding) eval()
**eval()**：接受任意的字符串，并当作JavaScript代码来处理。记住该咒语“eval()是魔鬼”。
- 当有问题的代码是事先知道的（不是运行时确定的），没有理由使用eval()。
- 如果代码是在运行时动态生成，有一个更好的方式不使用eval而达到同样的目 标。

```javascript
// 反面示例
var property = "name";
alert(eval("obj." + property));

// 更好的
var property = "name";
alert(obj[property]);
```

使用**eval()**也带来了**安全隐患**，因为被执行的代码（例如从网络来）可能已被篡改。这是个很常见的反面教材，当处理Ajax请求得到的JSON相应的时候。在这些情况下，最好使用JavaScript内置方法来解析JSON相应，以确保安全和有效。若浏览器不支持JSON.parse()，你可以使用来自JSON.org的库。

**【注】**
给**setInterval()**,**setTimeout()**和**Function()构造函数**传递字符串，大部分情况下，与使用eval()是类似的，因此要避免。在幕后，JavaScript仍需要评估和执行你给程序传递的字符串：
```javascript
// 反面示例
setTimeout("myFunc()", 1000);
setTimeout("myFunc(1, 2, 3)", 1000);

// 更好的
setTimeout(myFunc, 1000);
setTimeout(function () {
   myFunc(1, 2, 3);
}, 1000);
```

使用新的Function()构造就类似于eval()，应小心接近。

如果绝对必须使用eval()，可以考虑：
- 使用new Function()代替。有一个小的潜在好处，因为在新Function()中作代码评估是在局部函数作用域中运行，所以代码中任何被评估的通过var定义的变量都不会自动变成全局变量。
- 封装eval()调用到一个即时函数中。

```javascript
console.log(typeof un);    // "undefined"
console.log(typeof deux); // "undefined"
console.log(typeof trois); // "undefined"

var jsstring = "var un = 1; console.log(un);";
eval(jsstring); // logs "1"

jsstring = "var deux = 2; console.log(deux);";
new Function(jsstring)(); // logs "2"

jsstring = "var trois = 3; console.log(trois);";
(function () {
   eval(jsstring);
}()); // logs "3"

console.log(typeof un); // number
console.log(typeof deux); // "undefined"
console.log(typeof trois); // "undefined"
``` 

**eval()**和**Function构造**的**区别**：
- **eval()**可以**干扰作用域链**，而**Function()**更安分守己些。不管你在哪里执行 Function()，它**只看到全局作用域**。所以其能很好的避免本地变量污染。
- **eval()**可以**访问和修改它外部作用域中的变量**，这是**Function做不来**的（注意到使用Function和new Function是相同的）。

```javascript
(function () {
   var local = 1;
   eval("local = 3; console.log(local)"); // logs "3"
   console.log(local); // logs "3"
}());

(function () {
   var local = 1;
   Function("console.log(typeof local);")(); // logs undefined
}());
``` 

###13、parseInt()下的数值转换(Number Conversions with parseInt())

使用**parseInt()**可以**从字符串中获取数值**，该方法接受另一个基数参数，这经常省略，但不应该。

当字符串以”0″开头的时候就有可能会出问题，例如，部分时间进入表单域，在ECMAScript 3中，开头为”0″的字符串被当做8进制处理了，但这已在ECMAScript 5中改变了。

**为了避免矛盾和意外的结果，总是指定基数参数。**
```javascript
var month = "06",
    year = "09";
month = parseInt(month, 10);
year = parseInt(year, 10);
``` 
如果忽略了基数参数，如parseInt(year)，返回的值将是0，因为“09”被当做8进制（好比执行 parseInt( year, 8 )），而09在8进制中不是个有效数字。

替换方法是将字符串转换成数字，包括：
```javascript
+"08" // 结果是 8
Number("08") // 8
``` 

**Number()**与**parseInt()**的**区别**：
- **Number()**通常**快**于**parseInt()**。parseInt()方法不是简单地解析与转换。
- 如果**输入数字+字符串**，例如“08 hello”，**parseInt()将返回数字**，而**其它以NaN告终**。

###14、缩进(Indentation)
**缩进方式**：
- *tab制表符缩进。*
- *四个空格缩进。*

使用哪一种缩进方式都无所谓，只要团队每个人都遵循同一个规范就好了。

**什么应该缩进**呢？规则很简单——**花括号里面的东西**。这就意味着**函数体**，**循环 (do, while, for, for-in)**，**if**，**switch**，以及**对象字面量中的对象属性**。
```javascript
function outer(a, b) {
    var c = 1,
        d = 2,
        inner;
    if (a > b) {
        inner = function () {
            return {
                r: c - d
            };
        };
    } else {
        inner = function () {
            return {
                r: c + d
            };
        };
    }
    return inner;
}
``` 

###15、花括号{}(Curly Braces)
**花括号（亦称大括号）应总被使用**，即使在它们为可选的时候。技术上将，在in或是for中如果语句仅一条，花括号是不需要的，但是你还是应该总是使用它们，这会让代码更有持续性和易于更新。

```javascript
// 糟糕的实例
for (var i = 0; i < 10; i += 1)
   alert(i);

// 好的实例
for (var i = 0; i < 10; i += 1) {
   alert(i);
}
```
if条件类似：
```javascript
// 坏
if (true)
   alert(1);
else
   alert(2);

// 好
if (true) {
   alert(1);
} else {
   alert(2);
}
```

###16、左花括号的位置(Opening Brace Location)

开发人员对于左大括号的位置有着不同的偏好——在同一行或是下一行。
```javascript
if (true) {
   alert("It's TRUE!");
}

//或

if (true)
{
   alert("It's TRUE!");
}
```
括号位置不同会有不同的行为表现。因为分号插入机制(semicolon insertion mechanism)——JavaScript是不挑剔的，当你选择不使用分号结束一行代码时JavaScript会自己帮你补上。这种行为可能会导致麻烦，如当你返回对象字面量，而左括号却在下一行的时候：
```javascript
// 警告： 意外的返回值
function func() {
   return
  // 下面代码不执行
   {
      name : "Batman"
   }
}
``` 
如果你希望函数返回一个含有name属性的对象，你会惊讶。由于隐含分号，函数返回undefined。前面的代码等价于：
```javascript
// 警告： 意外的返回值
function func() {
   return undefined;
  // 下面代码不执行
   {
      name : "Batman"
   }
}
``` 
总之，总是使用花括号，并始终把在与之前的语句放在同一行：
```javascript
function func() {
   return {
      name : "Batman"
   };
}
```

关于分号注：就像使用花括号，你应该总是使用分号，即使他们可由JavaScript解析器隐式创建。这不仅促进更科学和更严格的代码，而且有助于解决存有疑惑的地方，就如前面的例子显示。

###17、空格(White Space)

**空格**的使用同样有助于**改善代码的可读性和一致性**。在JavaScript中，在列表模样表达式（相当于逗号）和结束语句（相对于完成了“想法”）后面添加间隔。

**适合使用空格的地方**包括：
- for循环分号分开后的的部分：

```javascript
for (var i = 0; i < 10; i += 1) {...}
```

- for循环中初始化的多变量(i和max)：

```javascript
for (var i = 0, max = 10; i < max; i += 1) {...}
```

- 分隔数组项的逗号的后面：

```javascript
var a = [1, 2, 3];
```

- 对象属性逗号的后面以及分隔属性名和属性值的冒号的后面：

```javascript
var o = {a: 1, b: 2};
```

- 限定函数参数：

```javascript
myFunc(a, b, c)
```

- 函数声明的花括号的前面：

```javascript
function myFunc() {}
```

- 匿名函数表达式function的后面：

```javascript
var myFunc = function () {};
```

使用**空格分开所有的操作符**和**操作对象**是另一个不错的使用，这意味着在**+, -, *, =, <, >, <=, >=** ===, !==, &&, ||, +=等前后**都**需要空格**。

```javacript
// 宽松一致的间距
// 使代码更易读
// 使得更加“透气”
var d = 0,
    a = b + 1;
if (a && b && c) {
    d = a % c;
    a += d;
}

// 反面例子
// 缺失或间距不一
// 使代码变得疑惑
var d = 0,
    a = b + 1;
if (a&&b&&c) {
    d=a % c;
    a+= d;
}
``` 

最后需要注意的一个空格——**花括号间距**。最好使用空格：
- 函数、if-else语句、循环、对象字面量的左花括号的前面({)
- else或while之间的右花括号(})

空格使用的一点不足就是增加了文件的大小，但是压缩无此问题。

####命名规范(Naming Conventions)
另一种方法让你的代码更具可预测性和可维护性是采用命名规范。这就意味着你需要用同一种形式给你的变量和函数命名。

下面是建议的一些命名规范，你可以原样采用，也可以根据自己的喜好作调整。同样，遵循规范要比规范是什么更重要。
- **以大写字母写构造函数**(Capitalizing Constructors)

JavaScript并没有类，但有new调用的构造函数：
```javacript
var adam = new Person();  
```

因为构造函数仍仅仅是函数，仅看函数名就可以帮助告诉你这应该是一个构造函数还是一个正常的函数。

命名构造函数时首字母大写具有暗示作用，使用小写命名的函数和方法不应该使用new调用：
```javacript
function MyConstructor() {...}
function myFunction() {...}
``` 

###18、分隔单词(Separating Words)

当你的变量或是函数名有多个单词的时候，最好单词的分离遵循统一的规范，有一个常见的做法被称作“驼峰(Camel)命名法”，就是单词小写，每个单词的首字母大写。

**命名规范**：
- *对于构造函数，可以使用大驼峰式命名法(upper camel case)*，如MyConstructor()。
- *对于函数和方法名称，你可以使用小驼峰式命名法(lower camel case)*，像是myFunction(), calculateArea()和getFirstName()。
- *变量不是函数，通常使用小驼峰式命名法，或者所有单词小写以下划线连接。*例如，first_name, favorite_bands, 和old_company_name，这种标记法帮你直观地区分函数和其他标识——原型和对象。

ECMAScript的属性和方法均使用Camel标记法，尽管多字的属性名称是罕见的（正则表达式对象的lastIndex和ignoreCase属性）。

###19、其它命名形式(Other Naming Patterns)

- 采用**全部单词大写**的规范来命名**整个程序生命周期中都不会改变的变量**。
- **全局变量名字全部大写**。全部大写命名全局变量可以加强减小全局变量数量的实践，同时让它们易于区分。
- 使用一个**下划线前缀**来表示**一个私有属性或方法**。

```javacript
// 珍贵常数，只可远观
var PI = 3.14,
    MAX_WIDTH = 800;
```
```javacript
var person = {
    getName: function () {
        return this._getFirst() + ' ' + this._getLast();
    },

    _getFirst: function () {
        // ...
    },
    _getLast: function () {
        // ...
    }
};
```
getName()表示公共方法，部分稳定的API。而_getFirst()和_getLast()则表明了私有。它们仍然是正常的公共方法，但是使用下划线前缀来警告person对象的使用者这些方法在下一个版本中时不能保证工作的，是不能直接使用的。

**常见的_private规范**：
- *使用尾下划线表示私有**，如name_和getElements_()。
- *使用一个下划线前缀表_protected（保护）属性，两个下划线前缀表示__private （私有）属性。*
- *Firefox中一些内置的变量属性不属于该语言的技术部分，使用两个前下划线和两个后下划线表示，如：`__proto__`和`__parent__`。*
