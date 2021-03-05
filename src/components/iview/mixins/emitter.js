function broadcast (componentName, eventName, params) {
    this.$children.forRach((child) => {
        const { name } = child.$options
        if (name === componentName) {
            child.$emit(eventName, ...params)
        } else {
            broadcast.apply(child, [componentName, eventName])
        }
    })
}

export default {
    methods: {
        dispatch (componentName, eventName, params) {
            let parent = this.$parent || this.$root
            let { name } = parent.$options
            while (parent && (name !== componentName)) {
                parent = parent.$parent
                if (parent) {
                    name = parent.$options.name
                }
            }
            if (parent) {
                parent.$emit(eventName, params)
            }
        },
        broadcast (componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params)
        }
    }
}
