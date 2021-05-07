// 基础用法——异步用法
const AsyncValidator = require('async-validator').default

const descriptor = {
    age: {
        type: 'number',
        asyncValidator (rule, value) {
            return new Promise((resolve, reject) => {
                if (value < 18) {
                    // reject 不通过校验，reject返回的信息为校验未通过的提示
                    reject('too young')
                } else {
                    // resolve 通过校验
                    resolve()
                }
            })
        }
    }
}

const validator = new AsyncValidator(descriptor)

validator
    .validate({ age: 16 })
    .then(() => {
        // 校验通过 do something
        console.log(true)
    })
    .catch(({ errors, fields }) => {
        // 校验不通过 do something
        console.log('validator false -> errors, fields -> ', errors, fields)
    })

/*
// 参数同validator
asyncValidator(rule, value) {
  return new Promise((resolve, reject) => {
    if (value < 18) {
      // reject 不通过校验，reject返回的信息为校验未通过的提示
      reject("too young")
    } else {
      // resolve 通过校验
      resolve()
    }
  })
}
// ajax异步调用
asyncValidator(rule, value, callback) {
  ajax({
    url: 'xx',
    value: value,
  }).then(function(data) {
    callback();
  }, function(error) {
    callback(new Error(error));
  });
}
*/
