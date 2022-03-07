const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () =>
  Array(151)
  .fill()
  .map((_, index) =>
    fetch(getPokemonUrl(index + 1))
    .then(response => response.json())
  )

const fetchPokemon = () => {
  const pokemonPromises = generatePokemonPromises()

  // for (let i = 1; i <= 151; i++) {
  //   pokemonPromises.push(
  //     fetch(getPokemonUrl(i)).then(response => response.json())
  //   )
  // }

  Promise.all(pokemonPromises).then(pokemons => {
    //console.log(pokemons)

    const divPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)

      accumulator += `
      <div id="pokemon" class="card card-${types[0]} p-1 mb-2 ml-2">
          <div class="p-2 d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column col-7">
              <div class="pokemon-id">#00${pokemon.id}</div>
              <h4 class="pokemon-name">${pokemon.name}</h4>
              <div class="btn btn-type btn-${types[0]}">
                <i class="fa-solid fa-leaf"></i> ${types[0]}
              </div>
              <div class="btn btn-type btn-${types[1]}">
                <i class="fa-solid fa-skull-crossbones"></i> ${types[1]}
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <img
                class="img-fluid w-50"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
              />
            </div>
          </div>
        </div>
      `
      return accumulator
    }, '')

    const div = document.querySelector('[data-js ="pokedex"]')

    div.innerHTML = divPokemons
  })
}

fetchPokemon()