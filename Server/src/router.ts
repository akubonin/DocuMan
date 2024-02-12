import express, { NextFunction, Router } from 'express';
import analyseDoc from '../src/Controllers/image-analyser-controller.js'
import upload from '../src/Controllers/image-upload-controller.js'
import getStatusOfDocuments from '../src/Controllers/status-of-documents-controller.js'
import getAllDocuments from '../src/Controllers/get-all-documents-controller.js';
import deleteStatusOfDocuments from '../src/Controllers/status-of-documents-deletetion.js';
import multiparty from 'connect-multiparty'
// For some reason multiparty types are not being found. The require syntax allows it to compile as any

const multipartyMiddleware = multiparty();

const router = express.Router();

//analyse the document and upload the information to the database
router.post('/analysedoc', analyseDoc)
//upload the document into the s3 bucket
router.post('/uploaddoc', multipartyMiddleware, upload)
//Get information on the invoice, the corresponding order, and the
//correspoinding POD document
router.post('/statusofdocuments', getStatusOfDocuments)
//Get all documents and their information
router.get('/alldocuments', getAllDocuments)

router.delete('/statusofdocuments', deleteStatusOfDocuments )

export default router;