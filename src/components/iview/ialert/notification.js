// notification.js
import Vue from 'vue'
import Alert from './alert.vue'

Alert.Notification = (properties) => {
    const props = properties || {}
    const Instance = new Vue({
        data: props,
        render (h) {
            return h(Alert, {
                props
            })
        }
    })
    const component = Instance.$mount()
    document.body.appendChild(component.$el)
    const alert = Instance.$children[0]
    console.log('Alert Instance -> ', Instance)
    console.log(Instance.$options.render)
    return {
        add (noticeProps) {
            alert.add(noticeProps)
        },
        remove (name) {
            alert.remove(name)
        }
    }
}

export default Alert
