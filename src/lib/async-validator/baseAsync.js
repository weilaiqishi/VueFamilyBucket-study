// 基础用法——同步用法
const AsyncValidator = require('async-validator').default

const descriptor = {
    // name字段的校验规则
    name: {
        type: 'string',
        required: true,
        validator (rule, value) {
            return value === 'muji'
        },
        message: '输入错误'
    }
}

const validator = new AsyncValidator(descriptor)

validator.validate({ name: 'muji' }, (errors, fields) => {
    if (errors) {
        // 校验不通过 do something
        console.log(false)
    }
    // 校验通过 do something
    console.log(true)
})

/*
validator(rule, value, callback) {
    // 设定校验规则，返回true则通过，反之不通过
      return value === "muji"
    // 当校验失败时，也可以返回一个Error对象，此时失败的提示信息为Error参数
    return new Error(`${value} is not equal to 'test'.`);
    // 此时校验错误提示信息为 muji is not equal to 'test'
  }

//rule参数为一个对象，包含校验字段的信息以及校验规则
  {
    field: "name", // 字段名称
    fullField: "name",
    message: "输入错误", // 校验失败时的提示信息
    required: true, // 是否必选
    type: "string", // 是否为string类型
    validator: ƒ validator(rule, value, callback)
  }

// value  字段的值
  "muji"

// callback 回调函数
*/

/*
Validate
function(source, [options], callback): Promise

source: 需要校验的对象（必选）。
options: 描述校验的处理选项的对象（可选）。
callback: 当校验完成时调用的回调函数（必选）

该方法将返回一个 Promise 对象，如下:
then()，校验通过
catch({ errors, fields })，校验失败，errors 是一个所有 error 组成的数组；field 是一个对象，键是 field，值是对应的 errors 数组。

// callback参数解析 共两个参数
(errors, fields) => {}
// errors 校验失败时返回一个所有 error 组成的数组,[{message: "输入错误", field: "name"}]，校验成功则errors值为null
// fields 校验失败时返回一个对象,{name:[{message: "输入错误", field: "name"}]},校验成功则fileds值为null
*/
