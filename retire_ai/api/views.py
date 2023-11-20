from rest_framework.generics import GenericAPIView, UpdateAPIView
from rest_framework import status,permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.conf import settings
from django.contrib.auth import authenticate, login
from django.db.models import Q

from .serializers import RegisterSerializer,LoginSerializer,UserSerializer,DoctorSerializer,SavingSerializer,ExpenseSerializer,EducationCategorySerializer,EducationSerializer, MediclaimSerializer
from .models import User,Doctor,Saving,Expense,EducationCategory,Education, Mediclaim

import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import cvxpy as cp


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
        

class MediclaimAPI(GenericAPIView):
     
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MediclaimSerializer
    queryset = Mediclaim.objects.all()
    
    def get(self,request,*args,**kwargs):
        try:
            expenses = Mediclaim.objects.filter(user=request.user)
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
                expenses = Mediclaim.objects.filter(user=request.user)
                serializer = self.serializer_class(expenses,many=True)
                return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
            expense = Mediclaim.objects.get(id = pk)
            serializer = self.serializer_class(expense)
            return Response({"status" : True ,"data" : serializer.data, "message" : 'Success'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self,request,pk,*args,**kwargs):
        try:
            expense = Mediclaim.objects.get(id = pk)
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
            expense = Mediclaim.objects.get(id = pk)
            expense.delete()
            return Response({"status" : True ,"data" : {}, "message" : 'Expense Deleted Successfully'},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"status" : False ,"data" : {}, "message" : f"{e}"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['GET'])
def get_credit_risk(request):
    data_csv_path = settings.BASE_DIR / 'ml/credit_risk_dataset.csv'
    data = pd.read_csv(data_csv_path)
    data.isnull().sum()
    data = data.dropna()
    data.isnull().sum()
    data.duplicated().sum()
    data = data.drop_duplicates()
    data.duplicated().sum()
    x = data.drop(['loan_status'], axis=1)
    data_cat = x.select_dtypes(include=['object'])
    x_encoded = pd.get_dummies(x, columns=data_cat.columns)
    user_input = pd.DataFrame({
        'person_age': [25],
        'person_income': [50000],
        'person_home_ownership': ['RENT'],
        'person_emp_length': [3],
        'loan_intent': ['EDUCATION'],
        'loan_grade': ['C'],
        'loan_amnt': [10000],
        'loan_int_rate': [10.5],
        'loan_percent_income': [20],
        'cb_person_default_on_file': ['N'],
        'cb_preson_cred_hist_length': [4]
    })

    model_with_scaler_path = settings.BASE_DIR / 'ml/credit_risk_model.joblib'

    try:
        model_with_scaler = joblib.load(model_with_scaler_path)
    except FileNotFoundError:
        return Response({"status" : False ,"data" : {}, "message" : "Model with scaler file not found."}, status=status.HTTP_400_BAD_REQUEST)

    scaler = model_with_scaler.named_steps['scaler']
    user_input_encoded = pd.get_dummies(user_input, columns=data_cat.columns)
    ordered_columns = x_encoded.columns
    custom_input_encoded_aligned = user_input_encoded.reindex(columns=ordered_columns, fill_value=0)
    user_input_scaled = scaler.transform(custom_input_encoded_aligned)
    prediction = model_with_scaler.predict(user_input_scaled)
    custom_input_proba = model_with_scaler.predict_proba(user_input_scaled)[:, 1]
    context = {'prediction': prediction[0], "value" : f"{custom_input_proba[0]:.2f}"}
    return Response({"status" : True ,"data" : context, "message" : "Success"}, status=status.HTTP_200_OK)


def retirement_simulation(years, current_savings, annual_expense, return_on_investments, inflation_rate, other_earnings):
    np.random.seed(42) 
    expenses = np.zeros(years)
    savings = [current_savings+other_earnings]
    for i in range(years-1):
      savings.append(0)

    for year in range(1, years):
        investment_return = np.random.normal(return_on_investments, 0.05)  # Adjust for market volatility
        inflation_adjusted_expense = annual_expense * (1 + inflation_rate)**year
        savings[year] = savings[year - 1] * (1 + investment_return) - inflation_adjusted_expense
        expenses[year] = inflation_adjusted_expense

    return savings, expenses


def visualize_results(years, savings, expenses):
    plt.plot(range(years), savings, label='Savings')
    plt.plot(range(years), expenses, label='Expenses', linestyle='dashed')
    plt.xlabel('Years')
    plt.ylabel('Amount ($)')
    plt.title('Retirement Planning Simulation')
    plt.legend()
    plt.show()


@api_view(['POST'])
def retirement_plan_simulation(request):
    try:
        years = int(request.data['years'])
        current_savings = float(request.data['current_savings'])
        annual_expense = float(request.data['annual_expense'])
        return_on_investments = float(request.data['return_on_investments'])
        inflation_rate = float(request.data['inflation_rate'])
        other_earnings = float(request.data['other_earnings'])

        savings, expenses = retirement_simulation(years, current_savings, annual_expense, return_on_investments, inflation_rate, other_earnings)

        return Response({"status" : True ,"data" : {"savings" : savings, "expenses" : expenses}, "message" : "Success"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"status" : False ,"data" : {}, "message" : f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

'''
user_investments = {
        'AEP Adjusted': 10000, 
        'DFSVX Adjusted': 15000,
        'DFLVX Adjusted': 20000,
        'FSAGX Adjusted': 12000
    }

total_amount = 10000
'''

@api_view(['POST'])
def optimize_portfolio(request):
    user_investments = request.data['user_investments']
    total_amount = request.data['total_amount']
    data_csv_path = settings.BASE_DIR / 'ml/assets.csv'
  
    df = pd.read_csv(data_csv_path)
    df = df.dropna()
    assets_columns = ['AEP Adjusted', 'DFSVX Adjusted', 'DFLVX Adjusted', 'FSAGX Adjusted']
    risk_free_rate_column = 'GS1 (rf in percent)'

    expected_returns = df[assets_columns].mean().values
    covariance_matrix = df[assets_columns].cov().values

    existing_portfolio_weights = {asset: investment / sum(user_investments.values()) for asset, investment in user_investments.items()}
    weights = cp.Variable(len(assets_columns))
    objective = cp.Maximize(weights.T @ expected_returns - 0.5 * cp.quad_form(weights, covariance_matrix))
    constraints = [cp.sum(weights) == 1]
    constraints += [weights[i] == existing_portfolio_weights[asset] for i, asset in enumerate(assets_columns)]
    problem = cp.Problem(objective, constraints)
    problem.solve()
    optimized_weights = weights.value

    # print("\nOptimal Asset Allocation Weights:")
    # for i, weight in enumerate(optimized_weights):
    #     print(f"{assets_columns[i]}: {weight:.2%}")

    expected_portfolio_return = optimized_weights.dot(expected_returns) / 100
    portfolio_volatility = np.sqrt(optimized_weights.T @ covariance_matrix @ optimized_weights) / 100

    print("\nOptimized Portfolio Metrics:")
    print(f"Expected Return: {expected_portfolio_return:.2%}")
    print(f"Volatility: {portfolio_volatility:.2%}")

    recommendations = {asset: weight * total_amount for asset, weight in zip(assets_columns, optimized_weights)}

    # print("\nInvestment Recommendations:")
    # for asset, amount in recommendations.items():
    #     print(f"{asset}: Allocate Rs. {amount:.2f}")

    return Response({"status" : True ,"data" : {"recommendations" : recommendations,
                                                 "return": f"{expected_portfolio_return:.2%}", 
                                                 "risk":f"{portfolio_volatility:.2%}"}, "message" : "Success"}, status=status.HTTP_200_OK)