import StatusOfDocuments from "../../src/Models/status-of-documents-model.js"
import { Request, Response, NextFunction} from "express";
import { IStatus, IStatusModel } from "../../src/types/model-types.js";

// (req: Request, res: Response, next: NextFunction) =>
const getAllDocuments = async function(req : Request, res : Response, next : NextFunction) : Promise<void> {
  try{
  const allDocuments : Array<InstanceType<IStatusModel>> = await StatusOfDocuments.find({});
  console.log(allDocuments);
  res.status(201).send(allDocuments);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err);
  }
}


export default getAllDocuments