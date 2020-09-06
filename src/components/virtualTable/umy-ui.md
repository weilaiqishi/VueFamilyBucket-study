# 虚拟表格

## 官网

<https://www.umyui.com/>

npm install umy-ui

## 按需引入

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
npm install babel-plugin-component -D
然后，将 .babelrc 中plugins添加：
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "umy-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
在 main.js 中

```javascript
import { UTable, UTableColumn } from 'umy-ui';
import App from './App.vue';

Vue.component(UTable.name, UTable);
Vue.component(UTableColumn.name, UTableColumn);
/* 或写为
 * Vue.use(UTable)
 * Vue.use(UTableColumn)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```
