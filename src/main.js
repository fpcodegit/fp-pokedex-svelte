import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		startLimit: 10,
		startOffset: 0
	}
});

export default app;