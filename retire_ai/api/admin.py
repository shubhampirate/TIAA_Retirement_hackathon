from django.contrib import admin
from .models import User,Doctor,Saving,Expense,EducationCategory,Education

# Register your models here.
admin.site.register(User)
admin.site.register(Doctor)
admin.site.register(Saving)
admin.site.register(Expense)
admin.site.register(EducationCategory)
admin.site.register(Education)