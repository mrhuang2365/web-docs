## 判断数组的6中方法

```
const arr = [];
// 1
Array.isArray(arr);
// 2
arr.constructor === Array
// 3
arr instanceof Array
// 4
Object.prototype.toString.call(arr) === '[object Array]'
// 5
Object.getPrototypeOf(arr) === Array.prototype
// 6
Array.prototype.isPrototypeOf(arr)
```

