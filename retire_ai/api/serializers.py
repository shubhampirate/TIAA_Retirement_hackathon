from rest_framework import serializers
from .models import User, Doctor, Saving, Expense, EducationCategory, Education, Mediclaim

import re
email_pattern = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

class RegisterSerializer(serializers.ModelSerializer):
	password=serializers.CharField(max_length=32,min_length=8,write_only = True)
	
	class Meta:
		model = User
		fields = ['first_name','last_name','email','address','dob','gender','phone_number','spouse_name','spouse_dob','spouse_gender','profile_pic','password']

	def validate(self,attrs):
		email = attrs.get('email',' ')

		if not email_pattern.match(email):
			raise serializers.ValidationError('Please enter a valid email!')
		return attrs
		
	def create(self,validated_data):
            #validated_data['is_active'] = False
            return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=32,min_length=8,write_only = True)
    
    class Meta:
        model = User
        fields = ['email','password']


class UserSerializer(serializers.ModelSerializer):
	
    class Meta:
        model = User
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Doctor
        fields = '__all__'


class SavingSerializer(serializers.ModelSerializer):
            
    class Meta:
        model = Saving
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Expense
        fields = '__all__'


class EducationCategorySerializer(serializers.ModelSerializer):
     
    class Meta:
        model = EducationCategory
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    category = EducationCategorySerializer()
     
    class Meta:
        model = Education
        fields = ['id', 'title', 'category', 'description', 'date_published', 'yt_link']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['category'] = EducationCategorySerializer(instance.category).data
        return response
    
    def create(self, validated_data):
        category = validated_data.pop('category')
        category,k = EducationCategory.objects.get_or_create(name=category['name'])
        return Education.objects.create(category=category, **validated_data)
    
    def update(self, instance, validated_data):
        category = validated_data.pop('category')
        category,k = EducationCategory.objects.get_or_create(name=category['name'])
        instance.category = category
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.date_published = validated_data.get('date_published', instance.date_published)
        instance.yt_link = validated_data.get('yt_link', instance.yt_link)
        instance.save()
        return instance


class MediclaimSerializer(serializers.ModelSerializer):
         
        class Meta:
            model = Mediclaim
            fields = '__all__'