from django.shortcuts import render
from django.http import HttpResponse
from mapapp import pyrebase_settings
from pyrebase_settings import db, auth







# Create your views here.
def index(request):
	return render(request,'map2/index.html')

def science(request):
	return render(request,'map2/science.html')
#pyrebase stuff
def get_users(request):
    users = db.child("users").get()
    return render(request, 'users.html', {'users': users.val()})

def signup(request):
   form = SignupForm(request.POST)
   if form.is_valid():
       email = form.cleaned_data('email')
       password = form.cleaned_data('password')
       auth.create_user_with_email_and_password(email, password)
