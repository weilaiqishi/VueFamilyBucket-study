// 由一个组件,向上找到最近的指定组件
function findComponentUpward (context, componentName) {
    let parent = context.$parent
    let { name } = parent.$options

    while (parent && (name !== componentName)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }

    return parent
}

// 由一个组件，向上找到所有的指定组件
function findComponentsUpward (context, componentName) {
    const parents = []
    const parent = context.$parent

    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent)
        return parents.concat(findComponentsUpward(parent, componentName))
    }
    return []
}

// 由一个组件，向下找到最近的指定组件
function findComponentDownward (context, componentName) {
    const childrens = context.$children
    let children = null

    if (childrens.length) {
        for (const child of childrens) {
            const { name } = child.$options

            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentDownward(child, componentName)
                if (children) break
            }
        }
    }
    return children
}

// 由一个组件，向下找到所有指定的组件
function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child)
        const foundChilds = findComponentsDownward(child, componentName)
        return components.concat(foundChilds)
    }, [])
}

// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents (context, componentName, exceptMe = true) {
    const res = context.$parent.$children.filter((item) => item.$options.name === componentName)
    if (exceptMe) {
        const index = res.findIndex((item) => item._uid === context._uid)
        res.splice(index, 1)
    }
    return res
}

function deepCopy (target) {
    if (typeof target !== 'object' || target === null) { return target }
    const map = new WeakMap()
    const root = {
        result: null,
        target,
    }
    const loopList = [root]
    root.result = Array.isArray(root.target) ? [] : {}
    map.set(root.target, {
        data: root.result,
        time: 1
    })
    // 循环数组
    while (loopList.length) {
        const node = loopList.pop()
        Reflect.ownKeys(node.target).forEach((key) => {
            const value = node.target[key]
            if (typeof value !== 'object' || value === null) {
                node.result[key] = value
            } else {
                let cache = map.get(value)
                if (cache) {
                    cache.time++
                    node.result[key] = cache.data
                } else {
                    cache = {
                        data: node.result[key],
                        time: 1,
                    }
                    node.result[key] = Array.isArray(value) ? [] : {}
                    loopList.push({
                        result: node.result[key],
                        target: value,
                    })
                }
                map.set(value, cache)
            }
        })
    }
    return root.result
}

export default {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents,
    deepCopy
}

export { findComponentUpward }
export { findComponentsUpward }
export { findComponentDownward }
export { findComponentsDownward }
export { findBrothersComponents }
export { deepCopy }
