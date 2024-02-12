import StatusOfDocuments from "../../src/Models/status-of-documents-model.js"
import RawTextOutput from "../../src/Models/raw-ocr-output-model.js";
import { NextFunction } from "express";
import { TypedRequestBody } from "../../src/types/express-type-extensions.js";
import { DocType } from "../../src/types/custom-types.js";
import { IRawOutput, IRawOutputModel, IStatusModel } from "../../src/types/model-types.js";
import { Response } from "express";

const getStatusOfDocuments = async function(req : TypedRequestBody<{vorgang: string}>, res : Response) {
  //Get the name
  const nameOfDoc = req.body.vorgang;
  
  //TODO create helper function that finds the document you are lookging for


  //TODO Get the corresponding invoice



  async function findDocument(docType : DocType, name : string, i : number) : Promise<string | boolean | void> {
    try{
      console.log(docType+name+'-'+i+'.jpg')
      //TODO find all document pages that correspond to the name of the transaction
      const foundDoc : InstanceType<IRawOutputModel> = await RawTextOutput.findOne({
        filename: docType+name+'-'+i+'.jpg'
      })
      if(foundDoc) {
        const data : IRawOutput = foundDoc.toObject();
        return JSON.stringify(data)
      } else {
        return false
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getAllPages(docType: DocType): Promise<InstanceType<IRawOutputModel>[] | void>  {
      try {
      //Loop through all the pages
      let foundDocs : InstanceType<IRawOutputModel>[] = [];

      for (let i = 0; ; i++){
        const doc : InstanceType<IRawOutputModel> = await findDocument(docType, nameOfDoc, i);
        if(doc) {
          foundDocs.push(doc)
        }  else {break}
      }
      return foundDocs;
    } catch(err) {
      console.log(err)
    }
  }

  //function that creates one large object that entails all the documents for one nameOfdoc
  async function getAllPagesOfAllThreeDocs() {
    try{
      const allDocswithAllPages : {
        Rechnung: InstanceType<IRawOutputModel>[] | void;
        Auftrag: InstanceType<IRawOutputModel>[] | void;
        POD: InstanceType<IRawOutputModel>[] | void;
      } = ({
        Rechnung: await getAllPages('Rechnung'),
        Auftrag: await getAllPages('Auftrag'),
        POD: await getAllPages('POD')
       })

  //Write this to the database
    const allPagesAndInfo: InstanceType<IStatusModel> = await StatusOfDocuments.create({
    workpackage: req.body.vorgang,
    documents: JSON.stringify(allDocswithAllPages)
   })   
      res.status(201).send(allPagesAndInfo);
    } catch (err) {
      console.log(err)
    }
  }


  return getAllPagesOfAllThreeDocs();

    //if it doesnt exist, return null

    //TODO check all documents that belong to that invoice for amount and transport number

  //TODO get the corresponding order

    //TODO find all order document pages that correspond to the name of the transaction.
    //if it doesn't exist, return null

    //TODO check all documents that belong to that order for the amount and transport number
      //transport number is only a boolean here.

    //
  //TODO get the corresponding pod

    //TODO find all pd document pages that correspond to the name of the transaction.
    //if it doesn't exist, return null

    //TODO check all documents that belong to that pod for a signature


}

export default getStatusOfDocuments