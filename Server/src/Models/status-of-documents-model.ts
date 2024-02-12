import {Schema, model} from 'mongoose';
import { IStatus } from '../../src/types/model-types.js';

const Status = new Schema<IStatus> ({
  workpackage: {
    type: String,
    required: true
  },
  documents:{
    type: String,
    required: true
  }
})


const StatusOfDocuments = model<IStatus>('StatusOfDocumentsSchema', Status);

export default StatusOfDocuments;