var express = require('express');
var router = express.Router();
const TestEnvironment = require('../models/testEnvironment');
const { testEnvironmentValidator } = require('../validators/validators');
const createHttpError = require("http-errors");

/**
 * @swagger
 * components:
 *  schemas:
 *      TestEnvironment: 
 *          type: object
 *          required:
 *              -operatingsystem
 *              -description
 *              -browser
 *          properties:
 *              _id: 
 *                  type: string
 *                  description: Auto generated id of a test environment
 *              operatingsystem: 
 *                  type: string
 *                  description: Operating system of test environment
 *              description: 
 *                  type: string
 *                  description: description of test environment
 *              browser: 
 *                  type: string
 *                  description: description used for test environment
 *          example:
 *              _id: oijsai202490480
 *              operatingsystem: Windows
 *              description: Popular for web developers
 *              browser: Edge/Chrome
 *              
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: TestEnvironments
 *      description: Test Environments api
 */

// CREATE
/**
 * @swagger
 * /testenvironment:
 *  post: 
 *      summary: Create a new test environment
 *      tags: [TestEnvironments]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TestEnvironment'
 *      responses:
 *          200:
 *              description: Test Environment added successful
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TestEnvironment'
 *          500:
 *              description: Some server error
 *      
 */

// CREATE_TEST-ENVIRONMENT : CREATE_TEST-ENVIRONMENT : CREATE_TEST-ENVIRONMENT : CREATE_TEST-ENVIRONMENT
router.post('/testenvironment', async function(req,res,next){
    try {
       const {operatingsystem, description, browser} = req.body
       const {error} = testEnvironmentValidator.validate({operatingsystem, description, browser})
       if (error) throw new createHttpError.BadRequest(error.details[0].message);
        await TestEnvironment.create({operatingsystem, description, browser});
        return res.status(200).send('Test environment created successfully')
    } catch (error) {
       return res.status(401).send(error.message)
    }
})

/**
 * @swagger
 * /testenvironment: 
 *   get:
 *      summary: Returns the list of all the testenvironment
 *      tags: [TestEnvironments]
 *      responses:
 *          200: 
 *              description: The list of all the test environments
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/TestEnvironment' 
 * 
 */

/**
 * @swagger
 * /testenvironment?edit:
 *    get:
 *      summary: Get a test environment by Id
 *      tags: [TestEnvironments]
 *      parameters:
 *        - in: query
 *          name: edit
 *          schema:
 *              type: string
 *          required: true
 *          description: The test environment Id
 *      responses:
 *          200:
 *              description: The current test environment
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/TestEnvironment'
 *          404: 
 *               description: Test environment not found 
 * 
 */


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

/**
 * @swagger
 * /testenvironment/{id}:
 *  put:
 *      summary: Update test environment by Id
 *      tags: [TestEnvironments]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The test environment Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/TestEnvironment'
 *      responses:
 *          200:
 *              description: Test environment updated successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TestEnvironment'
 *          404:
 *              description: Test environment not found
 *          500:
 *              description: Server Error
 */

// UPDATE_TEST-ENVIRONMENT : UPDATE_TEST-ENVIRONMENT : UPDATE_TEST-ENVIRONMENT : UPDATE_TEST-ENVIRONMENT
router.put('/testenvironment/:id', async function(req, res, next) {
    try {
        const{ operatingsystem, description, browser } = req.body
        const id = req.params.id
        const {error} = testEnvironmentValidator.validate({operatingsystem, description, browser})
        if (error) throw new createHttpError.BadRequest(error.details[0].message);
        await TestEnvironment.findByIdAndUpdate(id,{operatingsystem, description, browser})
        return res.status(200).send('Updated Successfully')
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

/**
 * @swagger
 * /testenvironment/{id}:
 *  delete:
 *      summary: Delete test environment Id
 *      tags: [TestEnvironments]
 *      parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The test environment Id
 *      responses:
 *          200:
 *              description: Testenvironment deleted successfully
 *          404: 
 *              description: Test environment not found
 * 
 */

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

module.exports = router