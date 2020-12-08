# d2form 基于 element-ui 表单组件

这里只截取d2crud中js描述表单的功能

## 其他产品

<https://github.com/greper/d2-crud-plus>
<https://github.com/dream2023/vue-ele-form>

## 使用

form-template
说明: 表单数据模板，具体配置请参考 <https://d2.pub/zh/doc/d2-crud-v2/add-template.html>
类型: Object
可选值: 无
默认值: 无

form-options
说明: 表单配置数据，具体配置请参考 <https://d2.pub/zh/doc/d2-crud-v2/form-options.html>
类型: Object
可选值: 无
默认值: 无

form-rules
说明: 表单校验，具体校验规则请参考 <https://github.com/yiminghe/async-validator>
类型: Object
可选值: 无
默认值: 无

form-data

## 解释

```html
<d2Form :formTemplate="form.formTemplate" :formData="form.formData"></d2Form>
 ```

 formData传一个对象 d2form直接修改formData的属性不会触发props报错
