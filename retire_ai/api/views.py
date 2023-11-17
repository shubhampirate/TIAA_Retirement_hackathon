from rest_framework.generics import GenericAPIView, UpdateAPIView
from rest_framework import status,permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from django.contrib.auth import authenticate, login
from django.db.models import Q

from .serializers import RegisterSerializer,LoginSerializer,UserSerializer,DoctorSerializer,SavingSerializer,ExpenseSerializer,EducationCategorySerializer,EducationSerializer
from .models import User,Doctor,Saving,Expense,EducationCategory,Education


# Create your views here.
class RegisterAPI(GenericAPIView):
	
	serializer_class = RegisterSerializer
	
	def post(self,request,*args,**kwargs):
		try:
			data = request.data
			serializer = self.serializer_class(data=data)
			if serializer.is_valid(raise_exception = True):
				user = serializer.save()
				token = Token.objects.create(user=user)
				return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
			return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginAPI(GenericAPIView):
	
	serializer_class = LoginSerializer
	
	def post(self,request,*args,**kwargs ):
		email = request.data.get('email',None)
		password = request.data.get('password',None)
		user = authenticate(email = email, password = password)
		if user :
			login(request,user)
			serializer = self.serializer_class(user)
			token,k = Token.objects.get_or_create(user=user)
			return Response({"status" : True ,"data" : {'token' : token.key,'email' : user.email}, "message" : 'Login Success'},status = status.HTTP_200_OK)
		return Response({"status" : False ,"data" : {}, "message" : 'Invalid Credentials'},status = status.HTTP_401_UNAUTHORIZED)
	

class LogoutAPI(GenericAPIView):
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LoginSerializer
    
    def get(self,request,*args,**kwargs):
        try:
            request.user.auth_token.delete()
            return Response({"status" : True ,"data" : {}, "message" : 'Logout Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
		
    
class UserAPI(GenericAPIView):
	    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def get(self,request,pk,*args,**kwargs):
        try:
            user = User.objects.get(email = pk)
            serializer = self.serializer_class(user)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self,request,pk,*args,**kwargs):
        try:
            user = User.objects.get(email = pk)
            data = request.data
            serializer = self.serializer_class(user,data=data,partial=True)
            if serializer.is_valid(raise_exception = True):
                user = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self,request,pk,*args,**kwargs):
        try:
            user = User.objects.get(email = pk)
            user.delete()
            return Response({"status" : True ,"data" : {}, "message" : 'User Deleted Successfully'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
            

class DoctorAPI(GenericAPIView):
        
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()
    
    def get(self,request,*args,**kwargs):
        try:
            doctors = Doctor.objects.all()
            serializer = self.serializer_class(doctors,many=True)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self,request,*args,**kwargs):
        try:
            data = request.data
            serializer = self.serializer_class(data=data)
            if serializer.is_valid(raise_exception = True):
                doctor = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get(self,request,pk = None,*args,**kwargs):
        try:
            if not pk:
                doctors = Doctor.objects.all()
                serializer = self.serializer_class(doctors,many=True)
                return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
            doctor = Doctor.objects.get(id = pk)
            serializer = self.serializer_class(doctor)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self,request,pk,*args,**kwargs):
        try:
            doctor = Doctor.objects.get(id = pk)
            data = request.data
            serializer = self.serializer_class(doctor,data=data,partial=True)
            if serializer.is_valid(raise_exception = True):
                doctor = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self,request,pk,*args,**kwargs):
        try:
            doctor = Doctor.objects.get(id = pk)
            doctor.delete()
            return Response({"status" : True ,"data" : {}, "message" : 'Doctor Deleted Successfully'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class SavingAPI(GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SavingSerializer
    queryset = Saving.objects.all()
    
    def get(self,request,*args,**kwargs):
        try:
            savings = Saving.objects.filter(user=request.user)
            serializer = self.serializer_class(savings,many=True)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self,request,*args,**kwargs):
        try:
            data = request.data
            serializer = self.serializer_class(data=data)
            if serializer.is_valid(raise_exception = True):
                saving = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get(self,request,pk=None,*args,**kwargs):
        try:
            if not pk:
                savings = Saving.objects.filter(user=request.user)
                serializer = self.serializer_class(savings,many=True)
                return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
            saving = Saving.objects.get(id = pk)
            serializer = self.serializer_class(saving)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self,request,pk,*args,**kwargs):
        try:
            saving = Saving.objects.get(id = pk)
            data = request.data
            serializer = self.serializer_class(saving,data=data,partial=True)
            if serializer.is_valid(raise_exception = True):
                saving = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self,request,pk,*args,**kwargs):
        try:
            saving = Saving.objects.get(id = pk)
            saving.delete()
            return Response({"status" : True ,"data" : {}, "message" : 'Saving Deleted Successfully'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ExpenseAPI(GenericAPIView):
     
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()
    
    def get(self,request,*args,**kwargs):
        try:
            expenses = Expense.objects.filter(user=request.user)
            serializer = self.serializer_class(expenses,many=True)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self,request,*args,**kwargs):
        try:
            data = request.data
            serializer = self.serializer_class(data=data)
            if serializer.is_valid(raise_exception = True):
                expense = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get(self,request,pk=None,*args,**kwargs):
        try:
            if not pk:
                expenses = Expense.objects.filter(user=request.user)
                serializer = self.serializer_class(expenses,many=True)
                return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
            expense = Expense.objects.get(id = pk)
            serializer = self.serializer_class(expense)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self,request,pk,*args,**kwargs):
        try:
            expense = Expense.objects.get(id = pk)
            data = request.data
            serializer = self.serializer_class(expense,data=data,partial=True)
            if serializer.is_valid(raise_exception = True):
                expense = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self,request,pk,*args,**kwargs):
        try:
            expense = Expense.objects.get(id = pk)
            expense.delete()
            return Response({"status" : True ,"data" : {}, "message" : 'Expense Deleted Successfully'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class EducationAPI(GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EducationSerializer
    queryset = Education.objects.all()

    def get(self,request,*args,**kwargs):
        try:
            education = Education.objects.all()
            serializer = self.serializer_class(education,many=True)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self,request,*args,**kwargs):
        try:
            data = request.data
            serializer = self.serializer_class(data=data)
            if serializer.is_valid(raise_exception = True):
                education = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get(self,request,pk = None,*args,**kwargs):
        try:
            if not pk:
                education = Education.objects.all()
                serializer = self.serializer_class(education,many=True)
                return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
            education = Education.objects.get(id = pk)
            serializer = self.serializer_class(education)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self,request,pk,*args,**kwargs):
        try:
            education = Education.objects.get(id = pk)
            data = request.data
            serializer = self.serializer_class(education,data=data,partial=True)
            if serializer.is_valid(raise_exception = True):
                education = serializer.save()
                return Response({"status" : True ,"data" : serializer.data, "message" : "Success"},status=status.HTTP_200_OK)
            return Response({"status" : False ,"data" : serializer.errors, "message" : "Failure"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self,request,pk,*args,**kwargs):
        try:
            education = Education.objects.get(id = pk)
            education.delete()
            return Response({"status" : True ,"data" : {}, "message" : 'Education Deleted Successfully'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)