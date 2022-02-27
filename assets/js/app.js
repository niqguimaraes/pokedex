const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () =>
  Array(151)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then(response => response.json())
    )

const fetchPokemon = () => {
  const pokemonPromises = generatePokemonPromises()

  // for (let i = 1; i <= 151; i++) {
  //   pokemonPromises.push(
  //     fetch(getPokemonUrl(i)).then(response => response.json())
  //   )
  // }

  Promise.all(pokemonPromises).then(pokemons => {
    console.log(pokemons)

    const divPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)

      accumulator += `
      <div class="card card-${types[0]} p-1 mb-2">
          <div class="p-2 d-flex align-items-center">
            <div class="col d-flex flex-column">
              <div>#00${pokemon.id}</div>
              <h4>${pokemon.name}</h4>
              <div class="btn btn-type btn-${types[0]}">
                <i class="fa-solid fa-leaf"></i> ${types[0]}
              </div>
              <div class="btn btn-type btn-${types[1]}">
                <i class="fa-solid fa-skull-crossbones"></i> ${types[1]}
              </div>
            </div>
            <div class="col d-flex">
              <img
                class="img-fluid"
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
