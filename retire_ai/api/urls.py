from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterAPI.as_view(), name='register'),
    path('login/', views.LoginAPI.as_view(), name='login'),
    path('user/<str:pk>', views.UserAPI.as_view(), name='user'),
    path('logout/', views.LogoutAPI.as_view(), name='logout'),
    path('doctor/', views.DoctorAPI.as_view(), name='doctor'),
    path('doctor/<str:pk>', views.DoctorAPI.as_view(), name='doctor'),
    path('saving/', views.SavingAPI.as_view(), name='saving'),
    path('saving/<str:pk>', views.SavingAPI.as_view(), name='saving'),
    path('expense/', views.ExpenseAPI.as_view(), name='expense'),
    path('expense/<str:pk>', views.ExpenseAPI.as_view(), name='expense'),
    path('education/', views.EducationAPI.as_view(), name='education'),
    path('education/<str:pk>', views.EducationAPI.as_view(), name='education'),

]