import type { App } from 'vue';
import { setupfocusDirective } from './focus';

export function setupGlobDirectives(app: App) {
  setupfocusDirective(app);
}