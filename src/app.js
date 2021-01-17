//Declaring global variables
const urlPokeapi = "https://pokeapi.co/api/v2/pokemon?limit=10";
const allPokemonContainer = document.querySelector("#container");

// Get the modal
var modal = document.getElementById("myModal");

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
    dragon: 'pokemon__dragon'
}

var pokemonData = document.getElementById("poke__container");

function individualContainers(pokeData) {
    //Main div
    const pokemonContainer = document.createElement("div");
    pokemonContainer.classList.add('poke__container');

    //Pokemon name
    pokemonContainer.innerText = `${pokeData.name}`;
    allPokemonContainer.appendChild(pokemonContainer);

    //Opens the pop up
    pokemonContainer.style.cursor = 'pointer';
    pokemonContainer.onclick = function() {
        modal.style.display = "block";
        //Shows data
        document.getElementById('pokemonName').innerText = pokeData.name;
        document.getElementById('pokemonImg').src = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;

        //types of pokemon
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

        const pokeHeightLabel = document.createElement("p");
        pokeHeightLabel.classList.add('poke__height__label')
        pokeHeightLabel.innerText = 'Height';
        document.querySelector('.modal-content .inner').appendChild(pokeHeightLabel)

        const height = document.createElement("p");
        height.classList.add('height')
        height.innerText = `${pokeData.height} ft`;
        document.querySelector('.modal-content .inner').appendChild(height)

        const pokeWeightLabel = document.createElement("p");
        pokeWeightLabel.classList.add('poke__weight__label')
        pokeWeightLabel.innerText = 'Weight';
        document.querySelector('.modal-content .inner').appendChild(pokeWeightLabel)

        const weight = document.createElement("p");
        weight.classList.add('weight')
        weight.innerText = `${pokeData.weight} kg`;
        document.querySelector('.modal-content .inner').appendChild(weight)

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

    //Creates div for individual ability
    const pokeAbility = document.createElement("div") //divAbility
    pokeAbility.classList.add('pokemon__category')
    pokeAbility.innerText = pokeData.abilities.map(({ ability }) => (ability.name)).join(", ");

    //Creates div for held_items
    const pokeItems = document.createElement("div")
    pokeItems.classList.add('poke__items')
    pokeItems.innerText = pokeData.held_items.map(({ held_items }) => (held_items.name)).join(", ");

    //Hierarchy
    pokeImgContainer.appendChild(pokeImg);
    pokemonContainer.appendChild(pokeImgContainer);

    //types of pokemon
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
    const divAb = document.createElement('p');
    divAb.classList.add('h2Ab');
    divAb.innerText = 'Abilities';
    pokemonContainer.appendChild(divAb);

    //pokeItems to container
    pokemonContainer.appendChild(pokeItems);
    //pokeAbility to container
    pokemonContainer.appendChild(pokeAbility);
}

//Fetching json with 10 pokemon, it retrieves an array with all pokemon url
async function fetchingAllPokemon() {
    // const allPromise = fetch(urlPokeapi); //Ticket

    // function onSuccess(response) {
    //     if (response.ok) {
    //         // console.log("success");
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

    // // allPromise.then(onSuccess).then(onSuccessSuccess);
    // const response = await fetch(urlPokeapi); //allPromise
    // const data = await onSuccess(response);
    // onSuccessSuccess(data);

    fetch(urlPokeapi)
        .then((response) => {
            if (response.ok) {
                console.log("success");
                return response.json();
            } else {
                console.log("Failed");
            }
        })
        .then(async(data) => {
            for (const pokemon of data.results) {
                const pokeData = await fetchingPokemonData(pokemon);
                individualContainers(pokeData);
            }
        });
}

//Fetch to get individual pokemon information
async function fetchingPokemonData(pokemon) {
    let url = pokemon.url;
    const pokeData = await fetch(url).then((response) => response.json())

    return pokeData;
}

fetchingAllPokemon();