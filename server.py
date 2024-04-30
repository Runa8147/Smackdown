from flask import Flask, request, jsonify
import json
from operator import itemgetter

app = Flask(__name__)

# Assuming superhero data is loaded from a separate JSON file (replace with your data source)
superheroes = None

def load_superheroes():
  global superheroes
  with open('data/superheroes.json',"r" ) as f:
    superheroes = json.load(f)

@app.route('/vote', methods=['POST'])
def record_vote():
  if not superheroes:
    load_superheroes()

  data = request.get_json()
  winner_name = data['winner']['name']
  loser_name = data['loser']['name']

  # Find winner and loser objects using hero names (implement error handling for missing names)
  winner = next((hero for hero in superheroes if hero['name'] == winner_name), None)
  loser = next((hero for hero in superheroes if hero['name'] == loser_name), None)

  if not winner or not loser:
    return jsonify({'message': 'Error: Invalid hero names'}), 400

  # Update wins and losses (implement Elo rating update logic here)
  winner['wins'] = winner.get('wins', 0) + 1
  loser['losses'] = loser.get('losses', 0) + 1

  # Save updated data (implement logic to save data to JSON file or database)
  with open('data/superheroes.json', 'w') as f:
    json.dump(superheroes, f)

  # Consider returning relevant data in the response (e.g., updated Elo ratings)
  return jsonify({'message': 'Vote recorded successfully!'})

@app.route('/rankings')
def get_rankings():
  if not superheroes:
    load_superheroes()

  # Sort superheroes based on Elo rating (descending order) with wins as a tiebreaker
  sorted_heroes = sorted(superheroes, key=itemgetter('elo_rating'), reverse=True)
  return jsonify(sorted_heroes)

if __name__ == '__main__':
  load_superheroes()  # Load data on application startup
  app.run(debug=True)
