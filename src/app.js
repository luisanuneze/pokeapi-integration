//Declaring global variables
const urlPokeapi = "https://pokeapi.co/api/v2/pokemon?limit=100";
const allPokemonContainer = document.querySelector("#container");

// Get the modal
var modal = document.getElementById("myModal");

var pokemonList = [];

// Get the button that opens the modal
var closeButton = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
    closeModal()
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal()
    }
}

function closeModal() {
    modal.style.display = "none";
    document.querySelector('.modal-content .inner').innerHTML = ''
}

const pokeStyleTypesObj = {
    normal: 'pokemon__normal',
    water: 'pokemon__water',
    electric: 'pokemon__electric',
    fighting: 'pokemon__fighting',
    ground: 'pokemon__ground',
    psychic: 'pokemon__psychic',
    rock: 'pokemon__rock',
    dark: 'pokemon__dark',
    steel: 'pokemon__steel',
    fire: 'pokemon__fire',
    grass: 'pokemon__grass',
    ice: 'pokemon__ice',
    poison: 'pokemon__poison',
    flying: 'pokemon__flying',
    bug: 'pokemon__bug',
    ghost: 'pokemon__ghost',
    dragon: 'pokemon__dragon',
    fairy: 'pokemon__fairy'
}

var pokemonData = document.getElementById("poke__container");

function individualContainers(pokeData) {
    //Main div
    const pokemonContainer = document.createElement("div");
    pokemonContainer.classList.add('poke__container');
    pokemonContainer.dataset.pokemonNameData = pokeData.name.toLowerCase();

    //Pokemon name
    pokemonContainer.innerText = `${pokeData.name}`;
    allPokemonContainer.appendChild(pokemonContainer);

    //Opens the pop up
    pokemonContainer.style.cursor = 'pointer'; // css
    pokemonContainer.onclick = function() {
        modal.style.display = "block";
        //Shows data
        document.getElementById('pokemonName').innerText = pokeData.name;
        document.getElementById('pokemonImg').src = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;

        //Pokemon types
        const pokeTypesDiv = document.createElement("div")
        pokeTypesDiv.classList.add('poke__types__div')
        const typesArray = pokeData.types.map(({ type }) => (type.name));
        typesArray.forEach(type => {
            //Individual box for types
            const pokeTypes = document.createElement("div") //divTypes
            pokeTypes.classList.add('pokemon__types')
            pokeTypes.innerText = type;

            //Gets types
            pokeTypes.classList.add(pokeStyleTypesObj[type]);
            pokeTypesDiv.appendChild(pokeTypes);
        });
        document.querySelector('.modal-content .inner').appendChild(pokeTypesDiv)

        //weightHeightDiv
        const weightHeightDiv = document.createElement("div");
        weightHeightDiv.classList.add('weightHeightDiv')

        //Height
        const pokeHeightLabel = document.createElement("p");
        pokeHeightLabel.classList.add('poke__height__label')
        pokeHeightLabel.innerText = 'Height';

        const height = document.createElement("p");
        height.classList.add('height')
        height.innerText = `${pokeData.height} ft`;

        const heightDiv = document.createElement("div");
        heightDiv.classList.add('height__div')
        heightDiv.appendChild(pokeHeightLabel);
        heightDiv.appendChild(height);
        heightDiv.classList.add('heightDiv')
        weightHeightDiv.appendChild(heightDiv);

        //Weight
        const pokeWeightLabel = document.createElement("p");
        pokeWeightLabel.classList.add('poke__weight__label')
        pokeWeightLabel.innerText = 'Weight';

        const weight = document.createElement("p");
        weight.classList.add('weight')
        weight.innerText = `${pokeData.weight} kg`;

        const weightDiv = document.createElement("div");
        weightDiv.classList.add('weight__div')
        weightDiv.appendChild(pokeWeightLabel);
        weightDiv.appendChild(weight);
        weightDiv.classList.add('weightDiv')
        weightHeightDiv.appendChild(weightDiv);

        document.querySelector('.modal-content .inner').appendChild(weightHeightDiv)

        //Moves
        const pokeMovesLabel = document.createElement("p");
        pokeMovesLabel.classList.add('poke__moves__label')
        pokeMovesLabel.innerText = 'Moves';
        document.querySelector('.modal-content .inner').appendChild(pokeMovesLabel)

        const pokeMoves = document.createElement("p")
        pokeMoves.classList.add('pokemon__moves')
        pokeMoves.innerText = pokeData.moves.map(({ move }) => (move.name)).join(", ");
        document.querySelector('.modal-content .inner').appendChild(pokeMoves)
    }

    //Shows all pokemon data
    const infoInsideModal = document.createElement("div");
    infoInsideModal.classList.add('info_Inside')
    infoInsideModal.innerText = `${pokeData.name}`;

    //Shows the images
    const pokeImgContainer = document.createElement("div");
    const pokeImg = document.createElement("img");
    pokeImg.src = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
    pokeImg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
    pokeImg.sizes = "(max-width: 600px) 480px";
    pokeImgContainer.appendChild(pokeImg);
    pokemonContainer.appendChild(pokeImgContainer);

    //Creates div for individual ability
    const divAb = document.createElement('p');
    divAb.classList.add('h2Ab');
    divAb.innerText = 'Abilities';

    const pokeAbility = document.createElement("div") //divAbility
    pokeAbility.classList.add('pokemon__category')
    pokeAbility.innerText = pokeData.abilities.map(({ ability }) => (ability.name)).join(", ");

    //Pokemon types
    const pokeTypesDiv = document.createElement("div")
    pokeTypesDiv.classList.add('poke__types__div')
    const typesArray = pokeData.types.map(({ type }) => (type.name));
    typesArray.forEach(type => {

        //Individual box for types
        const pokeTypes = document.createElement("div") //divTypes
        pokeTypes.classList.add('pokemon__types')
        pokeTypes.innerText = type;

        pokeTypes.classList.add(pokeStyleTypesObj[type]);
        pokeTypesDiv.appendChild(pokeTypes);
    });

    pokemonContainer.appendChild(pokeTypesDiv);
    pokemonContainer.appendChild(divAb);
    pokemonContainer.appendChild(pokeAbility);
}

