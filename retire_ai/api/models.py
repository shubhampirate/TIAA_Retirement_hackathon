from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from rest_framework.authtoken.models import Token


# Create your models here.
class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        print(user)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a superuser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):

    GENDERS = (('M','Male'),
    ('F','Female'),
    ('NA','NA'),
    ('O','Other'))

    username=None
    email = models.EmailField(("Email Address"),primary_key=True)
    address = models.CharField(max_length=250)
    dob = models.DateField(blank=True, null=True)
    gender = models.CharField(default = 'NA',max_length = 10)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    spouse_name = models.CharField(max_length=100, blank=True, null=True)
    spouse_dob = models.DateField(blank=True, null=True)
    spouse_gender = models.CharField(default = 'NA',max_length = 10)
    profile_pic = models.ImageField(upload_to = 'users/',blank = True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=[]

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def token(self):
        token = Token.objects.get(user=User.objects.get(self.id))
        return token
    

class Doctor(models.Model):
    name = models.CharField(max_length=250, blank=True, null=True)
    address = models.CharField(max_length=250, blank=True, null=True)
    timing = models.CharField(max_length=250, blank=True, null=True)
    city = models.CharField(max_length=250, blank=True, null=True)
    speciality = models.CharField(max_length=250, blank=True, null=True)
    experience = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name
    
class Saving(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(default=0)
    date = models.DateField(blank=True, null=True)
    description = models.CharField(max_length=250, blank=True, null=True)
    goal_amount = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.email
    
class Expense(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    income = models.PositiveIntegerField(default=0)
    expense = models.PositiveIntegerField(default=0)
    savings = models.PositiveIntegerField(default=0)
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.user.email

class EducationCategory(models.Model):
    name = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.name
    

class Education(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    category = models.ForeignKey(EducationCategory, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    date_published = models.DateField(blank=True, null=True)
    yt_link = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.title
    

class Mediclaim(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor_charges = models.PositiveIntegerField(default=0)
    room_charges = models.PositiveIntegerField(default=0)
    bill_amount = models.PositiveIntegerField(default=0)
    final_amount = models.PositiveIntegerField(default=0)
    date = models.DateField(blank=True, null=True, auto_now_add=True)

    def __str__(self):
        return self.user.email