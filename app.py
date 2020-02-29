from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

# from pymongo import MongoClient
# client = MongoClient('localhost',27017)
# db = client.dbparking


# HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')

# @app.route('/test', methods=['POST'])
# def favorite():
#     parking = request.form['title_give']
#     # print(title_receive)
#     return jsonify({'result':'success', 'msg': '이 요청은 POST!'})


if __name__ == '__main__':
    app.run('0.0.0.0',port=5000, debug=True)