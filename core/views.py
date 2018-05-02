from django.shortcuts import render
from django.http import JsonResponse
import requests

def home(request):
    usrid = ''
    usersession = ''
    currentusr = {}
    if request.session.get('usrid'):
        usrid = request.session.get('usrid')
        usersession = request.session.get('user')
    response = requests.get('http://192.168.43.242:3000/tesse/users/all')
    usrdata = response.json()
    for i in range(len(usrdata)):
        if str(usrdata[i]['IdUser']) == str(usrid):
            currentusr = usrdata[i]
    return render(request, 'home.html', { 
        'usersession': usersession, 
        'usrid': usrid,
        'currentusr': currentusr,
        })

def search(request):
    usrid = ''
    usersession = ''
    currentusr = {}
    if request.session.get('usrid'):
        usrid = request.session.get('usrid')
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
    response = requests.get('http://192.168.43.242:3000/tesse/users/all')
    usrdata = response.json()
    for i in range(len(usrdata)):
        if str(usrdata[i]['IdUser']) == str(usrid):
            currentusr = usrdata[i]
    return render(request, 'search.html', { 
        'expdata': expdata, 
        'expnum': len(expdata), 
        'jsdata': jsdata,
        'expskill': expskill,
        'usersession': usersession,
        'usrid': usrid,
        'currentusr': currentusr,
        })

def becomeAnExpert(request):
    usrid = ''
    usersession = ''
    currentusr = {}
    if request.session.get('usrid'):
        usrid = request.session.get('usrid')
        usersession = request.session.get('user')
    response = requests.get('http://192.168.43.242:3000/tesse/users/all')
    usrdata = response.json()
    for i in range(len(usrdata)):
        if str(usrdata[i]['IdUser']) == str(usrid):
            currentusr = usrdata[i]
    response = requests.get('http://192.168.43.242:3000/tesse/career')
    career = response.json()
    return render(request, 'becomeanexpert.html', { 
        'usersession': usersession, 
        'usrid': usrid,
        'currentusr': currentusr,
        'career': career
        })

def manageAppointment(request):
    usrid = ''
    usersession = ''
    currentusr = {}
    if request.session.get('usrid'):
        usrid = request.session.get('usrid')
        usersession = request.session.get('user')
    response = requests.get('http://192.168.43.242:3000/tesse/users/all')
    usrdata = response.json()
    for i in range(len(usrdata)):
        if str(usrdata[i]['IdUser']) == str(usrid):
            currentusr = usrdata[i]
    response = requests.get('http://192.168.43.242:3000/tesse/appointmentexpert/' + usrid)
    appointmentusrdata = response.json()
    return render(request, 'manageappointment.html', { 
        'usersession': usersession, 
        'usrid': usrid,
        'currentusr': currentusr,
        'appointmentusrdata': appointmentusrdata,
        })

def validate_login(request):
    data = {
        'is_success': '',
    }
    usrss = request.GET.get('usrss', None)
    usrid = request.GET.get('usrid', None)
    if usrid:
        request.session['user'] = str(usrss)
        request.session['usrid'] = str(usrid)
        data['is_success'] = 1
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
        del request.session['usrid']
        data['is_success'] = 1
    return JsonResponse(data)