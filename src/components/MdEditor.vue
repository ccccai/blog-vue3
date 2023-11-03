<template>
    <div ref="toastuiEditor"></div>
</template>
<script lang="ts">
import { defineComponent, watch, onUnmounted, onMounted, ref, reactive } from 'vue'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'prismjs/themes/prism.css'
import Editor from '@toast-ui/editor'
import { editorEvents, defaultOptions } from './MdViewer.vue'

export default defineComponent({
    name: "MdEditor",
    props: {
        initialValue: {
            type: String,
            default: ''
        },
        initialEditType: {
            type: String,
            default: 'markdown'
        },
        previewStyle: {
            type: String,
            default: 'vertical'
        },
        height: {
            type: String,
            default: '600px'
        },
        options: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    setup(props, { emit }) {
        const eventOptions: any = {},
            editor = ref<any>(null),
            options = reactive<any>({
                ...Object.assign(defaultOptions, props.options),
                initialEditType: props.initialEditType,
                initialValue: props.initialValue,
                height: props.height,
                previewStyle: props.previewStyle,
                events: eventOptions,
            }),
            // 声明一个 ref 来存放该元素的引用
            // 必须和模板里的 ref 同名
            toastuiEditor = ref<any>(null)

        editorEvents.forEach((event) => {
            eventOptions[event] = (...args: any) => {
                emit(event, ...args)
            }
        })

        onMounted(() => {
            const initOptions = { ...options, el: toastuiEditor.value }
            editor.value = new Editor(initOptions)

            // 添加监听器，同步父子组件的输入内容
            editor.value.on('change', () => {
                const text = editor.value.getMarkdown()
                if (typeof text === 'string') {
                    emit('input', text)
                }
            })
        })

        onUnmounted(() => {
            if (editor && editor.value) {
                editorEvents.forEach((event) => {
                    editor.value.off(event)
                })
                editor.value.destroy()
            }
        })

        watch(
            () => props.previewStyle,
            (val, oldVal) => {
                if (val !== oldVal) {
                    editor.value.changePreviewStyle(val)
                }
            }
        )
        watch(
            () => props.height,
            (val, oldVal) => {
                if (val !== oldVal) {
                    editor.value.height(val)
                }
            }
        )

        return {
            editor,
            options,
            toastuiEditor
        }
    },
    methods: {
        invoke(methodName: string, ...args: any) {
            let result = null;

            if (this.editor && this.editor[methodName]) {
                result = this.editor[methodName](...args);
            }

            return result
        },
        getRootElement() {
            return this.toastuiEditor
        }
    }
})
</script>
<style lang="less"></style>