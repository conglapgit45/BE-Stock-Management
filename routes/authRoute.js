
const express = require('express')
const Router = express.Router()
const {LoginAPI} = require('../controllers/loginAPI')
const {LogoutAPI} = require('../controllers/logoutAPI')
const {LoggedinAPI} = require('../controllers/loggedinAPI')
const {OperationAPI} = require('../controllers/operationAPI')
const {LocationAPI} = require('../controllers/locationAPI')
const {AllLocationAPI} = require('../controllers/allLocationAPI')
const {TransferAPI} = require('../controllers/transferAPI')
const {InsertDataAPI} = require('../controllers/insertDataAPI')
const {DeleteAllDataAPI} = require('../controllers/deleteAllDataAPI')
const {AuthChecking} = require('../middleWares/authChecker')


Router.route('/login').post(LoginAPI)
Router.route('/logout').post(LogoutAPI)
Router.route('/loggedin').get(LoggedinAPI)
Router.route('/operation').post(AuthChecking, OperationAPI)
Router.route('/location').post(LocationAPI)
Router.route('/alllocation').get(AllLocationAPI)
Router.route('/transfer').post(TransferAPI)
Router.route('/report').post(AuthChecking, ReportAPI)
Router.route('/insertdata').get(InsertDataAPI)
Router.route('/deletealldata').get(DeleteAllDataAPI)


module.exports = Router;