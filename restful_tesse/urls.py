"""restful_tesse URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from core import views

urlpatterns = [
    path('', views.home, name='home'),
    path('search/<str:key>', views.search, name='search'),
    path('become-an-expert', views.becomeAnExpert, name='becomeAnExpert'),
    path('manage-appointment', views.manageAppointment, name='manageAppointment'),
    path('manage-expert-appointment', views.manageExpertAppointment, name='manageExpertAppointment'),
    path('validate_login', views.validate_login, name='validate_login'),
    path('validate_email', views.validate_email, name='validate_email'),
    path('logout', views.logout, name='logout'),
    path('admin/', admin.site.urls),
]
