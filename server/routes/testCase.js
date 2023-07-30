var express = require('express');
const Folders = require('../models/folders');
var router = express.Router();
const TestCase = require('../models/testCase');
const TestCaseTable = require('../models/testCaseTable');
const { testCaseValidator } = require('../validators/validators');
const createHttpError = require("http-errors");
const XLSX = require("xlsx");
const { Staffs, getStaff } = require('../models/staffs');
const multer  = require('multer')
const csv = require("csvtojson");


/**
 * @swagger
 * components:
 *  schemas:
 *      TestCase: 
 *          type: object
 *          required:
 *              -testcasetable
 *              -assignedfolderId
 *              -priority
 *              -title
 *              -teststep
 *              -precondition
 *              -category
 *              -status
 *              -expectations
 *              -assignedstaff
 *              -testcaseid
 *          properties:
 *              _id: 
 *                  type: string
 *                  description: Auto generated id of a Test case
 *              testcasetable: 
 *                  type: string
 *                  description: Test case table in which test case was created
 *              assignedfolderId: 
 *                  type: string
 *                  description: Folder Id in which test case was created
 *              priority: 
 *                  type: string
 *                  description: Priority of test case which can be either high medium or low
 *              title: 
 *                  type: string
 *                  description: Title of test case
 *              teststep: 
 *                  type: string
 *                  description: Steps taken in carrying out test case
 *              precondition: 
 *                  type: string
 *                  description: Precondition of test case gotten from test environments
 *              category: 
 *                  type: string
 *                  description: Category of test case
 *              status: 
 *                  type: string
 *                  description: Status of test case which can be either Pass Fail Cancel Block or Blank
 *              expectations: 
 *                  type: string
 *                  description: What is expected after test case has been carried out
 *              assignedstaff: 
 *                  type: string
 *                  description: Staff who the test case was assigned to
 *              testcaseid: 
 *                  type: object
 *                  description: Generated Id for test case from system
 *              results: 
 *                  type: object
 *                  description: Results gotten after test case has been carried out
 *              description: 
 *                  type: object
 *                  description: Description of the entire process
 *          example:
 *              _id: oijsai202490480
 *              testcasetable: sdbqw23992rbfws2rdws
 *              assignedfolderId: qdiwuic9328erfwsz 
 *              priority: Medium
 *              title: For cars
 *              teststep: Login Logout Reboot
 *              precondition: Safari
 *              category: For Automobiles
 *              status: Pass
 *              expectations: For the system to work perfectly well
 *              assignedstaff: dacuiiu2288r223e
 *              testcaseid: File 1-1
 *              results: The system worked perfectly well
 *              description: The process went on really smoothly       
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: TestCases
 *      description: Test case api
 */

// CREATE
/**
 * @swagger
 * /testcase:
 *  post: 
 *      summary: Create a test case
 *      tags: [TestCases]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TestCase'
 *      responses:
 *          200:
 *              description: Test Case added successful
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TestCase'
 *          500:
 *              description: Some server error
 *      
 */

