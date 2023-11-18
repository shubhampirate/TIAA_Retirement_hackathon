# Imports Libraries
import numpy as np
import pandas as pd
import statsmodels.api as sm
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.covariance import EllipticEnvelope
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import VotingClassifier
from sklearn.metrics import recall_score, precision_score, accuracy_score, fbeta_score
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
import joblib
from sklearn.pipeline import Pipeline
import seaborn as sns
sns.set_theme(style='darkgrid')

data = pd.read_csv("credit_risk_dataset.csv")

data.isnull().sum()

data = data.dropna()
data.isnull().sum()

data.duplicated().sum()

data = data.drop_duplicates()
data.duplicated().sum()

numeric_data = data.select_dtypes(include=['number'])

x = numeric_data.drop(['loan_status'], axis=1)
y = data['loan_status']

model = LinearRegression()
model.fit(x, y)

y_pred = model.predict(x)

# Calculating the mean squared error
mse = mean_squared_error(y, y_pred)

# Detecting outliers using the Elliptic Envelope method
outlier_detector = EllipticEnvelope(contamination=0.1)
outlier_detector.fit(x)

# Identifying outliers
outliers = outlier_detector.predict(x) == -1

# Removing outliers from the dataset
data = data[~outliers]

# Printing the results
print("Mean Squared Error:", mse)
print("Outliers:", sum(outliers))

# Create a box plot to visualize outliers
numeric_data = data.select_dtypes(include=['number'])

# Create a figure to hold all the box plots
plt.figure(figsize=(20, 10))

# Loop through each column in the numeric data and create a box plot
for i, column in enumerate(numeric_data.columns):
    plt.subplot(1, len(numeric_data.columns), i + 1)
    plt.boxplot(numeric_data[column])
    plt.title(column)
    plt.ylabel('Value')

# Adjust layout
plt.tight_layout()

# Show the box plots
plt.show()

loan_status_values = data["loan_status"].unique()

plt.figure(figsize=(8, 6))
sns.countplot(x="loan_status", data=data, palette="Set2", order=loan_status_values)
plt.xlabel("Loan Status")
plt.ylabel("Count")
plt.title("Countplot of Loan Status")
plt.show()

sns.pairplot(data, diag_kind='kde')
plt.show()

# correlation plot
plt.figure(figsize=(10, 10)) 
data_num = data.select_dtypes(include=['number'])
corr = data_num.corr()
mask = np.zeros_like(corr)
mask[np.triu_indices_from(mask)] = True
sns.heatmap(corr * 100, cmap = 'cividis', annot= True, fmt='.2f', mask=mask)
plt.title('Confusion Matrix')
plt.show()

#declare features vector and target
x = data.drop(['loan_status'], axis=1)
y = data['loan_status']

#define category features
data_cat = x.select_dtypes(include=['object'])

# Calculate and display the number of unique values for each 'object' column
for column in data_cat.columns:
    unique_count = data_cat[column].nunique()
    print(f"Column '{column}' has {unique_count} unique values.")

x_encoded = pd.get_dummies(x, columns=data_cat.columns)

# Apply SMOTE to the training data
smote = SMOTE(random_state=42)
x_resampled, y_resampled = smote.fit_resample(x_encoded, y)

scaler = StandardScaler()
scaler.fit(x_resampled)
x_scaled = scaler.transform(x_resampled)

x_train, x_test, y_train, y_test = train_test_split(x_scaled, y_resampled, test_size=0.2, random_state=42)

# Define individual classifiers
clf1 = LogisticRegression(max_iter=1000, multi_class='multinomial', solver='lbfgs', random_state=42)
clf2 = RandomForestClassifier(n_estimators=100, random_state=42, max_depth = 9)
clf3 = SVC(kernel='poly', C=1.0, decision_function_shape='ovr', random_state=42, probability=True)
clf4 = KNeighborsClassifier(n_neighbors = 2)

# Fit and evaluate each individual classifier
classifiers = [clf1, clf2, clf3, clf4]
clf_proba = []
clf_name = []

for clf in classifiers:
    clf.fit(x_train, y_train)
    y_pred = clf.predict(x_test)
    y_pred_proba = clf.predict_proba(x_test)[:,1]
    clf_proba.append(y_pred_proba)
    clf_name.append(clf.__class__.__name__)
    
    recall = recall_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    f0_5 = fbeta_score(y_test, y_pred, beta=0.5)
    f1 = fbeta_score(y_test, y_pred, beta=1)
    f2 = fbeta_score(y_test, y_pred, beta=2)
    accuracy = accuracy_score(y_test, y_pred)      
        
    print(f"{clf.__class__.__name__}")
    print(f'Recall:  {recall * 100:.2f}%')
    print(f'Precision:  {precision * 100:.2f}%')
    print(f'F0.5 Score:  {f0_5 * 100:.2f}%')
    print(f'F1 Score:  {f1 * 100:.2f}%')
    print(f'F2 Score:  {f2 * 100:.2f}%')
    print(f'Accuracy:  {accuracy * 100:.2f}%')
    print('-----' * 15)

# Create a Voting Classifier that combines the predictions of the individual classifiers
voting_clf = VotingClassifier(estimators=[('lr', clf1), ('rf', clf2), ('svm', clf3), ('knn', clf4)], voting='soft')

# Fit the ensemble model on the training data
voting_clf.fit(x_train, y_train)

# Make predictions using the ensemble model
voting_y_pred = voting_clf.predict(x_test)
voting_y_pred_proba = voting_clf.predict_proba(x_test)[:,1]
clf_proba.append(voting_y_pred_proba)
clf_name.append(voting_clf.__class__.__name__)

# Evaluate the ensemble model's accuracy
voting_recall = recall_score(y_test, voting_y_pred)
voting_precision = precision_score(y_test, voting_y_pred)
voting_f0_5 = fbeta_score(y_test, y_pred, beta=0.5)
voting_f1 = fbeta_score(y_test, y_pred, beta=1)
voting_f2 = fbeta_score(y_test, y_pred, beta=2)
voting_accuracy = accuracy_score(y_test, voting_y_pred)

print(f"{voting_clf.__class__.__name__}")
print(f'Recall:  {voting_recall * 100:.2f}%')
print(f'Precision:  {voting_precision * 100:.2f}%')
print(f'F0.5 Score:  {voting_f0_5 * 100:.2f}%')
print(f'F1 Score:  {voting_f1 * 100:.2f}%')
print(f'F2 Score:  {voting_f2 * 100:.2f}%')
print(f'Accuracy:  {voting_accuracy * 100:.2f}%')

# Assuming that 'voting_clf' is your final trained model
final_model = Pipeline([
    ('scaler', scaler),  # Assuming you also want to save the scaler
    ('model', voting_clf)
])

# Save the model and scaler to a file
joblib.dump(final_model, 'credit_risk_model.joblib')