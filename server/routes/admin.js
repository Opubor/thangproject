var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const multer  = require('multer')
const {initializeApp}  = require('firebase/app')
const {getStorage, ref, getDownloadURL, uploadBytesResumable}  = require('firebase/storage')
const { randomBytes } = require('crypto')
const fs = require('fs')
const { Staffs, getStaff } = require('../models/staffs');
const createHttpError = require("http-errors");
const TestEnvironment = require('../models/testEnvironment');
const Folders = require('../models/folders');
const TestExecution = require('../models/TestExecution');
const TestCase = require('../models/testCase');
const TestCaseTable = require('../models/testCaseTable');


// CREATE_STAFF : CREATE_STAFF : CREATE_STAFF : CREATE_STAFF
router.post('/staff', async function(req,res,next){
    try {
       const {name, phonenumber, email, role, address, password, company} = req.body
       const date = new Date();
       const uniqueid = date.getFullYear() + "-" + randomBytes(2).toString("hex")
       let usedEmail = await Staffs.findOne({email : email})
       if(usedEmail){
           return res.status(403).send('Email already in use')
       }else{
           await Staffs.create({name, phonenumber, email, role, address, password, company, uniqueid});
           return res.status(200).send('Staff created successfully')
       }
    } catch (error) {
       return res.status(401).send(error.message)
    }
})

