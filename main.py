from flask import Flask, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
# allows us to use cross origin resource sharing
CORS(app)
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
)

print(mydb)


@app.route('/hello')
def hello():
    print("Hello, World!")
    return 'Hello, World!'


@app.route('/submit', methods=['GET', 'POST'])
def submit():
    # get data from fetch request body
    data = request.get_json()
    ingredients = data['ingredients']
    name = data['name']
    print("Recipe: " + name)
    print("Ingredients: " + str(ingredients))
    # push to database
    return 'Data received!'


if __name__ == '__main__':
    app.run()
