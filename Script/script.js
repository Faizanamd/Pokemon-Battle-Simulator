

async function fetchRandomPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const pokemonURL = data.results[randomIndex].url;
    const pokemonResponse = await fetch(pokemonURL);
    const pokemonData = await pokemonResponse.json();
    console.log(pokemonData);
    return pokemonData;
}



function displayPokemon(playerId, playerName, playerScoreValue) {
    return new Promise(async (resolve) => {
      const pokemon = await fetchRandomPokemon();
  
      const playerConatiner = document.getElementById(`player${playerId}`);
      const playerNameElement = document.getElementById(`p${playerId}_name`);
      playerNameElement.textContent = playerName;
      const playerScore = document.getElementById(`p${playerId}_score`);
      playerScore.textContent = playerScoreValue;
      const Playercard = document.getElementById(`card${playerId}`);
  
      Playercard.textContent = '';
  
      const divImg = document.createElement('div');
      divImg.id = 'img';
  
      const imgTag = document.createElement('img');
      imgTag.src = pokemon.sprites.front_default;
      divImg.appendChild(imgTag);
      Playercard.appendChild(divImg);
  
      const nameSpan = document.createElement('span');
      nameSpan.id = 'name';
      nameSpan.textContent = `Name: ${pokemon.name}`;
      Playercard.appendChild(nameSpan);
  
      const experienceSpan = document.createElement('span');
      experienceSpan.id = 'experience';
      experienceSpan.textContent = `Experience: ${pokemon.base_experience}`;
      Playercard.appendChild(experienceSpan);
  
      const listOfAbilities = document.createElement('ul');
      listOfAbilities.id = 'abilities';
  
      if (pokemon && pokemon.abilities && Array.isArray(pokemon.abilities)) {
        pokemon.abilities.forEach((ability) => {
          const abilityItem = document.createElement('li');
          abilityItem.textContent = ability.ability.name;
          listOfAbilities.appendChild(abilityItem);
        });
      } else {
        console.error('Invalid or missing abilities data in the pokemon object.');
      }
  
      Playercard.appendChild(listOfAbilities);
      playerConatiner.appendChild(Playercard);
  
      resolve(pokemon.base_experience);
    });
  }


  let player1Score = 0;
let player2Score = 0;

  document.getElementById('fight').addEventListener('click', async () => {
    const [player1Experience, player2Experience] = await Promise.all([
      displayPokemon(1, 'Alice', player1Score),
      displayPokemon(2, 'Faizan', player2Score),
    ]);
  
    const player1ScoreElement = document.getElementById('p1_score');
    const player2ScoreElement = document.getElementById('p2_score');
  
    const winner = player1Experience > player2Experience ? 'Player 1' : 'Player 2';
  
    if (winner === 'Player 1') {
      player1Score++; // Increment player 1's score
      player1ScoreElement.textContent = `Score: ${player1Score}`;
    } else {
      player2Score++; // Increment player 2's score
      player2ScoreElement.textContent = `Score: ${player2Score}`;
    }
  });
  