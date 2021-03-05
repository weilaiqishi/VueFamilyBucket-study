# 树形控件——Tree

Tree 组件是递归类组件的典型代表，它常用于文件夹、组织架构、
生物分类、国家地区等等，世间万物的大多数结构都是树形结构。
使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

* 节点可以无限延伸（递归）；
* 可以展开 / 收起子节点；
* 节点可以选中，选中父节点，它的所有子节点也全部被选中，同样，反选父节点，其所有子节点也取消选择；
* 同一级所有子节点选中时，它的父级也自动选中，一直递归判断到根节点。

## API

Tree 是典型的数据驱动型组件，所以节点的配置就是一个 data，
里面描述了所有节点的信息
示例数据

```javascript
data: [
  {
    title: 'parent 1',
    expand: true,
    children: [
      {
        title: 'parent 1-1',
        expand: true,
        children: [
          {
            title: 'leaf 1-1-1'
          },
          {
            title: 'leaf 1-1-2'
          }
        ]
      },
      {
        title: 'parent 1-2',
        children: [
          {
            title: 'leaf 1-2-1'
          },
          {
            title: 'leaf 1-2-1'
          }
        ]
      }
    ]
  }
]
```

每个节点的配置（props：data）描述如下：

* title：节点标题（本例为纯文本输出，可参考 Table 的 Render 或 slot-scope 将其扩展）；
* expand：是否展开直子节点。开启后，其直属子节点将展开；
* checked：是否选中该节点。开启后，该节点的 Checkbox 将选中；
* children：子节点属性数组。
  
如果一个节点没有 children 字段，那它就是最后一个节点，
这也是递归组件终结的判断依据。

同时再提供一个是否显示多选框的 props：showCheckbox，
以及两个 events：

* on-toggle-expand：展开和收起子列表时触发；
* on-check-change：点击复选框时触发。

## 入口 tree.vue

两个组件 tree.vue 和 tree-node.vue
tree.vue 是组件的入口，用于接收和处理数据，并将数据传递给 tree-node.vue
tree-node.vue 就是一个递归组件，它构成了每一个节点，
即一个可展开 / 关闭的按钮（+或-）、一个多选框（Checkbox 组件）、
节点标题以及递归的下一级节点

tree.vue 主要负责两件事：
1.定义了组件的入口，即组件的 API；
2.对接收的数据 props：data 初步处理，为了在 tree.vue 中不破坏
使用者传递的源数据 data，所以会克隆一份数据（cloneData）。

在组件 created 时（以及 watch 监听 data 改变时），
调用了 rebuildData 方法克隆源数据，并赋值给了 cloneData。

在 template 中，先是渲染了一个 tree-node.vue 组件，
这一级是 Tree 的根节点，因为 cloneDate 是一个数组，
所以这个根节点不一定只有一项，有可能是并列的多项。
不过这里使用的 tree-node.vue 还没有用到 Vue.js 的递归组件，
它只处理第一级根节点。

## 递归组件tree-node.vue

tree-node组件接收两个 props：

* showCheckbox：与 tree.vue 的 showCheckbox 相同，只是进行传递；
* data：node.vue 接收的 data 是一个 Object 而非 Array，
因为它只负责渲染当前的一个节点，并递归渲染下一个子节点
（即 children），所以这里对 cloneData 进行循环，
将每一项节点数据赋给了 tree-node

tree-node 节点包含 4 个部分：

* 展开与关闭的按钮（+或-）；
* 多选框；
* 节点标题；
* 递归子节点。

props：data 包含了当前节点的所有信息，比如是否展开子节点
（expand）、是否选中（checked）、子节点数据（children）等。

如果当前节点不含有子节点，也就是没有 children 字段或
children 的长度是 0，那就说明当前节点已经是最后一级节点，
所以不含有展开 / 收起的按钮。

多选框直接使用了第 7 节的 Checkbox 组件（单用模式），
这里将 prop: value 和事件 @input 分开绑定，
没有使用 v-model 语法糖。value 绑定的数据 data.checked
表示当前节点是否选中，在点击多选框时，handleCheck 方法会修改
data.checked 数据，下文会分析。这里之所以不使用 v-model
而是分开绑定，是因为 @input 里要额外做一些处理，
不是单纯的修改数据。

name 已经指定为 TreeNode，而这个终结递归的条件，就是
v-for="(item, index) in data.children"，当 data.children
不存在或为空数组时，自然就不会继续渲染子节点，递归也就停止了。
这里的 v-if="data.expand" 并不是递归组件的终结条件，它的用处是判断
当前节点的子节点是否展开（渲染），如果当前节点不展开，那它所有的
子节点也就不会展开（渲染）。

点击 + 号时，会展开直属子节点，点击 - 号关闭，这功能只需在 handleExpand 中修改 data 的 expand 数据即可，
同时，我们通过 Tree 的根组件（tree.vue）触发一个自定义事件 @on-toggle-expand
在 tree-node.vue 中，通过 findComponentUpward 向上找到了
Tree 的实例，并调用它的 emitEvent 方法来触发自定义事件 @on-toggle-expand
之所以使用 findComponentUpward 寻找组件，而不是用 $parent，
是因为当前的 tree-node.vue，它的父级不一定就是 tree.vue，
因为它是递归组件，父级有可能还是自己。

整个 Tree 组件最复杂的一部分，就是处理节点的响应状态
树组件是有上下级关系的，它们分为两种逻辑，当选中（或取消选中）
一个节点时：

* 它下面的所有子节点都会被选中；
* 如果同一级所有子节点选中时，它的父级也自动选中，
  一直递归判断到根节点。

第 1 个逻辑相对简单，当选中一个节点时，只要递归地遍历
它下面所属的所有子节点数据，修改所有的 checked 字段即可

第 2 个逻辑，它的难点在于，无法通过当前节点拿它的父节点
我们就可以通过 watch 来监听当前节点的子节点是否都选中，
进而修改当前的 checked 字段
在 watch 中，监听了 data.children 的改变，并且是深度监听的

