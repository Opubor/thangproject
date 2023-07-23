var express = require('express');
var router = express.Router();
const Folders = require('../models/folders');
const TestCaseTable = require('../models/testCaseTable');
const { testCaseTableValidator } = require('../validators/validators');
const createHttpError = require("http-errors");
const multer  = require('multer')
const {initializeApp}  = require('firebase/app')
const {getStorage, ref, getDownloadURL, uploadBytesResumable}  = require('firebase/storage')

/**
 * @swagger
 * components:
 *  schemas:
 *      TestCaseTable: 
 *          type: object
 *          required:
 *              -tablename
 *              -description
 *              -date
 *              -precondition
 *              -version
 *              -assignedfolderId
 *          properties:
 *              _id: 
 *                  type: string
 *                  description: Auto generated id of a Test case Table
 *              tablename: 
 *                  type: string
 *                  description: Name of a table
 *              description: 
 *                  type: string
 *                  description: Description of a table table
 *              date: 
 *                  type: string
 *                  description: Date which test case table was created
 *              precondition: 
 *                  type: string
 *                  description: Pre-condition for test table
 *              version: 
 *                  type: string
 *                  description: Current Version of test table
 *              assignedfolderId: 
 *                  type: string
 *                  description: Folder which test table was created
 *              attachments: 
 *                  type: object
 *                  description: Csv file
 *              testcases: 
 *                  type: object
 *                  description: Test cases inside test table       
 *          example:
 *              _id: oijsai202490480
 *              tablename: Table 1
 *              description: For cars and automobiles
 *              date: 01/20/2001
 *              precondition: Window
 *              version: 1.0
 *              assignedfolderId: sjqw8023u4urf9w3rijs
 *              attachments: https://firebase/adbwiufu342
 *              testcases: [{"eiuw2ui23j22j3ub42u","sqdui3829322iud"}]        
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: TestCaseTables
 *      description: Test case tables api
 */

// CREATE
/**
 * @swagger
 * /testcasetable:
 *  post: 
 *      summary: Create a Table
 *      tags: [TestCaseTables]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TestCaseTable'
 *      responses:
 *          200:
 *              description: Test case table added successful
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TestCaseTable'
 *          500:
 *              description: Some server error
 *      
 */

// FIRE-BASE : FIRE-BASE : FIRE-BASE : FIRE-BASE
const firebaseConfig = {
    apiKey: "AIzaSyAGXnNtimtVDa4b2yCMOe7WzYVZQ1zrLEU",
    authDomain: "thang-mgt.firebaseapp.com",
    projectId: "thang-mgt",
    storageBucket: "thang-mgt.appspot.com",
    messagingSenderId: "941055703089",
    appId: "1:941055703089:web:38e659f79027eec381fd10"
  };
initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({storage: multer.memoryStorage()});

