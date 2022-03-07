function searchPokemon(){
  const input = document.getElementById('searchbar').value.toLowerCase();
  const cardContainer = document.getElementById('pokemon-card')

  const cards = cardContainer.getElementsByClassName('card')

  for(let i = 0; i < cards.length; i++){
    let title = cards[i].querySelector('h4.pokemon-name')
    let pokeId = cards[i].querySelector('div.pokemon-id')

    if(title.innerText.toLowerCase().indexOf(input) > -1 || pokeId.innerText.indexOf(input) > -1 ){
      cards[i].style.display = ""
    } else {
      cards[i].style.display = "none"

    }
  }
}
