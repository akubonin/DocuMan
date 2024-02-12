import StatusOfDocuments from "../../src/Models/status-of-documents-model.js"
import {Request, Response} from "express";

const deleteStatusOfDocuments = async function(req : Request, res: Response) : Promise<void | undefined> {

  try {
    const result = await StatusOfDocuments.findOneAndDelete({ workpackage: req.body.vorgang });

    if (!result) {
      res.status(200).send('No documents to delete :)');
      return ;
    }

    res.status(200).send('All Good!');
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
}

export default deleteStatusOfDocuments;