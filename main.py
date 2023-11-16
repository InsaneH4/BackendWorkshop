from flask import Flask, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
# allows us to use cross origin resource sharing
CORS(app)
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    # change password depending on whos using it
    password="password",
    database="test"

)

stylus = mydb.cursor()


@app.route('/hello')
def hello():
    print("Hello, World!")
    return 'Hello, World!'


@app.route('/load', methods=['GET', 'POST'])
def load():
    stylus.execute("SELECT * FROM recipes")
    recipes = stylus.fetchall()
    return recipes


@app.route('/add', methods=['GET', 'POST'])
def add():
    # get data from fetch request body
    print("Adding recipe...")
    data = request.get_json()
    ingredients = data['ingredients']
    name = data['name']
    print("Recipe: " + name)
    print("Ingredients: " + str(ingredients))

    # push to database
    # daniel code here...
    # Adding new Recipe to Database
    command = "INSERT INTO recipes (name, ingred1, ingred2, ingred3, ingred4, ingred5) VALUES (%s, %s, %s, %s, %s, %s)"
    data = (name, ingredients[0], ingredients[1],
            ingredients[2], ingredients[3], ingredients[4])
    stylus.execute(command, data)

    mydb.commit()
    record = stylus.fetchall()
    print(record)

    return 'Data received!'


if __name__ == '__main__':
    app.run()
