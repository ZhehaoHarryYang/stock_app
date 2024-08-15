from flask import Flask
from flask_cors import CORS
from controllers.stocks_controller import stocks_bp
from controllers.users_controller import user_controller
from controllers.user_stocks_controller import favorites_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://zhehaoharryyang.github.io/stock_app"]}})

app.register_blueprint(stocks_bp, url_prefix='/api')
app.register_blueprint(user_controller, url_prefix='/api')
app.register_blueprint(favorites_bp, url_prefix='/api')

if __name__ == '__main__':
    # Listen on all interfaces (0.0.0.0) and use port 8000
    app.run(host='0.0.0.0', port=8000, debug=True)
