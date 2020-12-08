import { routes } from '@/router/index.js'

function recursive (route) {
    const obj = {
        path: route.path.includes('/') ? route.path : `/${route.path}`,
        title: route.name.toUpperCase(),
        icon: 'el-icon-eleme'
    }
    const children = route.children ? route.children.reduce((acc, cur) => {
        acc.push(recursive(cur))
        return acc
    }, []) : null
    children && (obj.children = children)
    return obj
}

export default routes.reduce((acc, cur) => {
    acc.push(recursive(cur))
    return acc
}, [])
