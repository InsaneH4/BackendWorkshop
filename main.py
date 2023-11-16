from flask import Flask, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
# allows us to use cross origin resource sharing
CORS(app)
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="KnightShack",
    database = "test"

)

stylus = mydb.cursor();

print(mydb)


@app.route('/hello')
def hello():
    print("Hello, World!")
    return 'Hello, World!'


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
    command = "INSERT INTO test (name, ingred1, ingred2, ingred3) VALUES (%s, %s, %s, %s)"
    data = (name, ingredients[0], ingredients[1],ingredients[2] )
    stylus.execute(command, data);

    mydb.commit()


    return 'Data received!'


@app.route('/search', methods=['GET', 'POST'])
def search():
    print("Searching for recipes...")
    data = request.get_json()
    ingredients = data['ingredients']
    name = data['name']
    print("Recipe: " + name)
    print("Ingredients: " + str(ingredients))

    # query database for recipie with same name or ingredients
    # daniel code here...
    # Searching to An Ingredient
    command = "SELECT * FROM test WHERE ingred1 = %s OR ingred2 = %s OR  ingred3 = %s ORDER BY name"
    data = (ingredients[0], ingredients[0], ingredients[0])
    stylus.execute(command,data)

    mydb.commit()

    record = stylus.fetchall()


    return 'Search results!'


if __name__ == '__main__':
    app.run()
