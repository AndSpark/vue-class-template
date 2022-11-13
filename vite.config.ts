import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vue3-oop/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'~app': resolve(__dirname, './src/app'),
			'~assets': resolve(__dirname, './src/assets'),
			'~environments': resolve(__dirname, './src/environments'),
			'~components': resolve(__dirname, './src/app/components'),
			'~modules': resolve(__dirname, './src/app/modules'),
			'~pages': resolve(__dirname, './src/app/pages'),
			'~utils': resolve(__dirname, './src/app/utils'),
		},
	},
})
