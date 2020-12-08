<template>
    <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        v-bind="formOptions"
    >
        <el-row v-bind="formOptions">
            <template v-for="(value, key, index) in formData">
                <el-col
                    :key="index"
                    v-if="formTemplate[key].component.show || true"
                    :span="formTemplate[key].component.span || 24"
                    :offset="formTemplate[key].component.offset || 0"
                >
                    <el-form-item :label="formTemplate[key].title" :prop="key">
                        <el-input
                            v-if="
                                formTemplate[key].component.name === 'el-input'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-input>
                        <el-input-number
                            v-else-if="
                                formTemplate[key].component.name ===
                                'el-input-number'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-input-number>
                        <el-radio-group
                            v-else-if="
                                formTemplate[key].component.name === 'el-radio'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                            <template
                                v-if="formTemplate[key].component.buttonMode"
                            >
                                <el-radio-button
                                    v-for="option in formTemplate[key]
                                        .component.options"
                                    :key="option.value"
                                    :label="option.value"
                                >
                                    {{ option.label }}
                                </el-radio-button>
                            </template>
                            <template v-else>
                                <el-radio
                                    v-for="option in formTemplate[key]
                                        .component.options"
                                    :key="option.value"
                                    :label="option.value"
                                >
                                    {{ option.label }}
                                </el-radio>
                            </template>
                        </el-radio-group>
                        <el-checkbox-group
                            v-else-if="
                                formTemplate[key].component.name ===
                                'el-checkbox'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                            <template
                                v-if="formTemplate[key].component.buttonMode"
                            >
                                <el-checkbox-button
                                    v-for="option in formTemplate[key]
                                        .component.options"
                                    :key="option.value"
                                    :label="option.value"
                                >
                                    {{ option.label }}
                                </el-checkbox-button>
                            </template>
                            <template v-else>
                                <el-checkbox
                                    v-for="option in formTemplate[key]
                                        .component.options"
                                    :key="option.value"
                                    :label="option.value"
                                >
                                    {{ option.label }}
                                </el-checkbox>
                            </template>
                        </el-checkbox-group>
                        <el-select
                            v-else-if="
                                formTemplate[key].component.name === 'el-select'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                            <el-option
                                v-for="option in formTemplate[key].component
                                    .options"
                                :key="option.value"
                                v-bind="option"
                            >
                            </el-option>
                        </el-select>
                        <el-cascader
                            v-else-if="
                                formTemplate[key].component.name ===
                                'el-cascader'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-cascader>
                        <el-switch
                            v-else-if="
                                formTemplate[key].component.name === 'el-switch'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-switch>
                        <el-slider
                            v-else-if="
                                formTemplate[key].component.name === 'el-slider'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-slider>
                        <el-time-select
                            v-else-if="
                                formTemplate[key].component.name ===
                                'el-time-select'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-time-select>
                        <el-time-picker
                            v-else-if="
                                formTemplate[key].component.name ===
                                'el-time-picker'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-time-picker>
                        <el-date-picker
                            v-else-if="
                                formTemplate[key].component.name ===
                                'el-date-picker'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-date-picker>
                        <el-rate
                            v-else-if="
                                formTemplate[key].component.name === 'el-rate'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-rate>
                        <el-color-picker
                            v-else-if="
                                formTemplate[key].component.name ===
                                'el-color-picker'
                            "
                            v-model="formData[key]"
                            v-bind="formTemplate[key].component"
                            @change="
                                $emit('form-data-change', {
                                    key: key,
                                    value: value,
                                })
                            "
                        >
                        </el-color-picker>
                        <render-custom-component
                            v-else-if="formTemplate[key].component.name"
                            v-model="formData[key]"
                            :component-name="formTemplate[key].component.name"
                            :props="
                                formTemplate[key].component.props
                                    ? formTemplate[key].component.props
                                    : null
                            "
                            v-bind="formTemplate[key].component"
                        >
                        </render-custom-component>
                        <render-component
                            v-else-if="formTemplate[key].component.render"
                            :render-function="
                                formTemplate[key].component.render
                            "
                            :scope="formData[key]"
                            v-bind="formTemplate[key].component"
                        >
                        </render-component>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>

<script>
import renderComponent from './renderComponent.vue'
import renderCustomComponent from './renderCustomComponent.vue'

export default {
    name: 'd2-form',
    components: {
        renderComponent,
        renderCustomComponent
    },
    props: {
        formTemplate: {
            default: null
        },
        formOptions: {
            default: null
        },
        formRules: {
            default: null
        },
        formData: {
            default: null
        },
    }
}
</script>
