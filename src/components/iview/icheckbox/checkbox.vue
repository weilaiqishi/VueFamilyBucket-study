<template>
    <label>
        <span>
            <input
                v-if="group"
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="change"
            />
            <input
                v-else
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change"
            />
        </span>
        <slot></slot>
    </label>
</template>

<script>
import Emitter from '../mixins/emitter.js'
import findComponent from '../utils/assist.js'

export default {
    name: 'iCheckbox',
    props: {
        disable: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValues: {
            type: [String, Number, Boolean],
            default: false
        },
        label: {
            type: [String, Number, Boolean]
        }
    },
    data () {
        return {
            currentValue: this.value,
            model: [],
            group: false,
            parent: null
        }
    },
    watch: {
        value (val) {
            if (val === this.trueValue || val === this.falseValue) {
                this.updateModel()
            } else {
                throw TypeError('value should be trueValue or falseValue')
            }
        }
    },
    mixins: [Emitter],
    methods: {
        change (event) {
            if (this.disable) {
                return false
            }
            const checked = event.target.cheked
            this.currentValue = checked

            const value = checked ? this.trueValue : this.falseValues
            this.$emit('input', value)

            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.$emit('on-change', value)
                this.dispatch('iFormItem', 'on-form-change', value)
            }
        },
        updateModel () {
            this.currentValue = this.value === this.trueValue
        }
    },
    mounted () {
        this.parent = findComponent.findComponentUpward(this, 'iCheckboxGroup')

        if (this.parent) {
            this.group = true
        }

        if (this.group) {
            this.parent.updateModel(true)
        } else {
            this.updateModel()
        }
    }
}
</script>
