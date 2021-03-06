JavaScript 匿名函数
=========

###0、匿名函数（拉姆达函数）
```javascript
// 函授声明
function functionName(arg0, arg1, arg2) {
    // 函数体
}

// 函数表达式
var functionName = function (arg0, arg1, arg2) {
    // 函数体
};
```
**函数声明**与**函数表达式**之间的主要**区别**：

- *1、函数声明会在代码执行以前被加载到作用域中，函数表达式则是在代码执行到哪一行的时候才会有定义。*
- *2、函数声明会给函数指定一个名字，而函数表达式创建一个匿名函数，然后将这个匿名函数赋给一个变量。*

```javascript
// 匿名函数
function (arg0, arg1, arg2) {
    // 函数体
}
```
**匿名函数使用条件**（通常）：
- *将函数作为参数传入另一个函数，或者从一个函数中返回另一个函数时，通常使用匿名函数。*
- *在把函数当成值来使用的情况下，都可以使用匿名函数。*

```javascript
function createComparisonFunction(propertyName) {
    return
    function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}
```

###1、递归

```javascript
// 经典的递归阶乘函数
function factorial(num) {
    if (num < 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}
```

```javascript
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); // error
```
把factorial()函数保存在变量anotherFactorial中，将factorial变量设置为null，结果指向原始函数的引用只有一个。调用anotherFactorial()时，必须执行factorial()，而factorial不再是函数，所以导致错误。

使用arguments.callee可以解决这个问题，**arguments.callee，**是一个指向正在执行的函数的指针，可以用它来实现对函数的递归调用。
```javascript
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); // 24
```
通过使用arguments.callee代替函数名，可以确保无论怎样调用函数都不会出问题。因此，在编写递归函数时，使用arguments.callee总比使用函数名更保险。

**【拓展】**

- *arguments是一个类数组对象，它包含着传入函数中的所有参数，主要用途是保存函数参数。*
- *arguments有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。*

###2、闭包
**闭包**：有权访问另一个函数作用域链中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数。
####1）闭包与变量
作用域链的配置机制引出了一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最后一个值。别忘了闭包所保存的是整个变量对象，而不是某个特殊的变量。
```javascript
function createFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function () {
            return i;
        }
    }
    return result;
}

var funcs = createFunctions();
// 每个函数都输出10
for (var i = 0; i < funcs.length; i++) {
    document.write(funcs[i]() + "<br />")
}
```
表面上来，每个函数都应该返回自己的索引值。但实际上，每个函数都返回10。因为每个函数的作用域链中都保存着createFunctions()函数的活动对象，所以它们引用的都是同一个变量i。当createFunctions()函数返回后，变量i的值是10，此时每个函数都引用着保存变量i的同一个变量对象，所以每个函数内部i都是10。

下面重写createFunctions()函数，每个函数都会返回各自不同的索引值。
```javascript
function createFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function (num) {
            return function () {
                return num;
            };
        }(i);
    }
    return result;
}
var funcs = createFunctions();
// 分别输出0、1、2……9
for (var i = 0; i < funcs.length; i++) {
    document.write(funcs[i]() + "<br />");
}
```
定义了一个匿名函数，将立即执行该匿名函数的结果赋值给数组。匿名函数有一个参数num，也就是最终的函数要返回的值。调用每个匿名函数，传入了变量i，由于函数参数是按值传递的，所以就会将变量i的当前值复制给参数num。匿名函数内部创建并返回一个访问num的闭包，这样，result数组中的每个函数都有自己num变量的一个副本，因此就可以返回各自不同的数值了。
####2）this对象
this对象是在运行时基于函数的执行环境绑定的：
- *在全局函数中，this等于window。*
- *当函数被作为某个对象的方法调用时，this等于那个对象。*

