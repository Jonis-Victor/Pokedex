const pokemonName = document.querySelector('.pokemonName')
const pokemonNumber = document.querySelector('.pokemonNumber')
const pokemonImage = document.querySelector('.pokemonImage')
const pokemonType = document.querySelector('.pokemonType')

const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status === 200) {
    const result = await APIResponse.json()
    return result
  }
}
const renderPokemon = async pokemon => {
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''

  const result = await fetchPokemon(pokemon)
  if (result) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = result.name
    pokemonNumber.innerHTML = result.id
    pokemonType.innerHTML = result.types[0].type.name
    pokemonImage.src =
      result['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    input.value = ''
    searchPokemon = result.id
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found :c'
    pokemonNumber.innerHTML = ''
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
