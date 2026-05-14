from flask import Flask, jsonify
from flask_cors import CORS
from routes.analytics_routes import analytics_bp

def create_app():
    app = Flask(__name__)
    CORS(app) # Enable CORS for all routes

    app.register_blueprint(analytics_bp, url_prefix='/api')

    @app.route('/', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'Airbnb Analytics API is running'})
        
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'error': 'Internal server error'}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
