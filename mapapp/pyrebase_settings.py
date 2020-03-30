import pyrebase
import firebase_admin



config= {
	'apiKey': "AIzaSyDe3MPSZFmvWPaHTYbSyD8OarQU3ixbeno",
    'authDomain': "mapapp-f047b.firebaseapp.com",
    'databaseURL': "https://mapapp-f047b.firebaseio.com",
    'projectId': "mapapp-f047b",
    'storageBucket': "mapapp-f047b.appspot.com",
    'messagingSenderId': "762270761712",
    'appId': "1:762270761712:web:c6acdfb3dd6ec47c427835",
    'measurementId': "G-2ZM05508KD"
}

#default_app = firebase_admin.initialize_app()

firebase = pyrebase.initialize_app(config)

#cred = credentials.RefreshToken('path/to/refreshToken.json')
#default_app = firebase_admin.initialize_app(cred)
# authenticate a user
auth = firebase.auth()
user = auth.sign_in_with_email_and_password("email@usedforauthentication.com", "FstrongPasswordHere")


db = firebase.database()