**匿名函数的执行环境具有全局性，因此其this对象通常指向window。**但有时候由于编写闭包的方式不同，这一点可能不会那么明显。
```javascript
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        return function() {
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); // "The Window"
```
**每个函数在被调用时，其活动对象都会自动取得两个特殊变量：this和arguments。内部函数在搜索变量时，只会搜索到其活动对象为止，不可能直接访问其外部函数中的变量。**

把外部作用域中的this对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了。
```javascript
var name = "This Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        var that = this;
        return function() {
            return that.name;
        };
    }
};
alert(object.getNameFunc()()); // "MyObject"
```
**【注】**
*arguments对象和this对象一样，如果想访问作用域中的arguments对象，必须将该对象的引用保存到另一个闭包能够访问的变量中。*
####3）内存泄露
由于**IE9之前**的版本**对JScript对象和COM对象使用不同的垃圾回收机制**，因此闭包在IE中会导致一些特殊的问题。具体来说，如果闭包的作用域链中保存着一个HTML元素，那么就意味着元素将无法被销毁。
```javascript
function assignHandler() {
    var element = document.getElementById("someElement");
    element.onclick = function () {
        alert(element.id);
    };
}
```
由于匿名函数保存了一个对addignHandler()活动对象的引用，因此就会导致无法减少element的引用数。只要匿名函数存在，element的引用数至少也是1，因此它所占用的内存就永远不会被回收。
```javascript
function assignHandler() {
    var element = document.getElementById("someElement");
    var id = element.id;
    element.onclick = function () {
        alert(id);
    };
    element = null;
}
```
- 通过把element.id的一个副本保存在一个变量中，并且在闭包中引用该变量消除了循环引用。
- 把element变量设置为null。

**【注】**
**闭包会引用包含函数的整个活动对象**，而其中包含着element。即使闭包不直接引用element，包含函数的活动对象中仍然会保存一个引用。把element变量设置为null，就能够解除对DOM对象的引用，顺利地减少其引用数，确保正常回收其占有的内存。

###3、模仿块级作用域

**JavaScript没有块级作用域的概念。**在块语句中定义的变量，实际上是在包含函数中而非语句中创建的。
```javascript
function outputNumbers(count) {
    for (var i = 0; i < count; i++) {
        alert(i);
    }
    alert(i); // count
}
```
```javascript
function outputNumbers(count) {
    for (var i = 0; i < count; i++) {
        alert(i);
    }
    var i; // 重新声明变量
    alert(i); // count
}
```
JavaScript从来不会告诉你是否声明了同一个变量；遇到这种情况，它只会对后续的声明视而不见。匿名函数可以用来模仿块级作用域并避免这个问题。

用**块级作用域**（通常成为私有作用域）的**匿名函数**的语法如下：
```javascript
(function () {
    // 这里是块级作用域
})();
```
以上代码定义并立即调用了一个匿名函数。将函数声明包含在一对圆括号中。表示实际上是一个函数表达式。而紧随其后的另一对圆括号会立即调用这个函数。
```javascript
var someFunction = function () {
    // 这里是块级作用域
};
someFunction();
```
先定义了一个函数，然后立即调用了它。定义函数的方式是创建一个匿名函数，并把匿名函数赋值给变量someFunction。而调用函数的方式是函数名称后面添加一对圆括号，即someFunction()。
```javascript
function () {
    // 这里是块级作用域
}(); // error
```
上述代码会导致语法错误，是因为JavaScript将function关键字当作一个函数声明开始。
- *函数声明后面不能跟圆括号。*
- *函数表达式的后面可以跟圆括号。*

要将函数声明转换成函数表达式，只要像下面这样给她添加上一对圆括号即可：
```javascript
(function () {
    // 这里是块级作用域
})();
```
无论在什么地方，只要临时需要一些变量，就可以使用私有作用域，例如：
```javascript
function outputNumbers(count) {
    (function () {
        for (var i = 0; i < count; i++) {
            alert(i);
        }
    })();
    alert(i); // error
}
```
在重写后的outputNumbers()函数中，插入了一个私有作用域。在匿名函数中定义的任何变量，都会在执行结束时被销毁。因此，变量i只能在循环中使用，使用后即被销毁。而在私有作用域中能够访问变量count，是因为这个匿名函数是一个闭包，它能够访问包含作用域中的所有变量。

