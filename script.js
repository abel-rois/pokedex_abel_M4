const pokeApi = 'https://pokeapi.co/api/v2/pokemon/';
const form = document.getElementById('poke-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokeList = document.getElementById('poke-card');

searchButton.addEventListener('click', searchPokemon);
form.addEventListener('submit', searchPokemon);

function searchPokemon(event) {
    event.preventDefault();
    const pokemonSelect = searchInput.value.trim().toLowerCase();
    fetch(`${pokeApi}${pokemonSelect}`)
    .then(response => {
        if (response.status === 404) {
            alert('Pokémon no disponible, intenta de nuevo');
        } else {
            return response.json()

        }
    })

    .then(data => {
        pokeList.innerHTML = ''
            const pokeCard = document.createElement('div')
            pokeCard.classList.add('poke-card')
            const statsList = data.stats.map(stat => {
                return `<li>${stat.stat.name}: ${stat.base_stat}</li>`;
            }).join("");
            pokeCard.innerHTML = `
                    <h3>${data.name}</h3>
                    <img src='${data.sprites.other.dream_world.front_default}' height= 130px width= 160px/>
                    <h5>Número: ${data.id}</h5>
                    <h5>Tipo: ${data.types.map(type => type.type.name).join(", ")}</h5>                    
                    <h5>Estadísticas:</h5>
                    <p>${statsList}</p>

                `
                pokeList.appendChild(pokeCard)
        })
        
    }


