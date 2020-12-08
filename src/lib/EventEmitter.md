# EventEmitter

## 模式

观察者模式
一个对象“订阅”另一个对象的某个活动，当对象的活动状态发生了改变，就去通知订阅者，而订阅者也称为观察者。

## 简述

1.创建数组
2.往数组里添加回调
3.等执行的时候遍历数组依次执行

## 实现

1.在实例化EventEmitter对象时创建对象

```js
function EventEmitter() {
    //私有属性，保存订阅方法
    this._events = {};
}
```

2.on方法
接受参数: 1.事件类型 2.回调函数 3.是否从头部插入

因为有其它子类需要继承自EventEmitter，因此要判断子类是否存在_event属性，这样做是为了保证子类必须存在此实例属性

```js
EventEmitter.prototype.on = function (type, listener, flag) {
    if (!this._events) { this._events = Object.create(null) }

    if (this._events[type]) {
        if (flag) {
            this._events[type].unshift(listener)
        } else {
            this._events[type].push(listener)
        }
    } else {
        this._events[type] = [listener]
    }
}
```

3.emit方法
emit方法就是将订阅方法取出执行，使用call方法来修正this的指向，因为继承EE的子类需要用到this

```js
EventEmitter.prototype.emit = function (type, ...args) {
    if (this._events[type]) {
        this._events[type].forEach(fn => fn.apply(this, args))
    }
}
```

4.once方法
用中间函数包裹订阅的方法，在执行后listener后移除中间函数
在off中判断中间函数是否要移除，要用一个变量保存listener的地址

```js
EventEmitter.prototype.once = function (type, listener) {
    const fn = (...args) => {
        listener(...args)
        this.off(type, fn)
    }
    fn.listener = listener
    this.on(type, fn)
}
```

5.off方法

```js
EventEmitter.prototype.off = function (type, listener) {
    if (this._events[type]) {
        //过滤掉退订的方法，从数组中移除
        this._events[type] =
            this._events[type].filter(fn => {
                return fn !== listener && fn.origin !== listener
            });
        }
    };
```
