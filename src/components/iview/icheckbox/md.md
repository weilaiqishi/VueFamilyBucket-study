# 有两个个技术难点

Checkbox 要同时支持单独使用和组合使用的场景；
CheckboxGroup 和 Checkbox 内可能嵌套其它的布局组件。
对于第一点，要在 Checkbox 初始化时判断是否父级有 CheckboxGroup，如果有就是组合使用的，否则就是单独使用。
而第二点，正好可以用上一节的通信方法，很容易就能解决。

## 单独使用的 Checkbox

prop、event、slot
1.因为要在 Checkbox 组件上直接使用 v-model 来双向绑定数据，那必不可少的一个 prop 就是 value，还有 event input
为了扩展性，我们再定义两个 props：trueValue 和 falseValue，它们允许用户指定 value 用什么值来判断是否选中。
因为实际开发中，数据库中并不直接保存 true / false，而是 1 / 0 或其它字符串，
如果强制使用 Boolean，使用者就要再额外转换一次，这样的 API 设计不太友好。
2.需要一个 disabled 属性来表示是否禁用
3.自定义事件 events 上文已经说了一个 input，用于实现 v-model 语法糖；另一个就是 on-change，当选中 / 取消选中时触发，用于通知父级状态发生了变化。
4.slot 使用默认的就好，显示辅助文本。

细节
1.<input>、<slot> 都是包裹在一个 <label> 元素内的，这样做的好处是，当点击 <slot> 里的文字时，
<input> 选框也会被触发，否则只有点击那个小框才会触发，那样不太容易选中，影响用户体验。
2.currentValue 仍然是布尔值（true / false），因为它是组件 Checkbox 自己使用的，对于使用者无需关心，
而 value 可以是 String、Number 或 Boolean，这取决于 trueValue 和 falseValue 的定义。
3.对 prop value 使用 watch 进行了监听，当父级修改它时，会调用 updateModel 方法，同步修改内部的 currentValue
用 if 条件判断了父级修改的值是否符合 trueValue / falseValue 所设置的，否则会抛错。

## 组合使用的 Checkbox

两种模式，只能用其一，而判断的依据，就是是否用了 CheckboxGroup 组件。
所以在 Checkbox 组件内，我们用上一节的 findComponentUpward 方法判断父组件是否有 CheckboxGroup
在 mounted 时，通过 findComponentUpward 方法，来判断父级是否有 CheckboxGroup 组件，如果有，就将 group 置为 true，
并触发 CheckboxGroup 的 updateModel 方法，下文会介绍它的作用。

在 template 里，我们又写了一个 <input> 来区分是否是 group 模式。Checkbox 的 data 里新增加的 model 数据，
其实就是父级 CheckboxGroup 的 value，会在下文的 updateModel 方法里给 Checkbox 赋值。

新增的 prop： label 只会在组合使用时有效，结合 model 来使用

在组合模式下，Checkbox 选中，就不用对 Form 派发事件了，应该在 CheckboxGroup 中做处理

## checkbox-gourp

一共有 3 个地方调用了 updateModel，其中两个是 CheckboxGroup 的 mounted 初始化和 watch 监听的 value 变化时调用；另一个是在 Checkbox 里的 mounted 初始化时调用。这个方法的作用就是在 CheckboxGroup 里通过 findComponentsDownward 方法找到所有的 Checkbox，然后把 CheckboxGroup 的 value，赋值给 Checkbox 的 model，并根据 Checkbox 的 label，设置一次当前 Checkbox 的选中状态。这样无论是由内而外选择，或由外向内修改数据，都是双向绑定的，而且支持动态增加 Checkbox 的数量。
