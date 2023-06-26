var express = require('express');
var router = express.Router();
const TestCase = require('../models/testCase');
const TestCaseTable = require('../models/testCaseTable');

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
 *                  description: Status of test case which can be either Pass False Cancel Block or Blank
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
        let testcase = await TestCase.create({testcasetable,assignedfolderId ,priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff});
        let assignedtable = []
        if (testcasetable.match(/^[0-9a-fA-F]{24}$/)) {
            assignedtable = await TestCaseTable.findOne({_id: testcasetable})
        } 
        if(assignedtable){
            assignedtable.testcases.push(testcase)
            assignedtable.save()
            return res.status(200).send('Test case created successfully')
        }else{
            return res.send('error')
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
        const{ priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff, testcaseid } = req.body
        const id = req.params.id
        await TestCase.findByIdAndUpdate(id,{priority, title, teststep,precondition, description, category, status, results, expectations, assignedstaff, testcaseid})
        return res.status(200).send('Updated Successfully')
    } catch (error) {
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


module.exports = router