<script>
export default {
    name: 'render-custom-component',
    props: {
        /**
         * @description v-model双向绑定的值
         */
        value: {
            required: true
        },
        /**
         * @description 传入的组件名
         */
        componentName: {
            required: true
        },
        /**
         * @description 传入的自定义参数
         */
        props: {
            default: null
        },
        /**
         * @description 传入的行数据
         */
        scope: {
            default: null
        },
        model: {
            default () {
                return {}
            }
        }
    },
    render (h) {
        const self = this
        const props = {
            scope: self.scope,
            ...self.props
        }
        props[self.model.props || 'value'] = self.value
        const on = {}
        on[self.model.event || 'input'] = function onEvent (event) {
            self.$emit('input', event)
        }
        return h(self.componentName, {
            props,
            on
        })
    }
}
</script>
