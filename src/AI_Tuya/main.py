import json
import re
import time

import numpy as np
import pandas as pd

from AI_Tuya import TuyaLearner,Cleaner
from DataPreparation import Preparation
from flask_cors import CORS
from flask import Flask, jsonify, request
import os.path
from os import path

app = Flask(__name__)
dataC=None
CORS(app, expose_header='Authorization')
@app.route("/upload",methods=['POST'])
def upload():
    r = request.get_json()

    f=requestTransform(r)
    Preparator = Preparation()
    Modeler=TuyaLearner()
    dataChecker()
    if(dataC is not None):
        if (path.exists("model.h5")):
            x = Preparator.DataPreparation(f, dataC)
            response = Modeler.makePrediction(x[-1])
            prediction = {'succesRate': response.item(0)}
            return prediction, 200
        else:
            print("No hay modelo")
            Modeler.Modeler()
            x = Preparator.DataPreparation(f,dataC)
            response = Modeler.makePrediction(x[-1])
            prediction = {'succesRate': response.item(0)}
            return prediction, 200
    else:
        dataChecker()
        if (path.exists("model.h5")):
            x = Preparator.DataPreparation(f, dataC)
            response = Modeler.makePrediction(x[-1])
            print(response)
            prediction = {'succesRate': response.item(0)}
            return prediction, 200
        else:
            Modeler.Modeler()
            x = Preparator.DataPreparation(f,dataC)
            response = Modeler.makePrediction(x[-1])
            prediction = {'succesRate': response.item(0)}
            return prediction, 200

    return "Algo salio mal", 500


def requestTransform(request):
    with open('RequestDto.json','r') as r:
        jsonRequest=json.load(r)
        for requestkey in request:
            if (requestkey == "cat" or requestkey == "min_cat"):
                jsonRequest[request[requestkey]] = 1
            if (requestkey == "usd_pledged"):
                jsonRequest['usd pledged'] = request['usd_pledged']
            else:
                jsonRequest[requestkey]=request[requestkey]

    del jsonRequest['cat']
    del jsonRequest['min_cat']
    return jsonRequest

def dataChecker():
    global dataC
    if(dataC is None):
        dataCleaner=Cleaner()
        dataC,y=dataCleaner.DataCleaner()

    else:
        pass


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0",port=9999)

# Press the green button in the gutter to run the script.



# See PyCharm help at https://www.jetbrains.com/help/pycharm/
