from flask import Flask
from flask_cors import CORS
from controllers.stocks_controller import stocks_bp
from controllers.users_controller import user_controller
from controllers.user_stocks_controller import favorites_bp

app = Flask(__name__)

# Allow requests from localhost:3000 and your GitHub Pages domain
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "https://ZhehaoHarryYang.github.io/stock_app", "https://desired-abnormally-wombat.ngrok-free.app/api", "https://desired-abnormally-wombat.ngrok-free.app", "https://ZhehaoHarryYang.github.io", ]}})

app.register_blueprint(stocks_bp, url_prefix='/api')
app.register_blueprint(user_controller, url_prefix='/api')
app.register_blueprint(favorites_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
