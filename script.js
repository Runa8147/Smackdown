
const superheroesData = [
  {
    "name": "Spider-Man (Peter Parker)",
    "image_url": "data/spiderman.jpeg",
    "elo_rating": 1700
  },
  {
    "name": "Iron Man (Tony Stark)",
    "image_url": "data/tony.jpeg",
    "elo_rating": 1700
  },
  {
    "name": "Captain America (Steve Rogers)",
    "image_url": "data/captain.jpeg",
    "elo_rating": 1700
  },
  {
      "name": "Wolverine",
      "image_url": "data/wolverine.jpeg",
      "elo_rating": 1700
  },
  {
      "name": "Doctor Strange",
      "image_url": "data/doctor.jpeg",
      "elo_rating": 1700
  },
  {
      "name": "Superman",
      "image_url": "data/superman.jpeg",
      "elo_rating": 1700
  },
  {
      "name": "Black Widow",
      "image_url": "data/black.jpeg",
      "elo_rating": 1700
  },
  {
      "name": "Loki",
      "image_url": "data/loki.jpeg",
      "elo_rating": 1700
  }
];

function displayBattle() {
  const hero1 = superheroesData[Math.floor(Math.random() * superheroesData.length)];
  let hero2 = superheroesData[Math.floor(Math.random() * superheroesData.length)];
  while (hero2 === hero1) {
    hero2 = superheroesData[Math.floor(Math.random() * superheroesData.length)];
  }

  document.getElementById('hero1').children[0].textContent = hero1.name;
  document.getElementById('hero1').children[1].src = hero1.image_url;
  document.getElementById('hero2').children[0].textContent = hero2.name;
  document.getElementById('hero2').children[1].src = hero2.image_url;
}


document.getElementById('vote-hero1').addEventListener('click', () => {
  const winnerName = document.getElementById('hero1').children[0].textContent;
  const loserName = document.getElementById('hero2').children[0].textContent;
  const winner = superheroesData.find(hero => hero.name === winnerName);
  const loser = superheroesData.find(hero => hero.name === loserName);
  alert(`Vote recorded! ${winnerName} defeats ${loserName}.`);
  recordVote(winner, loser);
});

document.getElementById('vote-hero2').addEventListener('click', () => {
  const winnerName = document.getElementById('hero2').children[0].textContent;
  const loserName = document.getElementById('hero1').children[0].textContent;
  const winner = superheroesData.find(hero => hero.name === winnerName);
  const loser = superheroesData.find(hero => hero.name === loserName);
  alert(`Vote recorded! ${winnerName} defeats ${loserName}.`);
  recordVote(winner, loser);
});

function recordVote(winner, loser) {
  fetch('/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ winner: winner, loser: loser })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Vote recorded:', data.message);
    // Update displayed Elo ratings based on response data
    document.getElementById('hero1').children[2].textContent = `Elo: ${data.winner_elo}`;  // Assuming Elo displayed after name and image
    document.getElementById('hero2').children[2].textContent = `Elo: ${data.loser_elo}`;  // Assuming Elo displayed after name and image
  })
  .catch(error => console.error('Error recording vote:', error));
}


// Call displayBattle function to show initial superheroes
displayBattle();