// READ_STAFF : READ_STAFF : READ_STAFF : READ_STAFF
router.get('/staff', async function(req,res,next){
    try {
        const {edit,q,sortAsc,sortDsc} = req.query
        if(edit){
            let staffs = await Staffs.findById(edit)
            return res.json(staffs)
        }
        if(sortAsc){
            let staffs = await Staffs.find().sort({_id : sortAsc})
            return res.json(staffs)
        }
        if(sortDsc){
            let staffs = await Staffs.find().sort({_id : sortDsc})
            return res.json(staffs)
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let staffs = await Staffs.find({name:regex}).sort({_id : 'descending'})
            return res.json(staffs)
        }else{
            let staffs = await Staffs.find().sort({_id : 'descending'})
            return res.json(staffs)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

// UPDATE_STAFF
router.put('/staff/:id', async function(req, res, next) {
    try {
        const{ name, phonenumber, email, role, address, password, company } = req.body
        const id = req.params.id
        await Staffs.findByIdAndUpdate(id,{name, phonenumber, email, role, address, password, company})
        return res.status(200).send('Updated Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

// DELETE_STAFF
router.delete('/staff/:id', async function(req, res, next) {
    try {
        const id = req.params.id
        await Staffs.findByIdAndRemove(id)
        return res.status(200).send('Deleted Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

// CREATE_TEST-ENVIRONMENT : CREATE_TEST-ENVIRONMENT : CREATE_TEST-ENVIRONMENT : CREATE_TEST-ENVIRONMENT
router.post('/testenvironment', async function(req,res,next){
    try {
       const {operatingsystem, description, browser} = req.body
        await TestEnvironment.create({operatingsystem, description, browser});
        return res.status(200).send('Test environment created successfully')
    } catch (error) {
       return res.status(401).send(error.message)
    }
})

// READ_TEST-ENVIRONMENT : READ_TEST-ENVIRONMENT : READ_TEST-ENVIRONMENT : READ_TEST-ENVIRONMENT
router.get('/testenvironment', async function(req,res,next){
    try {
        const {edit,q,sortAsc,sortDsc} = req.query
        if(edit){
            let testEnvironment = await TestEnvironment.findById(edit)
            return res.json(testEnvironment)
        }
        if(sortAsc){
            let testEnvironment = await TestEnvironment.find().sort({_id : sortAsc})
            return res.json(testEnvironment)
        }
        if(sortDsc){
            let testEnvironment = await TestEnvironment.find().sort({_id : sortDsc})
            return res.json(testEnvironment)
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let testEnvironment = await TestEnvironment.find({operatingsystem:regex}).sort({_id : 'descending'})
            return res.json(testEnvironment)
        }else{
            let testEnvironment = await TestEnvironment.find().sort({_id : 'descending'})
            return res.json(testEnvironment)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

// UPDATE_TEST-ENVIRONMENT : UPDATE_TEST-ENVIRONMENT : UPDATE_TEST-ENVIRONMENT : UPDATE_TEST-ENVIRONMENT
router.put('/testenvironment/:id', async function(req, res, next) {
    try {
        const{ operatingsystem, description, browser } = req.body
        const id = req.params.id
        await TestEnvironment.findByIdAndUpdate(id,{operatingsystem, description, browser})
        return res.status(200).send('Updated Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

// DELETE_TEST-ENVIRONMENT : DELETE_TEST-ENVIRONMENT : DELETE_TEST-ENVIRONMENT : DELETE_TEST-ENVIRONMENT
router.delete('/testenvironment/:id', async function(req, res, next) {
    try {
        const id = req.params.id
        await TestEnvironment.findByIdAndRemove(id)
        return res.status(200).send('Deleted Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

// CREATE_FOLDER : CREATE_FOLDER : CREATE_FOLDER : CREATE_FOLDER
router.post('/folder', async function(req,res,next){
    try {
       const {foldername} = req.body
        await Folders.create({foldername});
        return res.status(200).send('Folder created successfully')
    } catch (error) {
       return res.status(401).send(error.message)
    }
})

// READ_FOLDERS : READ_FOLDERS : READ_FOLDERS : READ_FOLDERS
router.get('/folders', async function(req,res,next){
    try {
        const {edit,q,sortAsc,sortDsc} = req.query
        if(edit){
            let folder = await Folders.findById(edit)
            return res.json(folder)
        }
        if(sortAsc){
            let folders = await Folders.find().sort({_id : sortAsc})
            return res.json(folders)
        }
        if(sortDsc){
            let folders = await Folders.find().sort({_id : sortDsc})
            return res.json(folders)
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let folders = await Folders.find({foldername:regex}).sort({_id : 'descending'})
            return res.json(folders)
        }else{
            let folders = await Folders.find().sort({_id : 'descending'})
            return res.json(folders)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

// UPDATE_FOLDER : UPDATE_FOLDER : UPDATE_FOLDER : UPDATE_FOLDER
router.put('/folder/:id', async function(req, res, next) {
    try {
        const{ foldername } = req.body
        const id = req.params.id
        await Folders.findByIdAndUpdate(id,{foldername})
        return res.status(200).send('Updated Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

// DELETE_FOLDER : DELETE_FOLDER : DELETE_FOLDER : DELETE_FOLDER
router.delete('/folder/:id', async function(req, res, next) {
    try {
        const id = req.params.id
        await Folders.findByIdAndRemove(id)
        return res.status(200).send('Deleted Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

// CREATE_TEST-EXECUTION : CREATE_TEST-EXECUTION : CREATE_TEST-EXECUTION : CREATE_TEST-EXECUTION
router.post('/testexecution', async function(req,res,next){
    try {
       const {falsetest,pass ,cancel, block, blank} = req.body
        await TestExecution.create({falsetest,pass ,cancel, block, blank});
        return res.status(200).send('created successfully')
    } catch (error) {
       return res.status(401).send(error.message)
    }
})

// READ_TEST-EXECUTION : READ_TEST-EXECUTION : READ_TEST-EXECUTION : READ_TEST-EXECUTION
router.get('/testexecution', async function(req,res,next){
    try {
        const {edit,q,sortAsc,sortDsc} = req.query
        if(edit){
            let testExecution = await TestExecution.findById(edit)
            return res.json(testExecution)
        }
        if(sortAsc){
            let testExecution = await TestExecution.find().sort({_id : sortAsc})
            return res.json(testExecution)
        }
        if(sortDsc){
            let testExecution = await TestExecution.find().sort({_id : sortDsc})
            return res.json(testExecution)
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let testExecution = await TestExecution.find({falsetest:regex}).sort({_id : 'descending'})
            return res.json(testExecution)
        }else{
            let testExecution = await TestExecution.find().sort({_id : 'descending'})
            return res.json(testExecution)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

// UPDATE_TEST-EXECUTION : UPDATE_TEST-EXECUTION : UPDATE_TEST-EXECUTION : UPDATE_TEST-EXECUTION
router.put('/testexecution/:id', async function(req, res, next) {
    try {
        const{ falsetest,pass ,cancel, block, blank } = req.body
        const id = req.params.id
        await TestExecution.findByIdAndUpdate(id,{falsetest,pass ,cancel, block, blank})
        return res.status(200).send('Updated Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

// DELETE_TEST-EXECUTION : DELETE_TEST-EXECUTION : DELETE_TEST-EXECUTION : DELETE_TEST-EXECUTION
router.delete('/testexecution/:id', async function(req, res, next) {
    try {
        const id = req.params.id
        await TestExecution.findByIdAndRemove(id)
        return res.status(200).send('Deleted Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

// CREATE_TESTCASE-TABLE : CREATE_TESTCASE-TABLE : CREATE_TESTCASE-TABLE : CREATE_TESTCASE-TABLE
router.post('/testcasetable', async function(req,res,next){
    try {
       const {tablename,description,attachments,date,precondition,version,assignedfolderId} = req.body
        await TestCaseTable.create({tablename,description,attachments,date,precondition,version,assignedfolderId});
        return res.status(200).send('Test case Table created successfully')
    } catch (error) {
       return res.status(401).send(error.message)
    }
})
// READ_TESTCASE-TABLE : READ_TESTCASE-TABLE : READ_TESTCASE-TABLE : READ_TESTCASE-TABLE
router.get('/testcasetable', async function(req,res,next){
    try {
        const {edit,q,sortAsc,sortDsc} = req.query
        if(edit){
            let testCaseTable = await TestCaseTable.findById(edit)
            return res.json(testCaseTable)
        }
        if(sortAsc){
            let testCaseTable = await TestCaseTable.find().sort({_id : sortAsc})
            return res.json(testCaseTable)
        }
        if(sortDsc){
            let testCaseTable = await TestCaseTable.find().sort({_id : sortDsc})
            return res.json(testCaseTable)
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let testCaseTable = await TestCaseTable.find({filename:regex}).sort({_id : 'descending'})
            return res.json(testCaseTable)
        }else{
            let testCaseTable = await TestCaseTable.find().sort({_id : 'descending'})
            return res.json(testCaseTable)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
// UPDATE_TESTCASE-TABLE : UPDATE_TESTCASE-TABLE : UPDATE_TESTCASE-TABLE : UPDATE_TESTCASE-TABLE
router.put('/testcasetable/:id', async function(req, res, next) {
    try {
        const{ tablename,description,attachments,date,precondition,version,assignedfolderId } = req.body
        const id = req.params.id
        await TestCaseTable.findByIdAndUpdate(id,{tablename,description,attachments,date,precondition,version,assignedfolderId})
        return res.status(200).send('Updated Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});
// DELETE_TESTCASE-TABLE : DELETE_TESTCASE-TABLE : DELETE_TESTCASE-TABLE : DELETE_TESTCASE-TABLE
router.delete('/testcasetable/:id', async function(req, res, next) {
    try {
        const id = req.params.id
        await TestCaseTable.findByIdAndRemove(id)
        return res.status(200).send('Deleted Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});


// CREATE_TEST-CASE : CREATE_TEST-CASE : CREATE_TEST-CASE : CREATE_TEST-CASE
router.post('/testcase', async function(req,res,next){
    try {
       const {priority,filename ,title, teststep, precondition, description, category, statuscase, version, results, expectations, date} = req.body
        await TestCase.create({priority,filename ,title, teststep, precondition, description, category, statuscase, version, results, expectations, date});
        return res.status(200).send('Test case created successfully')
    } catch (error) {
       return res.status(401).send(error.message)
    }
})
// READ_TEST-CASE : READ_TEST-CASE : READ_TEST-CASE : READ_TEST-CASE
router.get('/testcase', async function(req,res,next){
    try {
        const {edit,q,sortAsc,sortDsc} = req.query
        if(edit){
            let testCase = await TestCase.findById(edit)
            return res.json(testCase)
        }
        if(sortAsc){
            let testCase = await TestCase.find().sort({_id : sortAsc})
            return res.json(testCase)
        }
        if(sortDsc){
            let testCase = await TestCase.find().sort({_id : sortDsc})
            return res.json(testCase)
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let testCase = await TestCase.find({tablename:regex}).sort({_id : 'descending'})
            return res.json(testCase)
        }else{
            let testCase = await TestCase.find().sort({_id : 'descending'})
            return res.json(testCase)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
// UPDATE_TEST-CASE : UPDATE_TEST-CASE : UPDATE_TEST-CASE : UPDATE_TEST-CASE
router.put('/testcase/:id', async function(req, res, next) {
    try {
        const{ priority,filename ,title, teststep, precondition, description, category, statuscase, version, results, expectations, date } = req.body
        const id = req.params.id
        await TestCase.findByIdAndUpdate(id,{priority,filename ,title, teststep, precondition, description, category, statuscase, version, results, expectations, date})
        return res.status(200).send('Updated Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});
// DELETE_TEST-CASE : DELETE_TEST-CASE : DELETE_TEST-CASE : DELETE_TEST-CASE
router.delete('/testcase/:id', async function(req, res, next) {
    try {
        const id = req.params.id
        await TestCase.findByIdAndRemove(id)
        return res.status(200).send('Deleted Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

module.exports = router