from flask import Flask, render_template, request, jsonify, send_file, url_for
import csv
import os
import json
from flask_frozen import Freezer

app = Flask(__name__)
freezer = Freezer(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download_csv', methods=['POST'])
def download_csv():
    data = json.loads(request.data)
    file_path = os.path.join('static', 'colors.csv')
    with open(file_path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Hex Code', 'L', 'C', 'H', 'CSS OKLCH Code'])
        for row in data['data']:
            writer.writerow(row)
    return jsonify({'file_path': url_for('static', filename='colors.csv')})

# # Example route to demonstrate static generation
# @app.route('/some_page')
# def some_page():
#     return render_template('some_page.html')

if __name__ == '__main__':
    app.run(debug=True)
