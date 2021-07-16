
// fetchPokemon();
const poke_container = document.getElementById('poke_container');
const poke_ablty = document.getElementById('test');
const pokemons_number = 50;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');

	pokemonEl.classList.add('pokemon');
   
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
    const image = pokemon.sprites['front_default']
    const poke_weight =pokemon.weight;
	
	pokemonEl.style.backgroundColor = color;
 


	const pokeInnerHTML = `
        <div class="img-container">
            <img src="${image}"/>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
            <small class="type"> <p>Weight:${poke_weight}</p></small>
            <h4>Abilities</h4>
            
<div class="abilities">${pokemon.abilities.map((ability) => {
        return `<p>${ability.ability.name}</p>`;
    }).join("")}
   
    </div>
    <h4>Moves</h4>
    <div class="moves">${pokemon.moves.map((move) => {
        return `<p>${move.move.name}</p>`;
    }).join("")}
    
    </div>
        </div>   `;

	pokemonEl.innerHTML = pokeInnerHTML;
 
	poke_container.appendChild(pokemonEl);
 
}

fetchPokemons();


