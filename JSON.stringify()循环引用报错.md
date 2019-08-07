```
遇到 Uncaught TypeError: Converting circular structure to JSON 错误信息
```

上面的错误信息告诉我们， 对象中存在循环引用， 解决思路就是通过自定义stringify方法，设置一个全局缓存变量，stringify的第二个参数如果是function时，他会传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。所以，便有了如下解决方案:

```
let obj = new Object();

// 声明cache变量，便于匹配是否有循环引用的情况
let cache = [];
let str = JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // 移除
            return;
        }
        // 收集所有的值
        cache.push(value);
    }
    return value;
});
cache = null; // 清空变量，便于垃圾回收机制回收
```
