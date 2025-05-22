import { createPinia } from 'pinia'
import { localStoragePlugin } from './plugins/localStorage'

const pinia = createPinia()
pinia.use(localStoragePlugin)

export default pinia 