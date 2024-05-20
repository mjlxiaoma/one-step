import type { Directive, App } from 'vue';

const loadingDirective: Directive = {

  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) { },
  mounted(el, binding) {
    el.focus()
    console.log(el, binding);
  },
  beforeUpdate(el, binding, vnode, prevVnode) { },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) { },
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) { },
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) { }
}

export function setupfocusDirective(app: App) {
  app.directive('loading', loadingDirective);
}

export default loadingDirective;
