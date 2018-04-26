from django.shortcuts import render
from django.http import JsonResponse
import requests

def home(request):
    status = "nothing"
    if request.session.test_cookie_worked():
        status = "The test cookie worked!!!"
        request.session.delete_test_cookie()
    return render(request, 'home.html', { 'status': status })

def search(request):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    expdata = response.json()
    return render(request, 'search.html', { 'expdata': expdata, 'expnum': len(expdata) })

def becomeAnExpert(request):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    expdata = response.json()
    return render(request, 'becomeanexpert.html', { 'expdata': expdata })

def validate_login(request):
    data = {
        'is_correct': '',
        'username': ''
    }
    email = request.GET.get('email', None)
    pwd = request.GET.get('pwd', None)
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    jsondata = response.json()
    for i in range(len(jsondata)):
        if str(jsondata[i]['email']) == str(email) and str(jsondata[i]['id']) == str(pwd) :
            data['is_correct'] = 1
            data['username'] = jsondata[i]['name']
            break
    return JsonResponse(data)

def validate_email(request):
    data = {
        'is_taken': ''
    }
    email = request.GET.get('email', None)
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    jsondata = response.json()
    for i in range(len(jsondata)):
        if str(jsondata[i]['email']) == str(email):
            data['is_taken'] = 1
            break
    return JsonResponse(data)