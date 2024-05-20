import type { Directive, App } from 'vue';

const focusDirective: Directive = {
  mounted(el, binding) {
    el.focus()
    console.log(el, binding);
  }
}

export function setupfocusDirective(app: App) {
  app.directive('focus', focusDirective);
}

export default focusDirective;
