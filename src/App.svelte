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

    function pokemonDetails(url) {
        getPokemon(url);
    }

    async function getPokemon(url) {
        pokemonPromise = getJsonFrom(url);
    }

    let pokedexPromise = getPokemonListWithLimitAndOffset(startLimit, startOffset);
    let pokemonPromise;
</script>

<main>
    {#await pokedexPromise}
        <p class="left">...waiting</p>
    {:then pokedex}
        <div class="left">
            <ul>
                {#each pokedex.pokemons as {name, imageUrl, types, weight, abilities, description, evolutions, links}, i}
                    <li>
                        <button on:click={()=>pokemonDetails(links[0].href)}>
                            <img src={imageUrl} alt={name}>
                            <p>{name}</p>
                        </button>
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
                    </li>
                {/each}
            </ul>
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
                <p class="right" style="color: red">{error.message}</p>
            {/await}
        {/if}
    {:catch error}
        <p class="left" style="color: red">{error.message}</p>
    {/await}
</main>

<style>
    .left, .right {
        width: 48%;
        display: inline-block;
    }
</style>