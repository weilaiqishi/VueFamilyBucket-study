# slot-scope

常规的 slot 无法实现对组件循环体的每一项进行不同的内容分发
作用域 slot（slot-scope），能够在组件的循环体中做内容分发

## 现 slot-scope 自定义列模板

如果你的组件层级简单，推荐用第一种方案
在 columns 的列配置 column 中，新增一个字段 slot 来指定 slot-scope 的名称

```vue template
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col, index) in columns" :key="index">
          <template v-if="'render' in col">
            <Render :row="row" :column="col" :index="rowIndex" :render="col.render"></Render>
          </template>
          <template v-else-if="'slot' in col">
            <slot :row="row" :column="col" :index="rowIndex" :name="col.slot"></slot>
          </template>
          <template v-else>{{ row[col.key] }}</template>
        </td>
      </tr>
```

另一种方案，当 Table 的功能足够复杂，层级会嵌套的比较深
通过inject注入了父级组件 table.vue（下文改写） 中提供的实例 tableRoot
