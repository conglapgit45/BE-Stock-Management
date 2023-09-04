
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import win32com.client
import pythoncom
import pandas as pd
import random
import numpy as np
import time
import os
import glob
import math
from threading import Thread
import threading
from openpyxl import load_workbook
from datetime import date
from datetime import datetime
from datetime import timedelta


def SAP_Stock_On_Hand():
    pythoncom.CoInitialize()
    SapGuiAuto = win32com.client.GetObject("SAPGUI")
    application = SapGuiAuto.GetScriptingEngine
    connection = application.Children(0)
    session = connection.Children(0)

    # T-Code
    session.findById("wnd[0]/tbar[0]/okcd").text = "/nMB52"
    session.findById("wnd[0]/tbar[0]/btn[0]").Press()

    # Input Plant "V001" & "V002"
    session.findById("wnd[0]/usr/btn%_WERKS_%_APP_%-VALU_PUSH").Press()
    session.findById("wnd[1]/usr/tabsTAB_STRIP/tabpSIVA/ssubSCREEN_HEADER:SAPLALDB:3010/tblSAPLALDBSINGLE/ctxtRSCSEL_255-SLOW_I[1,0]").text = "V001"
    session.findById("wnd[1]/usr/tabsTAB_STRIP/tabpSIVA/ssubSCREEN_HEADER:SAPLALDB:3010/tblSAPLALDBSINGLE/ctxtRSCSEL_255-SLOW_I[1,1]").text = "V002"
    session.findById("wnd[1]/tbar[0]/btn[8]").Press()

    # Input Storage Location "V*01 & V*12"
    session.findById("wnd[0]/usr/btn%_LGORT_%_APP_%-VALU_PUSH").Press()
    session.findById("wnd[1]/usr/tabsTAB_STRIP/tabpSIVA/ssubSCREEN_HEADER:SAPLALDB:3010/tblSAPLALDBSINGLE/ctxtRSCSEL_255-SLOW_I[1,0]").text = "V*01"
    session.findById("wnd[1]/usr/tabsTAB_STRIP/tabpSIVA/ssubSCREEN_HEADER:SAPLALDB:3010/tblSAPLALDBSINGLE/ctxtRSCSEL_255-SLOW_I[1,1]").text = "V*12"
    session.findById("wnd[1]/tbar[0]/btn[8]").Press()

    # Clear all Batch
    session.findById("wnd[0]/usr/btn%_CHARG_%_APP_%-VALU_PUSH").Press()
    session.findById("wnd[1]/tbar[0]/btn[16]").Press()
    session.findById("wnd[1]/tbar[0]/btn[8]").Press()

    # Input Material Type
    session.findById("wnd[0]/usr/btn%_MATART_%_APP_%-VALU_PUSH").Press()
    session.findById("wnd[1]/usr/tabsTAB_STRIP/tabpSIVA/ssubSCREEN_HEADER:SAPLALDB:3010/tblSAPLALDBSINGLE/ctxtRSCSEL_255-SLOW_I[1,0]").text = "VERP"
    session.findById("wnd[1]/usr/tabsTAB_STRIP/tabpSIVA/ssubSCREEN_HEADER:SAPLALDB:3010/tblSAPLALDBSINGLE/ctxtRSCSEL_255-SLOW_I[1,1]").text = "ROH"
    session.findById("wnd[1]/tbar[0]/btn[8]").Press()

    # Setting Stick
    session.findById("wnd[0]/usr/chkNEGATIV").selected = False
    session.findById("wnd[0]/usr/chkXMCHB").selected = False
    session.findById("wnd[0]/usr/chkNOZERO").selected = True
    session.findById("wnd[0]/usr/chkNOVALUES").selected = False

    # # Chose Layout
    session.findById("wnd[0]/usr/radPA_FLT").select
    session.findById("wnd[0]/usr/ctxtP_VARI").text = "/RPM_STATUS"

    # Generate
    session.findById("wnd[0]/tbar[1]/btn[8]").Press()

    # Export
    stockOnHand_filePath = 'C:/Users/Truong-Cong.Lap/Downloads'
    stockOnHand_fileName = 'Stock_RPM_Status.XLSX'
    for file in os.listdir(stockOnHand_filePath):
        if file.endswith(".XLSX") and file.find(stockOnHand_fileName) != -1:
            os.remove(unload_tracking_filePath + '/' + file)
            print('Deleted: ' + file)

    session.findById("wnd[0]/tbar[1]/btn[43]").Press()
    session.findById("wnd[1]/usr/ctxtDY_PATH").text = stockOnHand_filePath
    session.findById("wnd[1]/usr/ctxtDY_FILENAME").text = stockOnHand_fileName
    session.findById("wnd[1]/tbar[0]/btn[0]").Press()
        # session.findById("wnd[0]").sendVKey (0)
        # session.findById("wnd[0]").sendVKey (0)
        # session.findById("wnd[0]").sendVKey (0)

    # Back to Menu
    session.findById("wnd[0]/tbar[0]/okcd").text = "/n"
    session.findById("wnd[0]/tbar[0]/btn[0]").Press()
    return


