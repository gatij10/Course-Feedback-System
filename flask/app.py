import vaderSentiment
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#routes
@app.route('/')
def prit():
    return "Server Started"

@app.route('/api/result',methods=['POST'])
def generate_score():
    if request.method == 'POST':
    
        data = request.get_json()
        print(data)
        feedback = data['feedback']
        print(feedback)

        analyser = SentimentIntensityAnalyzer()
        score = analyser.polarity_scores(feedback)

        print(score)
        score = score['compound']

        return jsonify(score)


if __name__ == '__main__':
    app.run(port=8080)