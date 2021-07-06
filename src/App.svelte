<script>
    export let startLimit;
    export let startOffset;

    async function getPokemonListWithLimitAndOffset(limit, offset) {
        let url = 'http://localhost:8080/pokedex?limit=' + limit + '&offset=' + offset;
        return getJsonFrom(url);
    }

    async function getJsonFrom(url) {
        const res = await fetch(url);
        const json = await res.json();

        if (res.ok) {
            return json;
        } else {
            throw new Error(json);
        }
    }

    async function getPokemon(url) {
        pokemonPromise = getJsonFrom(url);
    }

    function getLink(links, rel) {
        return links.filter(link => link.rel === rel)[0].href
    }

    function getPokemonDetails(links) {
        return () => getPokemon(getLink(links, 'self'));
    }

    function getPokemonList(links, rel) {
        return () => pokedexPromise = getJsonFrom(getLink(links, rel));
    }

    let pokedexPromise = getPokemonListWithLimitAndOffset(startLimit, startOffset);
    let pokemonPromise;
</script>

<div class="container">
    {#await pokedexPromise}
        <p class="left">...waiting</p>
    {:then pokedex}
        <div class="left">
            <div>
                {#each pokedex.pokemons as {name, imageUrl, types, weight, abilities, description, evolutions, links}, i}
                    <button class="card" on:click={getPokemonDetails(links)}>
                        <img src={imageUrl} alt={name}>
                        <p>{name}</p>
                        <p>Types:</p>
                        <ul>
                            {#each types as {}, i}
                                <li>
                                    <p>{i + 1} : {types[i]}</p>
                                </li>
                            {/each}
                        </ul>
                        <p>Weight: {weight} <b>hg</b></p>
                        <p>Abilities:</p>
                        <ul>
                            {#each abilities as {}, i}
                                <li>
                                    <p>{i + 1} : {abilities[i]}</p>
                                </li>
                            {/each}
                        </ul>
                    </button>
                {/each}
            </div>
            <div>
                <button on:click={getPokemonList(pokedex.links,'prev')}>Prev</button>
                <button on:click={getPokemonList(pokedex.links,'next')}>Next</button>
            </div>
        </div>
        {#if pokemonPromise !== undefined}
            {#await pokemonPromise}
                <p class="right">...loading</p>
            {:then pokemon}
                <div class="right">
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.imageUrl} alt={pokemon.name}>
                    <p>{pokemon.description}</p>
                    <p>Types:</p>
                    <ul>
                        {#each pokemon.types as {}, i}
                            <li>
                                <p>{i + 1} : {pokemon.types[i]}</p>
                            </li>
                        {/each}
                    </ul>
                    <p>Weight: {pokemon.weight} <b>hg</b></p>
                    <p>Abilities:</p>
                    <ul>
                        {#each pokemon.abilities as {}, i}
                            <li>
                                <p>{i + 1} : {pokemon.abilities[i]}</p>
                            </li>
                        {/each}
                    </ul>
                    <p>Evolutions:</p>
                    <ul>
                        {#each pokemon.evolutions as {}, i}
                            <li>
                                <p>{i + 1} : {pokemon.evolutions[i]}</p>
                            </li>
                        {/each}
                    </ul>
                </div>
            {:catch error}
                <p class="right error">{error.message}</p>
            {/await}
        {/if}
    {:catch error}
        <p class="left error">{error.message}</p>
    {/await}
</div>

<style>
    .left, .right {
        width: 48%;
    }

    .error {
        color: red;
    }

    .container {
        width: 100%;
        display: inline-flex;
    }

    .card {
        border-radius: 2.5%;
        margin: 1%;
        background: transparent;
        height: 50%;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
</style>