// CREATE_TEST-CASE : CREATE_TEST-CASE : CREATE_TEST-CASE : CREATE_TEST-CASE
router.post('/testcase', async function(req,res,next){
    try {
       const {testcasetable,assignedfolderId ,priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff} = req.body
       const {error} = testCaseValidator.validate({testcasetable,assignedfolderId ,priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff})
       if (error) throw new createHttpError.BadRequest(error.details[0].message);
       let latestCase = await TestCase.find({testcasetable:testcasetable}, {caseid: 1,_id: 0}).sort({_id : 'descending'}).limit(1)        
       let assignedtable = []
        if (testcasetable.match(/^[0-9a-fA-F]{24}$/)) {
        assignedtable = await TestCaseTable.findOne({_id: testcasetable})
        } 
        let tablename = assignedtable.tablename

        let caseid = ""
       if(latestCase.length > 0){
        latestCase.map((data, i) =>{
            return(
                data.caseid ? caseid = `${tablename}-${Number(data.caseid.split('-').pop()) + 1}` : caseid = `${tablename}-${1}`
            )
        })
       }else{
         caseid = `${tablename}-${1}`
       }
        let testcase = await TestCase.create({caseid,testcasetable,assignedfolderId ,priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff});
        let staff = []
        if (assignedstaff.match(/^[0-9a-fA-F]{24}$/)) {
            staff =  await Staffs.findOne({_id : assignedstaff})
        } 
        testcase.staff = staff
        testcase.assignedstaffname = staff.name
        testcase.save()
        let assignedfolder = []
        if (assignedfolderId.match(/^[0-9a-fA-F]{24}$/)) {
            assignedfolder = await Folders.findOne({_id: assignedfolderId})
        } 
        if(assignedtable && assignedfolder){
            assignedtable.testcases.push(testcase)
            assignedtable.save()
            assignedfolder.testcases.push(testcase)
            assignedfolder.save()
            return res.status(200).send('Test case created successfully')
        }else{
            return res.status(401).send("error")
        }       
    } catch (error) {
       return res.status(401).send(error.message)
    }
})

/**
 * @swagger
 * /testcase: 
 *   get:
 *      summary: Returns the list of all the Test cases
 *      tags: [TestCases]
 *      responses:
 *          200: 
 *              description: The list of all the test cases
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/TestCase' 
 * 
 */

/**
 * @swagger
 * /testcase?edit:
 *    get:
 *      summary: Get a test case by Id
 *      tags: [TestCases]
 *      parameters:
 *        - in: query
 *          name: edit
 *          schema:
 *              type: string
 *          required: true
 *          description: The test case Id
 *      responses:
 *          200:
 *              description: The current test case
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/TestCase'
 *          404: 
 *               description: Test case not found 
 * 
 */


