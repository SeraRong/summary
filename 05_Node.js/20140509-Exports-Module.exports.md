Node.js中exports和module.exports的区别
==================

- exports 是指向的 module.exports 的引用
- module.exports 初始值为一个空对象 {}，所以 exports 初始值也是 {}
- require() 返回的是 module.exports 而不是 exports

【例】
```javascript
var name = 'nswbmw';
exports.name = name;
exports.sayName = function() {
    console.log(name);
}
```

给 exports 赋值其实是给 module.exports 这个空对象添加了两个属性而已，上面的代码相当于：

```javascript
var name = 'nswbmw';
module.exports.name = name;
module.exports.sayName = function() {
    console.log(name);
}
```

**我们通常这样使用 exports 和 module.exports**

 【例】 一个简单的例子，计算圆的面积：

####一、使用 exports

  app.js
```javascript
var circle = require('./circle');
console.log(circle.area(4));
```  
  circle.js
```javascript
exports.area = function(r) {
    return r * r * Math.PI;
}
```

####二、使用 module.exports

  app.js
```javascript
var area = require('./area');
console.log(area(4));
```  
  area.js
```javascript
module.exports = function(r) {
    return r * r * Math.PI;
}
```  
  
####三、错误使用
上面两个例子输出是一样的。你也许会问，为什么不这样写呢？

  app.js
```javascript
var area = require('./area');
console.log(area(4));
```  
  
  area.js
```javascript
exports = function(r) {
    return r * r * Math.PI;
}
```  
  运行上面的例子会报错。这是因为，前面的例子中通过给 exports 添加属性，只是对 exports 指向的内存做了修改，而
```javascript
exports = function(r) {
    return r * r * Math.PI;
}
```  
  
  其实是对 exports 进行了覆盖，也就是说 exports 指向了一块新的内存（内容为一个计算圆面积的函数），也就是说 exports 和 module.exports 不再指向同一块内存，也就是说此时 exports 和 module.exports 毫无联系，也就是说 module.exports 指向的那块内存并没有做任何改变，仍然为一个空对象 {} ，也就是说 area.js 导出了一个空对象，所以我们在 app.js 中调用 area(4) 会报 TypeError: object is not a function 的错误。

####四、总结
  所以，一句话做个总结：当我们想让模块导出的是一个对象时， exports 和 module.exports 均可使用（但 exports 也不能重新覆盖为一个新的对象），而当我们想导出非对象接口时，就必须也只能覆盖 module.exports 。

**【注】**

我们经常看到这样的用写法：
```javascript
exports = module.exports = somethings
```  
  上面的代码等价于
```javascript
module.exports = somethings
exports = module.exports
```  
  
  原因也很简单， **module.exports = somethings 是对 module.exports 进行了覆盖，此时 module.exports 和 exports 的关系断裂，module.exports 指向了新的内存块，而 exports 还是指向原来的内存块，为了让 module.exports 和 exports 还是指向同一块内存或者说指向同一个 “对象”，所以我们就 exports = module.exports 。**