//Fetching json with pokemon, it retrieves an array with all pokemon url
async function fetchingAllPokemon() {

    // function onSuccess(response) {
    //     if (response.ok) {
    // console.log(response);
    //         return response.json();
    //     } else {
    //         console.log("Failed");
    //     }
    // }

    // async function onSuccessSuccess(data) {
    //     for (const pokemon of data.results) {
    //         const pokeData = await fetchingPokemonData(pokemon);
    //         individualContainers(pokeData);
    //     }
    // }

    // const response = await fetch(urlPokeapi);
    // const data = await onSuccess(response);
    // onSuccessSuccess(data);

    await fetch(urlPokeapi)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Failed");
            }
        })
        .then(async(data) => {
            for (const pokemon of data.results) {
                const pokeData = await fetchingPokemonData(pokemon);
                individualContainers(pokeData);
                pokemonList.push(pokeData)
            }
        });

    const nameForm = document.querySelector('.search-box')
    nameForm.addEventListener('input', Event => {
        Event.preventDefault()
        const term = Event.target.value.toLowerCase()
        const elements = document.querySelectorAll('.poke__container');

        elements.forEach((element) => {

            element.classList.remove("hide");
            if (!element.dataset.pokemonNameData.includes(term)) {
                element.classList.add("hide");
            }
        });
    })
}

//Fetch to get individual pokemon information
async function fetchingPokemonData(pokemon) {
    let url = pokemon.url;
    const pokeData = await fetch(url).then((response) => response.json())
    return pokeData;
}

fetchingAllPokemon();
