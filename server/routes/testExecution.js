var express = require('express');
var router = express.Router();
const TestCase = require('../models/testCase');

// READ_TEST-EXECUTION : READ_TEST-EXECUTION : READ_TEST-EXECUTION : READ_TEST-EXECUTION
router.get('/testexecutiondashboard', async function(req,res,next){
    try {        
        let testExecution = await TestCase.find({}, {status: 1}).sort({_id : 'descending'})
        return res.json(testExecution)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
// Get specific test execution
router.get('/testexecution', async function(req,res,next){
    try {        
        const {tableid} = req.query
        let testExecution = await TestCase.find({testcasetable:tableid}, {status: 1}).sort({_id : 'descending'})
        return res.json(testExecution)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
// Get specific ExportData
router.get('/exportData', async function(req,res,next){
    try {        
        const {tableid} = req.query
        let exportData = await TestCase.find({testcasetable:tableid}, {status: 1,priority:1, title:1,teststep:1,precondition:1,category:1,expectations:1,description:1,results:1,assignedstaffname:1,caseid:1,_id:0}).sort({_id : 'descending'})
        return res.json(exportData)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

module.exports = router