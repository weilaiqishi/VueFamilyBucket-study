# API设计

调用

```javascript
methods: {
  handleShow () {
    this.$Alert({
      content: '这是一条提示信息',
      duration: 3
    })
  }
}
```

this.$Alert 可以在任何位置调用，无需单独引入。该方法接收两个参数：
content：提示内容；
duration：持续时间，单位秒，默认 1.5 秒，到时间自动消失。

## 主体组件 alert.vue

在 add 方法中，给每一条传进来的提示数据，加了一个不重复的 name 字段来标识，
并通过 setTimeout 创建了一个计时器，当到达指定的 duration 持续时间后，
调用 remove 方法，将对应 name 的那条提示信息找到，并从数组中移除。

## 实例化封装 notification.js

notification.js 并不是最终的文件，它只是对 alert.vue 添加了一个方法 newInstance

Alert 组件没有任何 props，这里在 Render Alert 组件时，还是给它加了 props，当然，这里的 props 是空对象 {}，而且即使传了内容，也不起作用。
这样做的目的还是为了扩展性，如果要在 Alert 上添加 props 来支持更多特性，是要在这里传入的。
不过话说回来，因为能拿到 Alert 实例，用 data 或 props 都是可以的。
