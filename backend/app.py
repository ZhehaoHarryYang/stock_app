# app.py

from flask import Flask
from flask_cors import CORS
from controllers.stocks_controller import stocks_bp
from controllers.users_controller import user_controller
from controllers.user_stocks_controller import favorites_bp


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(stocks_bp, url_prefix='/api')
app.register_blueprint(user_controller, url_prefix='/api')
app.register_blueprint(favorites_bp, url_prefix='/api')


if __name__ == '__main__':
    app.run(debug=True)