def Download_Unloading_Tracking(userName, password, unload_tracking_filePath, unload_tracking_fileName):
    # Driver
    print(1)
    options = Options()
    options.add_experimental_option("prefs", {"download.default_directory": r"C:\Users\Truong-Cong.Lap\Downloads", "download.prompt_for_download": False, 'profile.default_content_settings.popups': False})     
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    options.add_argument('log-level=3') 
    print(2)
    options.add_argument("headless=new")
    options.add_argument("start-minimized")  
    options.add_argument("inprivate") 
    options.add_argument("no-sandbox")
    print(3)
#     options.add_experimental_option("detach", True)
    service = Service(executable_path=r"C:\Users\Truong-Cong.Lap\AppData\Local\Microsoft\Edge\msedgedriver.exe")
    browser = webdriver.Edge(service=service, options=options)

#     # Setting
#     browser.set_window_size(600, 600)
#     browser.minimize_window()
#     browser.execute_script("document.body.style.zoom='50%'")

#     browser.get('edge://settings/appearance')
#     time.sleep(1)

#     WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div/div[2]/div/div/div[2]/div/div/div[1]/div[4]/div/div/div/div[1]/div[2]/div/div/button/span/div'))).click()
#     time.sleep(1)
#     ActionChains(browser).send_keys('67').key_down(Keys.ENTER).perform()
#     time.sleep(1)

#     browser.get('edge://settings/privacy/personalization')
#     time.sleep(1)

#     WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div/div[2]/div/div/div[2]/div/div/div/div[2]/div/div/div/div[1]/div[2]/div/div/input'))).click()
#     time.sleep(1)

    # Access URL
    print(4)
    browser.get('http://cuchicalloff.com/ekanban')
    time.sleep(1)    # browser.back()
    print(5)

    # Login
    WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.XPATH, '/html/body/app-root/app-auth-layout/div/app-login/div/mat-card/form/mat-form-field[1]/div/div[1]/div[3]/input'))).send_keys(userName)
    time.sleep(1)
    WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.XPATH, '/html/body/app-root/app-auth-layout/div/app-login/div/mat-card/form/mat-form-field[2]/div/div[1]/div[3]/input'))).send_keys(password)
    time.sleep(1)
    WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.XPATH, '/html/body/app-root/app-auth-layout/div/app-login/div/mat-card/form/button'))).click()
    time.sleep(1)
    print(6)
    # Download Unloading Tracking
    browser.get('https://cuchicalloff.com/ekanban/operation/unloading-tracking/list')
    time.sleep(2)

    print(7)
    curtTime = time.time()
    for file in os.listdir(unload_tracking_filePath):
        if file.endswith(".xlsx") and file.find(unload_tracking_fileName) != -1:
            os.remove(unload_tracking_filePath + '/' + file)
            print('Deleted: ' + file)
    print(8)
    WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.XPATH, '/html/body/app-root/app-admin-layout/div/mat-sidenav-container/mat-sidenav-content/div/app-operation-unloading-tracking/mat-card/div/div[3]/div[2]/button[3]'))).click()

    durationTime = time.time()
    flag = True
    while time.time() - durationTime <= 50 and flag == True:
        for file in os.listdir(unload_tracking_filePath):
            if file.endswith(".xlsx") and file.find(unload_tracking_fileName) != -1 and os.path.getctime(DS_report_filePath + '/' + file) > curtTime:
                print('Loaded ' + str(time.time() - durationTime) + ': ' + file)
                flag = False
                break
        time.sleep(2)
    print(9)
    # Quit
    browser.close()
    return


userName = 'CONGLAP'
password = 'Lap!@#123ekb'
unload_tracking_filePath = 'C:/Users/Truong-Cong.Lap/Downloads'
unload_tracking_fileName = 'EKANBAN_Operation_UnloadingTracking_'

threads_access_login_01 = threading.Thread(target = SAP_Stock_On_Hand, args = ())
threads_access_login_02 = threading.Thread(target = Download_Unloading_Tracking, args = (userName, password, unload_tracking_filePath, unload_tracking_fileName,))
threads_access_login_01.start()
threads_access_login_02.start()
threads_access_login_01.join()
threads_access_login_02.join()

# SAP_Stock_On_Hand()

df_01 = pd.read_excel("C:/Users/Truong-Cong.Lap/Downloads/Stock_RPM_Status.XLSX")
print(df_01)
print('\n\n')
print('\n\n')
df_02 = pd.read_excel("C:/Users/Truong-Cong.Lap/Downloads/Truck_Tracking.xlsx")
print(df_02)