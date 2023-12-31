<!--
 * @Author: caishiyin
 * @Date: 2023-09-19 15:03:41
 * @LastEditTime: 2023-11-15 03:21:41
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/MdViewer.vue
-->
<template>
    <div ref="toastuiEditorViewer"></div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, onMounted, ref, reactive } from 'vue'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'prismjs/themes/prism.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import Prism from 'prismjs'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'

export const editorEvents = [
    'load',
    'change',
    'caretChange',
    'focus',
    'blur',
    'keydown',
    'keyup',
    'beforePreviewRender', // 在使用html字符串渲染markdown预览之前的钩子函数
    'beforeConvertWysiwygToMarkdown', // 在使用markdown文本将wysiwyg转换为markdown之前的钩子函数
]
export const defaultOptions = {
    minHeight: '600px',
    language: 'zh_CN',
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    placeholder: '本编辑器支持Markdown编辑。',
    useCommandShortcut: true, // 是否使用键盘快捷键执行命令
    usageStatistics: false, // 将主机名发送到Google Analytics
    hideModeSwitch: true, // 隐藏模式切换选项卡栏
    toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        // // Using Option: Customize the last button
        // [{
        //     el: createLastButton(),
        //     command: 'bold',
        //     tooltip: 'Custom Bold'
        // }]
    ]
}
export default defineComponent({
    name: "MdViewer",
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
            default: 'tab'
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
            toastuiEditorViewer = ref<any>(null)

        editorEvents.forEach((event) => {
            eventOptions[event] = (...args: any) => {
                emit(event, ...args)
            };
        })

        onMounted(() => {
            const initOptions = { ...options, el: toastuiEditorViewer.value }
            editor.value = new Viewer(initOptions)
        })

        onUnmounted(() => {
            if (editor && editor.value) {
                editorEvents.forEach((event) => {
                    editor.value.off(event)
                })
                editor.value.destroy()
            }
        })

        return {
            editor,
            options,
            toastuiEditorViewer
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
            return this.toastuiEditorViewer
        }
    }
})
</script>
<style lang="less"></style>