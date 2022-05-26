from os import path

import numpy as np
import pandas as pd

from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.utils import class_weight
import tensorflow as tf

class TuyaLearner:
    prediction=None
    data=None
    X=None
    X_test=None
    y_test=None
    def __init__(self):
        self.prediction=0
        self.data=pd.read_csv('./Inputs/ks-projects-201801.csv')


    def Modeler(self):
        Clean=Cleaner()
        self.X,y=Clean.DataCleaner()
        scaler = StandardScaler()

        self.X = scaler.fit_transform(self.X)
        X_train, X_test, y_train, y_test = train_test_split(self.X, y, train_size=0.7, random_state=34)
        class_weights = class_weight.compute_class_weight(
            class_weight='balanced',
            classes=y_train.unique(),
            y=y_train
        )

        class_weights = dict(enumerate(class_weights))
        inputs = tf.keras.Input(shape=(221,))
        x = tf.keras.layers.Dense(64, activation='relu')(inputs)
        x = tf.keras.layers.Dense(64, activation='relu')(x)
        outputs = tf.keras.layers.Dense(1, activation='sigmoid')(x)

        model = tf.keras.Model(inputs, outputs)
        if (path.exists("model.h5")):
            pass
        else:
            print("No hay modelo, Creando...")
            self.modeler(model,X_train,y_train,class_weights,X_test,y_test)



    def modeler(self,model,X_train,y_train,class_weights,X_test,y_test):
        self.X_test=X_test
        self.y_test=y_test
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=[
                'accuracy',
                tf.keras.metrics.AUC(name='auc')
            ]
        )

        batch_size = 64
        epochs = 100

        history = model.fit(
            X_train,
            y_train,
            validation_split=0.2,
            class_weight=class_weights,
            batch_size=batch_size,
            epochs=epochs,
            callbacks=[
                tf.keras.callbacks.EarlyStopping(
                    monitor='val_loss',
                    patience=3,
                    restore_best_weights=True,
                    verbose=1
                )
            ],
            verbose=2
        )
        model.evaluate(X_test, y_test)
        model.save('model.h5')


    def makePrediction(self,data):
        self.model = tf.keras.models.load_model('model.h5')
        prediction=self.model.predict(np.array([data,]))
        return prediction

class Cleaner():
    data=None
    def __init__(self):
        self.data = pd.read_csv('./Inputs/ks-projects-201801.csv')
    def DataCleaner(self):
        unneeded_columns = ['ID', 'name']

        self.data = self.data.drop(unneeded_columns, axis=1)
        self.data.isna().sum()
        self.data['usd pledged'] = self.data['usd pledged'].fillna(self.data['usd pledged'].mean())
        self.data.isna().sum().sum()
        self.data['state'].unique()
        self.data = self.data.drop(self.data.query("state != 'failed' and state != 'successful'").index,
                                   axis=0).reset_index(drop=True)
        self.data['state'].unique()
        self.data['deadline_year'] = self.data['deadline'].apply(lambda x: np.float(x[0:4]))
        self.data['deadline_month'] = self.data['deadline'].apply(lambda x: np.float(x[5:7]))

        self.data['launched_year'] = self.data['launched'].apply(lambda x: np.float(x[0:4]))
        self.data['launched_month'] = self.data['launched'].apply(lambda x: np.float(x[5:7]))

        self.data = self.data.drop(['deadline', 'launched'], axis=1)
        self.data['state'] = self.data['state'].apply(lambda x: 1 if x == 'successful' else 0)
        {column: list(self.data[column].unique()) for column in self.data.columns if
         self.data.dtypes[column] == 'object'}
        self.data = self.onehot_encode(
            self.data,
            ['category', 'main_category', 'currency', 'country'],
            ['cat', 'main_cat', 'curr', 'country']
        )
        y = self.data.loc[:, 'state']
        self.X = self.data.drop('state', axis=1)
        return self.X,y
    def onehot_encode(self,df, columns, prefixes):
        df = df.copy()
        for column, prefix in zip(columns, prefixes):
            dummies = pd.get_dummies(df[column], prefix=prefix)
            df = pd.concat([df, dummies], axis=1)
            df = df.drop(column, axis=1)
        return df