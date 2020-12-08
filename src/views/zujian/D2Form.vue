<template>
    <div>
        <d2Form
            :formTemplate="form.formTemplate"
            :formData="form.formData"
            style="
                margin: 0 auto;
                width: 900px;
                height: 600px;
                overflow-y: auto;
            "
        ></d2Form>
    </div>
</template>

<script>
import d2Form from '@/components/d2Form/BaseForm.vue'
import MyRender from '@/components/d2Form/testRender.vue'

export default {
    components: {
        d2Form,
    },
    data () {
        return {
            form: {
                formTemplate: {
                    input: {
                        title: 'input',
                        component: {
                            name: 'el-input'
                        }
                    },
                    inputNumber: {
                        title: 'inputNumber',
                        component: {
                            name: 'el-input-number'
                        }
                    },
                    radio: {
                        title: 'radio',
                        component: {
                            name: 'el-radio',
                            options: [
                                {
                                    value: 'option1',
                                    label: 'option1'
                                },
                                {
                                    value: 'option2',
                                    label: 'option2'
                                },
                            ]
                        }
                    },
                    checkbox: {
                        title: 'checkbox',
                        component: {
                            name: 'el-checkbox',
                            options: [
                                {
                                    value: 'option1',
                                    label: 'option1'
                                },
                                {
                                    value: 'option2',
                                    label: 'option2'
                                }
                            ]
                        }
                    },
                    select: {
                        title: 'select',
                        component: {
                            name: 'el-select',
                            options: [
                                {
                                    value: 'option1',
                                    label: 'option1'
                                },
                                {
                                    value: 'option2',
                                    label: 'option2'
                                }
                            ]
                        }
                    },
                    cascader: {
                        title: 'cascader',
                        component: {
                            name: 'el-cascader',
                            options: [
                                {
                                    value: 'zhinan',
                                    label: '指南',
                                    children: [{
                                        value: 'shejiyuanze',
                                        label: '设计原则',
                                        children: [{
                                            value: 'yizhi',
                                            label: '一致'
                                        }, {
                                            value: 'fankui',
                                            label: '反馈'
                                        }]
                                    }]
                                }
                            ]
                        }
                    },
                    switch: {
                        title: 'switch',
                        component: {
                            name: 'el-switch',
                            'active-text': '按月付费',
                            'inactive-text': '按年付费',
                            'active-color': '#13ce66',
                            'inactive-color': '#ff4949',
                        }
                    },
                    slider: {
                        title: 'slider',
                        component: {
                            name: 'el-slider',
                            range: true,
                            'show-stops': true,
                            max: 10
                        },
                    },
                    timeSelect: {
                        title: 'titleSelect',
                        component: {
                            name: 'el-time-select',
                            'picker-options': {
                                start: '08:30',
                                step: '00:15',
                                end: '18:30'
                            }
                        }
                    },
                    timePicker: {
                        title: 'timePicker',
                        component: {
                            name: 'el-time-picker',
                            'is-range': true,
                            'range-separator': '至',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            placeholder: '选择时间范围'
                        }
                    },
                    datePicker: {
                        title: 'datePicker',
                        component: {
                            name: 'el-date-picker',
                            type: 'daterange',
                            'range-separator': '至',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            'picker-options': {
                                shortcuts: [{
                                    text: '最近一周',
                                    onClick (picker) {
                                        const end = new Date()
                                        const start = new Date()
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                                        picker.$emit('pick', [start, end])
                                    }
                                }, {
                                    text: '最近一个月',
                                    onClick (picker) {
                                        const end = new Date()
                                        const start = new Date()
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                                        picker.$emit('pick', [start, end])
                                    }
                                }]
                            }
                        }
                    },
                    rate: {
                        title: 'rate',
                        component: {
                            name: 'el-rate'
                        }
                    },
                    colorPicker: {
                        title: 'colorPicker',
                        component: {
                            name: 'el-color-picker'
                        }
                    },
                    render: {
                        title: 'render',
                        component: {
                            name: MyRender,
                            model: {
                                props: 'num',
                                event: 'add'
                            }
                        },

                    }
                },
                formData: {
                    input: 'i am user input',
                    inputNumber: 100,
                    radio: 'option2',
                    checkbox: ['option2'],
                    select: 'option2',
                    cascader: ['zhinan', 'shejiyuanze', 'fankui'],
                    switch: true,
                    slider: [4, 8],
                    timeSelect: '',
                    timePicker: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                    datePicker: '',
                    rate: 3.7,
                    colorPicker: null,
                    render: 1
                }
            },

        }
    }
}
</script>