这种技术经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数。**一般来说，应该尽量少向全局作用域中添加变量和函数。**
```javascript
(function () {
    var now = new Date();
    if (now.getMonth() == 0 && now.getDate() == 1) {
        alert("Happy new Year!");
    }
})();
```

**优点**：*减少闭包占用的内存问题*。因为没有指向匿名函数的引用。只要函数执行完毕，就可以立即销毁其作用域链了。

###4、私有变量
**任何在函数中定义的变量，都可以认为是私有变量**，因为不能在函数的外部访问这些变量。

**私有变量**包括**函数的参数**、**局部变量**和在**函数内部定义的其它函数**。
```javascript
function add(num1, num2) {
    var sum = num1 + num2;
    return sum;
}
```
函数内部有3个私有变量：num1、num2和sum。在函数内部可以访问这几个变量，但在函数外部则不能访问他们。如果在函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量。而利用这一点，就可以创建用于访问私有变量的共有方法。

**特权方法是有权访问私有变量和私有函数的共有方法。**

创建特权方法的方式：
- 第一种是**在构造函数中定义特效方法**，基本模式如下：

```javascript
function MyObject() {
    // 私有变量
    var privateVariable = 10;

    // 私有函数
    function privateFunction() {
        return false;
    }
    
    // 特权方法
    this.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    };
}
```
在构造函数内部定义了所有私有变量和函数，变量privateVariable和函数privateFunction()只能通过特权方法publicMethod()来访问。在创建MyObject的实例后，除了使用publicMethod()，没有任何办法可以访问变量privateVariable和函数privateFunction()。

利用私有和特权成员，可以隐藏那些不应该被直接修改的数据。
```javascript
function Person(name) {
    this.getName = function () {
        return name;
    };
    thi.setName = function (value) {
        name = value;
    };
}

var person = new Person("Nicholas");
alert(person.getName()); // "Nicholas"

person.setName("Greg");
alert(person.getName);   // "Greg"
```
**缺点**：不许使用构造函数模式来达到目的。

####1）静态私有变量

- 第二种，**静态私有变量**通过在私有作用域中定义私有变量或函数，同样也可以创建特权方法，基本模式如下：

```javascript
(function () {
    // 私有变量
    var privatevariable = 10;

    // 私有函数
    function privateFunction() {
        return false;
    }
    
    //构造函数
    MyObject = function () {};
    
    //公有/特权方法
    MyObject.prototype.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    };
})();
```
创建了一个私有作用域，并在其中封装了一个构造函数及相应的方法。在私有作用域中，首先定义了私有变量和私有函数，然后有定义了构造函数及其公有方法。公有方法是在原型上定义的，这一点体现了典型的原型模式。

**【注】**
- 1、在定义构造函数时没有使用函数声明，而是使用了函数表达式。函数声明只能创建局部函数。
- 2、没有在声明MyObject时使用var关键字，使用var只能定义局部变量。**初始化未经声明的变量，总是会创建一个全局变量。**

因此，MyObject就成了一个全局变量，能够在私有作用域之外被访问到。

**静态私有变量模式**与**构造函数**定义特权方法的**区别**：
- *静态私有变量模式的私有变量和函数由实例共享。*
- *静态私有变量模式是在原型上定义的，所有实例都使用同一个函数；该模式特权方法作为一个闭包，总是保存着对包含作用域的引用。*

