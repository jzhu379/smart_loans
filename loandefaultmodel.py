#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov  9 14:38:55 2019

@author: niansenliu
"""

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import sklearn
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn import tree
from sklearn import model_selection
from sklearn.svm import SVC
from scipy.stats import pearsonr as pearson
from sklearn.metrics import precision_recall_curve
from sklearn.model_selection import StratifiedKFold
from sklearn.model_selection import KFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB

# read in data
data = pd.read_csv('loan.csv')

# select features to train on 
df = pd.DataFrame(columns=['loan_amnt', 'installment', 'avg_cur_bal', 'grade', 'loan_status'])
df['loan_amnt'] = data_2['loan_amnt']
df['installment'] = data_2['installment']
df['avg_cur_bal'] = data_2['avg_cur_bal']
df['loan_status'] = data_2['loan_status']
df['grade'] = data_2['grade']

# eliminate loans not relevant to the prediction
df = df[df['loan_status'] != 'Does not meet the credit policy. Status:Fully Paid']
df = df[df['loan_status'] != 'Does not meet the credit policy. Status:Charged Off']
df['loan_status'].unique()

# map loan status to a a category: 100 corresponds to high risk, 50 corresponds to mid-risk, and 0 corresponds to low risk 
df['loan_status'] = df['loan_status'].map({'Fully Paid': 0, 'Default' : 100, 'Charged Off': 100, 'In Grace Period': 50,'Late (31-120 days)': 50, 'Late (16-30 days)': 50})

# map grade (analogous to a credit score) to a number
df['grade'] = df['grade'].map({'A': 7, 'B' : 6, 'C' : 5, 'D' : 4, 'E' : 3, 'F' : 2, 'G' : 1})

# remove invalid values of average current balance
df = df[df['avg_cur_bal'] >= 0]

# split data in testing and training data
Y = df['loan_status'].values
X = np.array([df['loan_amnt'], df['installment'], df['avg_cur_bal'], df['grade']])
X = X.T
X_train, X_test, y_train, y_test = model_selection.train_test_split(X, Y, test_size=0.20, random_state=212)
train_samples, n_features = X.shape

# test models and decide on the best model 
kfold = model_selection.StratifiedKFold(n_splits=10, shuffle=True, random_state=212)
cvscores = []
# add models
models = []
models.append(('LR', LogisticRegression()))
models.append(('KNN', KNeighborsClassifier()))
models.append(('CART', DecisionTreeClassifier()))
# store results and name of model 
results = []
names = []
for name, model in models:
	    kfold = model_selection.KFold(n_splits=10, random_state=212)
	    cv_results = model_selection.cross_val_score(model, X_train, y_train, cv=kfold, scoring='accuracy')
	    results.append(cv_results)
	    names.append(name)
	    msg = "%s: %f (%f)" % (name, cv_results.mean(), cv_results.std())
	    print(msg)
        
# fit the logistic regression to the training data 
# note: various models were tested, and the logistic regression 
# was selected due to its higher accuracy 
logreg = LogisticRegression()
logreg.fit(X_train, y_train)

# show weights and biases for the logistic regression 
print(logreg.coef_)
print(logreg.intercept_)

# predict result from testing data and print accuracy 
y_pred = logreg.predict(X_test)
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))