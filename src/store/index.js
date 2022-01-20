/**
 * how to ues store
 * import { pinia } from '@store/index.js
 * const store = store.useCommonStore()
 */
export const pinia = (() => {
  const modules = import.meta.globEager('./modules/*.js');
  const stores = {}
  for (const module in modules) {
    if (modules.hasOwnProperty(module)) {
      const store = modules[module];
      Object.assign(stores, store);
    }
  }
  return stores;
})()