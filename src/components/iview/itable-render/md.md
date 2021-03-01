# table 结构

table：定义 HTML 表格；
thead：定义表头；
tbody：定义表格主体；
tr：定义表格行；
th：定义表头单元格；
td：定义表格单元。

```html
<table>
  <thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>王小明</td>
      <td>18</td>
    </tr>
    <tr>
      <td>张小刚</td>
      <td>25</td>
    </tr>
  </tbody>
</table>
```

标准的表格系列标签，跟 div+css 实现是有很大区别的，
比如表格在做单元格合并时，有提供原生属性，用 div 就很麻烦了；
再比如渲染原理上也有一定的区别，table 会在内容全部下载完后加载

## 定制 API

格分为了两部分，表头 thead 和数据 tbody，
那 props 也定义两个：
  1.columns：列配置，格式为数组，其中每一列 column 是一个对象，用来描述这一列的信息，它的具体说明如下：
    title：列头显示文字；
    key：对应列内容的字段名；
    render：自定义渲染列，使用 Vue 的 Render 函数，
    不定义则直接显示为文本。
  比如

```javascript
[
  {
    title: '姓名',
    key: 'name'
  },
  {
    title: '年龄',
    key: 'age'
  }
]
```

  2.data：显示的结构化数据，格式为数组，其中每一个对象，
  就是一行的数据
  比如

```javascript
[
  {
    name: '王小明',
    age: 18
  },
  {
    name: '张小刚',
    age: 25
  }
]
```

因为不确定使用者要对某一列做什么交互，
所以不能在 Table 内来实现自定义列。
使用 Render 函数可以将复杂的自定义列模板
的工作交给使用者来配置，
Table 内只用一个 Functional Render 做中转。

## 完成基础表格

table.vue

1.props 中的 columns 和 data 的格式都是数组，
如果 props 的类型是对象或数组，它的默认值必须从一个工厂函数获取

2.tbody 内嵌套使用了两次 v-for，外层循环数据 data，内层循环列 columns，
这样就填充了每个单元格。

3.使用 Render 自定义列模板
Functional Render 的用法，它没有状态和上下文，主要用于中转一个组件，
在本节的 Table 组件非常合适。
render.js

```javascript
export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    };

    return ctx.props.render(h, params);
  }
};
```

render.js 定义了 4 个 props：
row：当前行的数据；
column：当前列的数据；
index：当前是第几行；
render：具体的 render 函数内容。
这里的 render 选项并没有渲染任何节点，
而是以h 和当前的行、列、序号作为参数 调用props中定义render并返回结果

在 table.vue 用v-if else来渲染render数据或普通数据

columns 里定义的 render，是有两个参数的，第一个是 createElement（即 h），
第二个是从 render.js 传过来的对象，
它包含了当前行数据（row）、当前列配置（column）、当前是第几行（index），
使用者可以基于这 3 个参数得到任意想要的结果.
由于是自定义列了，显示什么都是使用者决定的，
因此在使用了 render 的 column 里可以不用写字段 key 。

columns 里定义的 render 字段，它仅仅是名字叫 render 的一个普通函数，
并非 Vue.js 实例的 render 选项，只是我们恰巧把它叫做 render 而已，
如果愿意，也可以改为其它名字，比如 renderRow。
真正的 Render 函数只有一个地方，那就是 render.js 中的 render 选项，
只是它代理了 column 中的 render

## 修改当前行

整行数据编辑

操作这一列，默认是一个修改按钮，点击后，变为保存和取消两个按钮，
同时本行其它各列都变为了输入框，并且初始值就是刚才单元格的数据。
变为输入框后，可以任意修改单元格数据，点击保存按钮保存整行数据，
点击取消按钮，还原至修改前的数据。

当进入编辑状态时，每一列的输入框都要有一个临时的数据使用
v-model 双向绑定来响应修改，所以在 data 里再声明四个数据

```javascript
// table-render.vue，部分代码省略
{
  data () {
    return {
      // ...
      editName: '',  // 第一列输入框
      editAge: '',  // 第二列输入框
      editBirthday: '',  // 第三列输入框
      editAddress: '',  // 第四列输入框
    }
  }
}
```

同时还要知道是在修改第几行的数据，
所以再加一个数据标识当前正在修改的行序号（从 0 开始）
editIndex 默认给了 -1，也就是一个不存在的行号，当点击修改按钮时，
再将它置为正确的行号

```javascript
// table-render.vue，部分代码省略
{
  data () {
    return {
      // ...
      editIndex: -1,  // 当前聚焦的输入框的行数
    }
  }
}
```

render 里的 if / else 可以先看 else，因为默认是非编辑状态，
也就是说 editIndex 还是 -1。当点击修改按钮时，把 render 中
第二个参数 { row } 中的各列数据赋值给了之前在 data 中声明的 4 个数据，
这样做是因为之后点击取消按钮时，editName 等值已经修改了，还没有还原，
所以在开启编辑状态的同时，初始化各输入框的值（当然也可以在取消时重置）。
最后再把 editIndex 置为了对应的行序号 { index }，
此时 render 的 if 条件 this.editIndex === index 为真，
编辑列变成了两个按钮：保存和取消。
点击保存，直接修改表格源数据 data 中对应的各字段值，
并将 editIndex 置为 -1，退出编辑状态；
点击取消，不保存源数据，直接退出编辑状态。

在聚焦时（this.editIndex === index），渲染一个 input 输入框，
初始值 value 通过 render 的 domProps 绑定了
row.name（这里也可绑定 editName），并监听了 input 事件，将输入的内容，
实时缓存在数据 editName 中，供保存时使用。
render中绑定的 value 和事件 input 对应就是template中语法糖 v-model

## 补充

一个完整的 Table 组件功能要复杂的多，
比如排序、筛选、列固定、表头固定、表头嵌套

Render 函数虽好，但也是有弊端的，
写出来的 VNode 对象是很难读的，维护性也比 template 差

Div和Table的区别
<https://www.cnblogs.com/lovebear/archive/2012/04/18/2456081.html>
