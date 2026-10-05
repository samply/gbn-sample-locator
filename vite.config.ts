import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// Set SVELTE_CONFIG=pub to build for deployment under the /search base path
const configFile = process.env.SVELTE_CONFIG || 'base';

if (configFile === 'pub') {
	console.log('Running pub build');
}

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter(),
			...(configFile === 'pub' && { paths: { base: '/search' } })
		})
	]
});