// READ_TEST-CASE : READ_TEST-CASE : READ_TEST-CASE : READ_TEST-CASE
router.get('/testcase', async function(req,res,next){
    try {
        const {edit,q,tableid,sortHigh,sortMedium,sortLow,sortAsc,sortDsc,filterPriority,filterCategory,filterStaff} = req.query
        let populate = ['testtable', 'staff']
        if(edit){
            let testCase = await TestCase.findById(edit).populate(populate)
            return res.json(testCase)
        }
        if(sortHigh){
            let testCase = await TestCase.find({priority:"High"}).sort({_id : 'descending'}).populate(populate)
            console.log(testCase)
            return res.json(testCase)
        }
        if(sortMedium){
            let testCase = await TestCase.find({priority:"Medium"}).sort({_id : 'descending'}).populate(populate)
            return res.json(testCase)
        }
        if(sortLow){
            let testCase = await TestCase.find({priority:"Low"}).sort({_id : 'descending'}).populate(populate)
            return res.json(testCase)
        }

        if(sortAsc){
            let testCase = await TestCase.find({testcasetable:tableid}).sort({_id : sortAsc}).populate(populate)
            return res.json(testCase)
        }
        if(sortDsc){
            let testCase = await TestCase.find({testcasetable:tableid}).sort({_id : sortDsc}).populate(populate)
            return res.json(testCase)
        }

        if(filterPriority || filterCategory || filterStaff){
            var category = new RegExp(filterCategory, "i")
            if(filterPriority && filterCategory){
                let testCase = await TestCase.find({testcasetable:tableid, priority: filterPriority, category: category}).sort({_id : 'descending'}).populate(populate)
                return res.json(testCase)
            }else if(filterPriority && filterStaff){
                let testCase = await TestCase.find({testcasetable:tableid, priority: filterPriority, assignedstaff: filterStaff}).sort({_id : 'descending'}).populate(populate)
                return res.json(testCase)
            }else if(filterCategory && filterStaff){
                let testCase = await TestCase.find({testcasetable:tableid, category: category, assignedstaff: filterStaff}).sort({_id : 'descending'}).populate(populate)
                return res.json(testCase)
            }else if(filterPriority && filterCategory && filterStaff){
                let testCase = await TestCase.find({testcasetable:tableid, priority: filterPriority, category: category, assignedstaff: filterStaff}).sort({_id : 'descending'}).populate(populate)
                return res.json(testCase)
            }else if(filterPriority){
                let testCase = await TestCase.find({testcasetable:tableid, priority: filterPriority}).sort({_id : 'descending'}).populate(populate)
                return res.json(testCase)
            }else if(filterCategory){
                let testCase = await TestCase.find({testcasetable:tableid, category: category}).sort({_id : 'descending'}).populate(populate)
                return res.json(testCase)
            }else if(filterStaff){
                let testCase = await TestCase.find({testcasetable:tableid, assignedstaff: filterStaff}).sort({_id : 'descending'}).populate(populate)
                return res.json(testCase)
            } 
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let testCase = await TestCase.find({title:regex,testcasetable:tableid}).sort({_id : 'descending'}).populate(populate)
            return res.json(testCase)
        }else{
            let testCase = await TestCase.find({testcasetable:tableid}).sort({_id : 'descending'}).populate(populate)
            return res.json(testCase)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})
// GET ALL TEST CASES
router.get('/alltestcase', async function(req,res,next){
    try { 
        let populate = "testtable"
        let testCase = await TestCase.find().sort({_id : 'descending'}).populate(populate)
        return res.json(testCase)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

/**
 * @swagger
 * /testcase/{id}:
 *  put:
 *      summary: Update test case by Id
 *      tags: [TestCases]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The test case Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/TestCase'
 *      responses:
 *          200:
 *              description: Test case updated successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TestCase'
 *          404:
 *              description: Test case not found
 *          500:
 *              description: Server Error
 */

// UPDATE_TEST-CASE : UPDATE_TEST-CASE : UPDATE_TEST-CASE : UPDATE_TEST-CASE
router.put('/testcase/:id', async function(req, res, next) {
    try {
        const{ testcasetable,assignedfolderId ,priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff } = req.body
        const id = req.params.id
        // const {error} = testCaseValidator.validate({testcasetable,assignedfolderId ,priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff})
        // if (error) throw new createHttpError.BadRequest(error.details[0].message);
        let testcase =  await TestCase.findByIdAndUpdate(id,{priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff})
        let staff = []
        if(assignedstaff){
            if (assignedstaff.match(/^[0-9a-fA-F]{24}$/)) {
                staff =  await Staffs.findOne({_id : assignedstaff})
                testcase.staff = staff
                testcase.assignedstaffname = staff.name
                testcase.save()
            } 
        }
        
        return res.status(200).send('Updated Successfully')
    } catch (error) {
        console.log(error.message)
        return res.status(401).send(error.message)
    }
});

/**
 * @swagger
 * /testcase/{id}:
 *  delete:
 *      summary: Delete test case Id
 *      tags: [TestCases]
 *      parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The test case Id
 *      responses:
 *          200:
 *              description: Test case deleted successfully
 *          404: 
 *              description: Test case not found
 * 
 */

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


const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"./uploads");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage
})
router.post('/importTestCase', upload.single('importFile'), async function(req,res,next){
    try {
        const {testcasetable, assignedfolderId} = req.query
        const jsonArray = await csv().fromFile(req.file.path);
        let testcase = jsonArray.map((item) => {
            return {
                caseid: item.ID,
                priority: item.Priority,
                title: item.Title,
                category: item.Category,
                expectations: item.Expectation,
                teststep: item["Test Steps"],
                precondition: item.Precondition,
                status: item["Status case"] ? item["Status case"]  : "Blank",
                assignedstaffname: item["Assigned"],
                description: item.Description,
                results: item.Result,
                testcasetable: testcasetable,
                assignedfolderId: assignedfolderId,
            };
         });
         let importedFile = await TestCase.insertMany(testcase)
         return res.send(importedFile)
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

module.exports = router