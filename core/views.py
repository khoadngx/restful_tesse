from django.shortcuts import render
from django.http import JsonResponse
import requests

def home(request):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    expdata = response.json()
    return render(request, 'home.html', { 'expdata': expdata })

def search(request):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    expdata = response.json()
    return render(request, 'search.html', { 'expdata': expdata, 'expnum': len(expdata) })

def becomeAnExpert(request):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    expdata = response.json()
    return render(request, 'becomeanexpert.html', { 'expdata': expdata })

def validate_email(request):
    data = {
        'is_correct': 'nothing'
    }
    email = request.GET.get('email', None)
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    jsondata = response.json()
    for i in range(len(jsondata)):
        if jsondata[i]['email'] == email:
            data['is_correct'] = jsondata[i]['name']
            break
    return JsonResponse(data)