## 手写实现new 操作符
* 1、创建一个object
* 2、修改object的原型
* 3、通过apply、call执行调用
* 4、返回实例

``` javascript
function _new(fn, ...args) {
  // var obj = Object.create(fn.prototype);
  var obj = {};
  obj.__proto__ = fn.prototype;
  
  var result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```
