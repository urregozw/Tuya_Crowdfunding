import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
class Preparation:
    data=None
    def __init__(self):
        self.data=pd.read_csv('./Inputs/ks-projects-201801.csv')

    def DataPreparation(self,request,X):
        print(X)
        self.X=X
        scaler = StandardScaler()
        df2 = pd.DataFrame.from_dict(request, orient='index')
        df2 = df2.transpose()
        frames = [self.X, df2]
        X_transformed=df2.to_numpy()
        self.X=pd.concat(frames)
        X_transformed = scaler.fit_transform(X_transformed[0][:, np.newaxis])
        transformedData=[]
        for data in X_transformed:
            transformedData.append(data[0])
        s= scaler.fit_transform(self.X)
        return s
