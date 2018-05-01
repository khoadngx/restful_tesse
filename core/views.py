from django.shortcuts import render
from django.http import JsonResponse
import requests

def home(request):
    usersession = 'nothing'
    if request.session.get('user'):
        usersession = request.session.get('user')
    return render(request, 'home.html', { 'usersession': usersession })

def search(request):
    usersession = 'nothing'
    if request.session.get('user'):
        usersession = request.session.get('user')
    response = requests.get('http://192.168.43.242:3000/tesse/expert')
    expdata = response.json()
    jsdata = []
    expskill = []
    for i in range(len(expdata)):
        jsdata.append(expdata[i]['IdExpert'])
    for i in range(len(jsdata)):
        res = requests.get('http://192.168.43.242:3000/tesse/expert_skill/' + jsdata[i])
        expskill.append(res.json())
    return render(request, 'search.html', { 
        'expdata': expdata, 
        'expnum': len(expdata), 
        'jsdata': jsdata,
        'expskill': expskill,
        'usersession': usersession,
        })

def becomeAnExpert(request):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    expdata = response.json()
    return render(request, 'becomeanexpert.html', { 'expdata': expdata })

def validate_login(request):
    data = {
        'is_correct': '',
        'session': '',
    }
    email = request.GET.get('email', None)
    pwd = request.GET.get('pwd', None)
    response = requests.get('http://192.168.43.242:3000/tesse/users/all')
    jsondata = response.json()
    for i in range(len(jsondata)):
        if str(jsondata[i]['IdUser']) == str(email) and str(jsondata[i]['Password']) == str(pwd) :
            data['is_correct'] = 1
            request.session['user'] = jsondata[i]['FName']
            data['session'] = request.session['user']
            break
    return JsonResponse(data)

def validate_email(request):
    data = {
        'is_taken': ''
    }
    email = request.GET.get('email', None)
    response = requests.get('http://192.168.43.242:3000/tesse/users/all')
    jsondata = response.json()
    for i in range(len(jsondata)):
        if str(jsondata[i]['IdUser']) == str(email):
            data['is_taken'] = 1
            break
    return JsonResponse(data)

def logout(request):
    data = {
        'is_success': ''
    }
    check = request.GET.get('check', None)
    if(check):
        del request.session['user']
        data['is_success'] = 1
    return JsonResponse(data)