from flask import Blueprint, jsonify, request, send_file
import os
from services.data_service import DataService

analytics_bp = Blueprint('analytics', __name__)
data_service = DataService()

@analytics_bp.route('/export-csv', methods=['GET'])
def export_csv():
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_path = os.path.join(script_dir, 'dataset', 'airbnb_realistic_dataset.csv')
    return send_file(dataset_path, as_attachment=True)

@analytics_bp.route('/stats', methods=['GET'])
def get_stats():
    return jsonify(data_service.get_stats())

@analytics_bp.route('/room-types', methods=['GET'])
def get_room_types():
    return jsonify(data_service.get_room_types())

@analytics_bp.route('/neighborhood-prices', methods=['GET'])
def get_neighborhood_prices():
    return jsonify(data_service.get_neighborhood_prices())

@analytics_bp.route('/availability', methods=['GET'])
def get_availability():
    return jsonify(data_service.get_availability())

@analytics_bp.route('/reviews-analysis', methods=['GET'])
def get_reviews_analysis():
    return jsonify(data_service.get_reviews_analysis())

@analytics_bp.route('/listings', methods=['GET'])
def get_listings():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    search = request.args.get('search', '')
    min_price = request.args.get('min_price', 0, type=float)
    max_price = request.args.get('max_price', 10000, type=float)
    sort_by = request.args.get('sort_by', 'price')
    sort_desc = request.args.get('sort_desc', 'true').lower() == 'true'
    
    data = data_service.get_listings(page, limit, search, min_price, max_price, sort_by, sort_desc)
    return jsonify(data)
