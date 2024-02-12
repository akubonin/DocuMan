export interface IStatus {
  workpackage: string;
  documents : string;
}

export interface IRawOutput {
  filename: string;
  text: string;
  invoice: string;
  pod: string;
  order: string;
}

export type IStatusModel = Model<IStatus, {}, {}>

export type IRawOutputModel = Model<IRawOutput, {}, {}>

