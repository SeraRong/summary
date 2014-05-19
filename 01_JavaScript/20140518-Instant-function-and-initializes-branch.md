Javascript 中的即时函数和初始化分支
==================

在Javascript中，定义函数的方式有三种。 

###1、 定义函数的方式 
```javascript
// 函数声明
function boo() {
    // 函数体
}

// 函数表达式
var boo = function() {
    // 函数体
}

// 命名函数表达式
var boo = function boo() {
    // 函数体
};
```

###2、即时函数的语法

Javascript中，还有一种函数的表现形式就是**即时函数**。顾名思义，**即时函数**就是可以在页面**加载完该函数**之后**立即执行该函数**的语法。 

即时函数的写法：
```javascript
// 即时函数是一种支持在定义函数侯立即执行该函数的一种语法。
(function () {
    alert("immediate function");
}());

//也可以写成（常用）
(function () {
    alert("immediate function");
})();
```
###3、即时函数的特点

**【注意】**

**即时函数**是**该函数加载完**就会**立即被执行**，而不是等待页面加载完之后才执行即时函数，这和**window.onload()**和**$(function(){})**都是有区别的，所以即时函数是不能替代以上两者的。

```html
<html>
    <head>
    <title>即时函数</title>
    <script language="javascript" type="text/javascript">
        (function () {
            alert(document.getElementsByTagName("body")[0]);
            // undefined,因为这个时候DOM元素<body>还没有被加载。
        })();
        
        // 另一种方式
        window.onload = function () {
            (function () {
                alert(document.getElementsByTagName("body")[0]);
                // object, 因为window.onload是要等待页面的所以元素加载完
                // 才会执行的。
            })();
        };
    </script>
    </head>
    <body>
    </body>
</html>
```

###4、即时函数的意义

比如在页面加载时，必须执行一些任务，如附加事件处理程序，创建对象等任务，这些任务只需要执行一次，因此没有必要创建一个命名函数，而且这些初始化任务也需要一些变量，将这些变量定义到全局对象中是一个不完美的方法，因为这些变量也是只需要一次，应当尽量保持全局空间的洁净。那么这样的任务就可以用即时函数完成。 
```javascript
// 即时函数能保持全局空间不受污染，能立即执行，可作为一些初始化工作，
// 即时函数是非常有用的。
(function () {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today = new Date(),
    msg = "Today is " + days[today.getDay()] + ", " + today.getDate();
    
    alert(msg);
})(); // Today is Sun, 25
```

###5、即时函数能够访问全局空间的函数，支持参数传递和返回值。 
```javascript
// 全局空间里的函数
var global_f = function() {
    alert("global scope");
};

// 即时函数返回值，参数。
var result_f = (function(param) {
    alert(param); // param
    global_f(); // global scope
     
    return function() {
        return 2;
    };
}("param"));

result_f(); // 2
```

###6、即时函数也可以用于创建对象属性
某个对象的某个属性在对象生命周期内都不会改变，但是该属性值的获取需要做一些工作，就可以通过即时函数的方式，将即时函数的返回值作为该属性的值。 

```javascript
// 定义对象时使用即时函数
var obj =  {
    msg: (function() {
        // 获取该对象属性需要做的一些工作
        var what = "call", who = "me";
        
        return what + " " + who;
    })(), 
    
    getMsg: function() {
        return this.msg;
    }
};
```

###7、即时对象初始化的方法
采用即时函数处理一些初始化任务是一个不错的方法，但是在初始化任务很复杂的情况下，采用即时函数可能导致代码凌乱，函数中可能充斥着很多零散的变量和方法。为了**使初始化任务代码更加的模块化**，可以采用**即时对象初始化**的方法。 

该模式就是创建一个临时对象，创建完该临时对象后立即执行该对象的某个方法（该方法通常定义为init方法）进行初始化工作。 

```javascript
// 即时对象初始化
({
    maxwidth: 400,
    maxheight: 180,
    getMax: function() {
        return this.maxwidth + "x" + this.maxheight;
    },
    init: function() {
        // 初始化任务
        alert(this.getMax());
    }
     
}).init();
```
###8、初始化分支，初始化分支又称为加载时分支，是一种初始化优化模式。

当知道某个条件在整个程序生命周期都不会发生改变的时候，只需要对该条件判断一次就可以了。

- 没有初始化分支的效果

```javascript
var utils = {
    addListener: function(_el, _type, _fn)
    {
        if (typeof window.addEventListener === "function")
        {
            _el.addEventListener(_type, _fn, false);       
        }
        else if (typeof document.attachEvent === "function") //IE
        {
            _el.attachEvent("on" + _type, fn)
        }
        else
        {
            _el["on" + _type] = _fn; //更早版本的浏览器 
        }
    },
    
    removeListener: function(_el, _type, _fn)
    {
        if (typeof window.addEventListener === "function")
        {
            _el.removeEventListener(_type, _fn, false);       
        }
        else if(typeof document.attachEvent === "function") //IE
        {
            _el.detachEvent("on" + _type, fn)
        }
        else
        {
            _el["on" + _type] = null; //更早版本的浏览器 
        }
    }
};
```
**【问题】** 每次在调用utils.addListener或utils.removeListener时，都会**重复的执行相同的检查**，效率是比较低下的。 


- 采用初始化分支的效果

```javascript
// 接口
var util = {
    addListener: null,
    removeListener: null
};

// 初始化分支实现
if (typeof window.addEventListener === "function")
{
    util.addListener = function(_el, _type, _fn)
    {
         _el.addEventListener(_type, _fn, false);  
    };
    util.removeListener = function(_el, _type, _fn)
    {
         _el.removeEventListener(_type, _fn, false);  
    }; 
}
else if (typeof document.attachEvent === "function")
{
    util.addListener = function(_el, _type, _fn)
    {
         _el.attachEvent("on" + _type, fn);
    };
    util.removeListener = function(_el, _type, _fn)
    {
         _el.detachEvent("on" + _type, fn);
    };
}
else
{
    util.addListener = function(_el, _type, _fn)
    {
         _el["on" + _type] = _fn;
    };
    util.removeListener = function(_el, _type, _fn)
    {
        _el["on" + _type] = null;
    };
}
```
**【优点】** 采用初始化分支，util的addListener和removeListener方法**只被初始化一次**，以后的每次调用不必再重复的做浏览器版本判断了。
