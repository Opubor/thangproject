var express = require('express');
var router = express.Router();
const Folders = require('../models/folders');
const { folderValidator } = require('../validators/validators');
const createHttpError = require("http-errors");

/**
 * @swagger
 * components:
 *  schemas:
 *      Folder: 
 *          type: object
 *          required:
 *              -foldername
 *          properties:
 *              _id: 
 *                  type: string
 *                  description: Auto generated id of a folder
 *              foldername: 
 *                  type: string
 *                  description: Name of a folder
 *              testtables: 
 *                  type: object
 *                  description: Test case tables in a folder
 *          example:
 *              _id: oijsai202490480
 *              foldername: Folder 1
 *              testtables: [{"eiuw2ui23j22j3ub42u","sqdui3829322iud"}]
 *              
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: Folders
 *      description: Folders api
 */

// CREATE
/**
 * @swagger
 * /folder:
 *  post: 
 *      summary: Create a new folder
 *      tags: [Folders]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Folder'
 *      responses:
 *          200:
 *              description: Folder added successful
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Folder'
 *          500:
 *              description: Some server error
 *      
 */

// CREATE_FOLDER : CREATE_FOLDER : CREATE_FOLDER : CREATE_FOLDER
router.post('/folder', async function(req,res,next){
    try {
       const {foldername} = req.body
       const {error} = folderValidator.validate({foldername})
        if (error) throw new createHttpError.BadRequest(error.details[0].message);
       let usedName = await Folders.findOne({foldername : foldername})
        if(usedName){
            return res.status(403).send('Name already in use')
        }else{
            await Folders.create({foldername});
            return res.status(200).send('Folder created successfully')
        }
    } catch (error) {
       return res.status(401).send(error.message)
    }
})


/**
 * @swagger
 * /folders: 
 *   get:
 *      summary: Returns the list of all the folders
 *      tags: [Folders]
 *      responses:
 *          200: 
 *              description: The list of all the folders
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Folder' 
 * 
 */

/**
 * @swagger
 * /folders?edit:
 *    get:
 *      summary: Get a folder by Id
 *      tags: [Folders]
 *      parameters:
 *        - in: query
 *          name: edit
 *          schema:
 *              type: string
 *          required: true
 *          description: The folder Id
 *      responses:
 *          200:
 *              description: The current folder
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Folder'
 *          404: 
 *               description: Folder not found 
 * 
 */


// READ_FOLDERS : READ_FOLDERS : READ_FOLDERS : READ_FOLDERS
router.get('/folders', async function(req,res,next){
    try {
        const {edit,q,sortAsc,sortDsc} = req.query
        let populate = "testtables"
        if(edit){
            let folder = await Folders.findById(edit).populate(populate)
            return res.json(folder)
        }
        if(sortAsc){
            let folders = await Folders.find().sort({_id : sortAsc}).populate(populate)
            return res.json(folders)
        }
        if(sortDsc){
            let folders = await Folders.find().sort({_id : sortDsc}).populate(populate)
            return res.json(folders)
        }
        
        if(q){
            var regex = new RegExp(q, "i")
            let folders = await Folders.find({foldername:regex}).sort({_id : 'ascending'}).populate(populate)
            return res.json(folders)
        }else{
            let folders = await Folders.find().sort({_id : 'ascending'}).populate(populate)
            return res.json(folders)
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})


/**
 * @swagger
 * /folder/{id}:
 *  put:
 *      summary: Update folder by Id
 *      tags: [Folders]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The folder Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Folder'
 *      responses:
 *          200:
 *              description: Folder updated successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Folder'
 *          404:
 *              description: Folder not found
 *          500:
 *              description: Server Error
 */

// UPDATE_FOLDER : UPDATE_FOLDER : UPDATE_FOLDER : UPDATE_FOLDER
router.put('/folder/:id', async function(req, res, next) {
    try {
        const{ foldername } = req.body
        const id = req.params.id
        const {error} = folderValidator.validate({foldername})
        if (error) throw new createHttpError.BadRequest(error.details[0].message);
        let usedName = await Folders.findOne({foldername : foldername})
        if(usedName){
            return res.status(403).send('Name already in use')
        }else{
            await Folders.findByIdAndUpdate(id,{foldername})
        return res.status(200).send('Updated Successfully')
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
});

/**
 * @swagger
 * /folder/{id}:
 *  delete:
 *      summary: Delete folder Id
 *      tags: [Folders]
 *      parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The folder Id
 *      responses:
 *          200:
 *              description: Folder deleted successfully
 *          404: 
 *              description: Folder not found
 * 
 */

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

module.exports = router