// CREATE_TESTCASE-TABLE : CREATE_TESTCASE-TABLE : CREATE_TESTCASE-TABLE : CREATE_TESTCASE-TABLE
// router.post('/testcasetable', async function(req,res,next){
//     try {
//        const {tablename,description,attachments,date,precondition,version,assignedfolderId} = req.body
//     //    error checking
//        const {error} = testCaseTableValidator.validate({tablename,description,attachments,date,precondition,version,assignedfolderId})
//        if (error) throw new createHttpError.BadRequest(error.details[0].message);
//     //    ==============
//         let table = await TestCaseTable.create({tablename,description,attachments,date,precondition,version,assignedfolderId});
//         let assignedfolder = []
//         if (assignedfolderId.match(/^[0-9a-fA-F]{24}$/)) {
//             assignedfolder = await Folders.findOne({_id: assignedfolderId})
//         } 
//         if(assignedfolder){
//             assignedfolder.testtables.push(table)
//             assignedfolder.save()
//             return res.status(200).send('Test case Table created successfully')
//         }else{
//             return res.send('error')
//         }   
//     } catch (error) {
//        return res.status(401).send(error.message)
//     }
// })
// TESCASETABLE CSV
router.post('/testcasetable',upload.single('testcasetablecsv'), async function(req, res, next) {
    try {
        const {tablename,description,attachments,date,precondition,version,assignedfolderId} = req.query
        let fileInput = req.file
        if(fileInput){
            const storageRef = ref(storage, `files/${req.file.originalname + " " + tablename}`)
            const metadata = {
                contentType: req.file.mimetype
            }
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            const attachments = await getDownloadURL(snapshot.ref)
            let table = await TestCaseTable.create({tablename,description,attachments,date,precondition,version,assignedfolderId})
            let assignedfolder = []
            if (assignedfolderId.match(/^[0-9a-fA-F]{24}$/)) {
                assignedfolder = await Folders.findOne({_id: assignedfolderId})
            } 
            if(assignedfolder){
                assignedfolder.testtables.push(table)
                assignedfolder.save()
                return res.status(200).send('Test case Table created successfully')
            }else{
                return res.send('error')
            }   
        }else{
            let table = await TestCaseTable.create({tablename,description,date,precondition,version,assignedfolderId})
            let assignedfolder = []
            if (assignedfolderId.match(/^[0-9a-fA-F]{24}$/)) {
                assignedfolder = await Folders.findOne({_id: assignedfolderId})
            } 
            if(assignedfolder){
                assignedfolder.testtables.push(table)
                assignedfolder.save()
                return res.status(200).send('Test case Table created successfully')
            }else{
                return res.send('error')
            }   
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

/**
 * @swagger
 * /testcasetable: 
 *   get:
 *      summary: Returns the list of all the test case tables
 *      tags: [TestCaseTables]
 *      responses:
 *          200: 
 *              description: The list of all the test case tables
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/TestCaseTable' 
 * 
 */

/**
 * @swagger
 * /testcasetable?edit:
 *    get:
 *      summary: Get a test case table by Id
 *      tags: [TestCaseTables]
 *      parameters:
 *        - in: query
 *          name: edit
 *          schema:
 *              type: string
 *          required: true
 *          description: The test case table Id
 *      responses:
 *          200:
 *              description: The current test case table
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/TestCaseTable'
 *          404: 
 *               description: Test case table not found 
 * 
 */


// READ_TESTCASE-TABLE : READ_TESTCASE-TABLE : READ_TESTCASE-TABLE : READ_TESTCASE-TABLE
router.get('/testcasetable', async function(req,res,next){
    try {
        const {edit,q,tableid,sortAsc,sortDsc} = req.query
        let populate = "testcases"
        if(edit){
            let testCaseTable = await TestCaseTable.findById(edit).populate(populate)
            return res.json(testCaseTable)
        }
        if(sortAsc){
            let testCaseTable = await TestCaseTable.find().sort({_id : sortAsc}).populate(populate)
            return res.json(testCaseTable)
        }
        if(sortDsc){
            let testCaseTable = await TestCaseTable.find().sort({_id : sortDsc}).populate(populate)
            return res.json(testCaseTable)
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let testCaseTable = await TestCaseTable.find({_id:tableid}).sort({_id : 'descending'}).populate(populate)
            console.log(testCaseTable)
            return res.json(testCaseTable)
        }else{
            let testCaseTable = await TestCaseTable.find().sort({_id : 'descending'}).populate(populate)
            return res.json(testCaseTable)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

/**
 * @swagger
 * /testcasetable/{id}:
 *  put:
 *      summary: Update test case table by Id
 *      tags: [TestCaseTables]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The test case table Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/TestCaseTable'
 *      responses:
 *          200:
 *              description: Test case table updated successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TestCaseTable'
 *          404:
 *              description: Test case table not found
 *          500:
 *              description: Server Error
 */

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

/**
 * @swagger
 * /testcasetable/{id}:
 *  delete:
 *      summary: Delete test case table Id
 *      tags: [TestCaseTables]
 *      parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The test case table Id
 *      responses:
 *          200:
 *              description: Test case table deleted successfully
 *          404: 
 *              description: Test case table not found
 * 
 */


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


module.exports = router