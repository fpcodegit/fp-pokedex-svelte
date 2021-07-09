import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		baseUrl: 'https://pokedex-java-3.herokuapp.com/pokedex',
		startLimit: 10,
		startOffset: 0
	}
});

export default app;