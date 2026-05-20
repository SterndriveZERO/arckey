from flask import Flask, redirect, render_template, url_for

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("intro.html")


@app.route("/shop")
def shop():
    return render_template("shop.html")

@app.route("/home")
def main():
    return render_template("home.html")

@app.route('/products/arckey')
def arckey():
    return render_template('arckey.html')

if __name__ == "__main__":
    app.run(debug=True)