<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import findComponent from '../utils/assist'
import Emitter from '../mixins/emitter'

export default {
    name: 'iCheckBoxGroup',
    mixins: [Emitter],
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            currentValue: this.value,
            childrens: []
        }
    },
    methods: {
        updateModel (update) {
            this.childrens = findComponent.findComponentsDownward(
                this,
                'iCheckbox'
            )
            if (this.childrens) {
                const { value } = this
                this.childrens.forEach((child) => {
                    child.model = value

                    if (update) {
                        child.currentValue = value.includes(child.label)
                        child.group = true
                    }
                })
            }
        },
        change (data) {
            this.currentValue = data
            this.$emit('input', data)
            this.$emit('on-change', data)
            this.dispatch('iFormItem', 'on-for-change', data)
        },
        mounted () {
            this.updateModel(true)
        },
        watch: {
            value () {
                this.updateModel(true)
            }
        }
    }
}
</script>
