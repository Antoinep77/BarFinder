from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_socketio import join_room, leave_room


app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

@app.route('/')
def respond():
    print("get")
    return "aa"

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('message')
def handle_my_custom_event(data):
    print('received my event: ' + str(data))
    socketio.emit('msg', data, callback=messageReceived)


if __name__ == '__main__':
    socketio.run(app, debug=True)