```javascript
(function () {
    var name = "";
    Person = function (value) {
        name = value;
    };
    Person.prototype.getName = function () {
        return name;
    };
    Person.prototype.setName = function (value) {
        name = value;
    };
})();

var person = new Person("Nicholas");
alert(person.getName());  // "Nicholas"

person.setName("Greg");
alert(person.getName());  // "Greg"

var person2 = new Person("Michael");
alert(person.getName());  // "Michael";
alert(person2.getName()); // "Michael"
```
**【注】**
- 创建静态私有变量会因为使用原型而增加代码复用，但每个实例都没有自己的私有变量。
- 根据具体需求确定使用实例变量，还是静态私有变量。
- 多查找作用域链中的一个层次，就会在一定成都上影响查找速度，而这正式使用闭包和私有变量的一个显明的不足之处。

####2）模块模式
**静态私有变量模式**是用于**为自定义类型创建私有变量和特权方法**的。

**模块模式**则是**为单例创建私有变量和特权方法**。

所谓**单例**，指的就是**只有一个实例的对象**。
```javascript
var singleton = {
    name: value,
    method: function () {
        // 这里是方法的代码
    }
}
```
模块模式通过为单例添加私有变量和特权方法能够使其得到增强，其语法形式如下：
```javascript
var singleton = function () {
    // 私有变量和私有函数
    var privateVariable = 10;

    function privateFunction() {
        return false;
    }
    
    // 特权、公有方法和属性
    return {
        publicProperty: true,
        publicMethod: function () {
            privateVariable++;
            return privateFunction();
        }
    };
}();
```
模块模式使用了一个返回对象的匿名函数。在这个匿名内部，首先定义了私有变量和函数，然后将一个对象字面量作为函数的值返回。返回的对象字面量中值包含可以公开的属性和方法。由于这个对象字面量定义的是单例的公共接口，这种模式在需要对单例进行某些初始化，同时有需要维护其私有变量时是非常有用的。
```javascript
function BaseComponent() {}

function OtherComponent() {}

var application = function () {
    // 私有变量和函数
    var components = new Array();
    // 初始化
    components.push(new BaseComponent());
    // 公共
    return {
        getComponentCount: function () {
            return components.length;
        },
        registerComponent: function (component) {
            if (typeof component == "object") {
                components.push(component);
            }
        }
    };
}();

application.registerComponent(new OtherComponent());
alert(application.getComponentCount());
```
创建一个用于管理组建的application对象。

在创建这个对象的过程中，首先声明了一个私有的domponents数组，并向数组中添加了一个BaseComponnet的新实例，而返回对象的getComponentCount()和registerComponent()方法，都是有权访问数组components的特权方法。前者只是返回已注册的组件数目，后者用于注册新组建。

简言之，*如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开以一些能够访问这些私有数据的方法，那么就可以使用模块模式。*

以这种模式创建的每个单例都是object的实例，因为最终要通过一个对象字面量来表示它。单例通常都是作为全局对象存在的，不会将它传给一个函数，因此，没有什么必要使用instanceof操作符来检测其对象类型了。

####3）增强的模块模式
改进模块模式，在返回对象之前加入对其增强的代码。

这种**增强的模块模式**适合那些**单例必须是某种类型的实例**，同时**还必须添加某些属性和方法对其加以增强**的情况。
```javascript
var singleton = function () {
    // 私有变量和私有函数
    var privateVariable = 10;

    function privateFunction() {
        return false;
    }
    // 特权、公有方法和属性
    return {
        publicProperty: true,
        publicMethod: function () {
            privateVariable++;
            return privateFunction();
        }
    };
}();
```
如果application对象必须是BaseComponent的实例，可以使用以下代码：
```javascript
var application = function () {
    // 私有变量和函数
    var components = new Array();
    // 初始化
    components.push(new Array);
    // 创建application的一个局部副本
    var app = new BaseComponent();
    // 公共接口
    app.getComponentCount = function () {
        return components.length;
    };
    app.registerComponent = function (component) {
        if (typeof component == "object") {
            components.push(component);
        }
    };
    // 返回这个副本
    return app;
}();
```
