const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const loginValidator = Joi.object({
    email: Joi.string().email().max(200).required().messages({'string.empty': 'Please provide an Email'}),
    password: Joi.string().max(200).required().messages({'string.empty': 'Please provide a Password'})
});

const staffValidator = Joi.object({
    name: Joi.string().max(200).required().messages({'string.empty': 'Please provide a name'}),
    email: Joi.string().email().max(200).required().messages({'string.empty': 'Email is required'}),
    company: Joi.string().max(200).required().messages({'string.empty': 'Please provide a company'}),
    password: Joi.string().min(5).max(30).required().messages({'string.empty': 'Password is required'}),
    role: Joi.string().min(0).max(30).messages({'string.empty': 'Role is required'})
});

const UpdatePasswordValidator = Joi.object({
    oldpassword: Joi.string().max(200).required().messages({'string.empty': 'Old password is required'}),
    newpassword: Joi.string().max(200).required().messages({'string.empty': 'New password is required'}),
    confirmnewpassword: Joi.string().max(200).required().messages({'string.empty': 'Please re-enter your new password'}),
});

const folderValidator = Joi.object({
    foldername: Joi.string().max(200).required().messages({'string.empty': 'Please provide the facility name'}),
});

const testCaseValidator = Joi.object({
    testcasetable: Joi.string().max(200).required().messages({'string.empty': 'Select a table'}),
    assignedfolderId: Joi.string().max(200).required().messages({'string.empty': 'Select a Folder'}),
    priority: Joi.string().max(200).required().messages({'string.empty': 'Select a priority'}),
    title: Joi.string().max(200).required().messages({'string.empty': 'Title is required'}),
    teststep: Joi.string().max(200).required().messages({'string.empty': 'Test step is required'}),
    precondition: Joi.string().max(200).required().messages({'string.empty': 'Select a precondition'}),
    expectations: Joi.string().max(200).required().messages({'string.empty': 'Expectations is required'}),
    category: Joi.string().max(200).required().messages({'string.empty': 'Category is required'}),
    results: Joi.string().max(200).min(0).messages({'string.empty': 'Results is required'}),
    status: Joi.string().max(200).min(0).messages({'string.empty': 'Test status is required'}),
    description: Joi.string().max(200).min(0).messages({'string.empty': 'Description is required'}),
    assignedstaff: Joi.string().max(200).min(0).messages({'string.empty': 'Assigned staff is a required field'}),
});

const testCaseTableValidator = Joi.object({
    tablename: Joi.string().max(200).required().messages({'string.empty': 'Table name is required'}),
    description: Joi.string().max(200).required().messages({'string.empty': 'Description is required'}),
    date: Joi.string().max(200).required().messages({'string.empty': 'Please choose a date'}),
    precondition: Joi.string().max(200).required().messages({'string.empty': 'Select a precondition'}),
    version: Joi.string().max(200).required().messages({'string.empty': 'Version is required'}),
    assignedfolderId: Joi.string().max(200).required().messages({'string.empty': 'Select a Folder'}),
    attachments: Joi.string().max(200).min(0).messages({'string.empty': 'Select a Folder'}),
});

const testEnvironmentValidator = Joi.object({
    operatingsystem: Joi.string().max(200).required().messages({'string.empty': 'Table name is required'}),
    description: Joi.string().max(200).required().messages({'string.empty': 'Description is required'}),
    browser: Joi.string().max(200).required().messages({'string.empty': 'Browser is required'}),
});

const forgotPasswordValidator = Joi.object({
    email: Joi.string().email().max(200).required().messages({'string.empty': 'Please provide an Email'}),
});

const resetPasswordValidator = Joi.object({
    password: Joi.string().max(200).required().messages({'string.empty': 'Please enter your new Password'})
});


module.exports={loginValidator, staffValidator, folderValidator, UpdatePasswordValidator,testCaseValidator,testCaseTableValidator,testEnvironmentValidator,forgotPasswordValidator,resetPasswordValidator}