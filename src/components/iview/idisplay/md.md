# 演示

jsfiddle 或 jsbin 之类的网站，在里面你可以用 CDN 的形式引入 Vue.js，然后在线写示例，实时运行
比如 https://jsfiddle.net/c87yh92v/
这类网站主要是一个 html，里面包含 js、css 部分，渲染侧是用 iframe 嵌入你编写的 html，并实时更新。
在这些网站写示例，是不能直接写 .vue 文件的，因为没法进行编译

<https://run.iviewui.com/>
iView Run它是能够在线编写一个标准的 .vue 文件，并及时渲染的，它也预置了 iView 环境，你可以使用 iView 组件库全部的组件。

## 设计

一个常规的 .vue 文件一般都会包含 3 个部分：
template：组件的模板；
script：组件的选项，不包含 el；
style：CSS 样式。
处理字符串然后用extend来构造一个组件实例

vue 的script部分一般都是以 export default 开始的，在 splitCode 方法中将它替换为了 return, 返回了vue options
但他还是一个字符串，我们可以用eval或new Function去执行字符串
new Function用法:
new Function ([arg1[, arg2[, ...argN]],] functionBody)
例:
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 6)); // 8

## template

Vue CLI 3 默认使用了 vue.runtime.js，它不允许编译 template 模板，因为我们在 Vue.extend 构造实例时，用了 template 选项，所以会报错。
解决方案有两种，一是手动将 template 改写为 Render 函数，但这成本太高；另一种是对 Vue CLI 3 创建的工程做简单的配置。我们使用后者。

vue.config.js

```javascript
module.exports = {
  runtimeCompiler: true
};
```
