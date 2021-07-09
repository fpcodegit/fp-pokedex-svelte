<script>
    export let baseUrl;
    export let startLimit;
    export let startOffset;

    async function getPokemonListWithLimitAndOffset(limit, offset) {
        let url = baseUrl + '?limit=' + limit + '&offset=' + offset;
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

    function getLink(links, rel) {
        return links.filter(link => link.rel === rel)[0].href
    }

    function getPokemonDetails(pokemon) {
        pokemonDetail = pokemon;
    }

    function getPokemonList(links, rel) {
        return () => pokedexPromise = getJsonFrom(getLink(links, rel));
    }

    let pokedexPromise = getPokemonListWithLimitAndOffset(startLimit, startOffset);
    let pokemonDetail;
</script>

<div class="container">
    {#await pokedexPromise}
        <p class="left">...waiting</p>
    {:then pokedex}
        <div class="left">
            <div>
                {#each pokedex.pokemons as {name, imageUrl, types, weight, abilities, description, evolutions, links}, i}
                    <button class="card" on:click={getPokemonDetails(pokedex.pokemons[i])}>
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
    {:catch error}
        <p class="left error">{error.message}</p>
    {/await}
    {#if pokemonDetail !== undefined}
        <div class="right">
            <h1>{pokemonDetail.name}</h1>
            <img src={pokemonDetail.imageUrl} alt={pokemonDetail.name}>
            <p>{pokemonDetail.description}</p>
            <p>Types:</p>
            <ul>
                {#each pokemonDetail.types as {}, i}
                    <li>
                        <p>{i + 1} : {pokemonDetail.types[i]}</p>
                    </li>
                {/each}
            </ul>
            <p>Weight: {pokemonDetail.weight} <b>hg</b></p>
            <p>Abilities:</p>
            <ul>
                {#each pokemonDetail.abilities as {}, i}
                    <li>
                        <p>{i + 1} : {pokemonDetail.abilities[i]}</p>
                    </li>
                {/each}
            </ul>
            <p>Evolutions:</p>
            <ul>
                {#each pokemonDetail.evolutions as {}, i}
                    <li>
                        <p>{i + 1} : {pokemonDetail.evolutions[i]}</p>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
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