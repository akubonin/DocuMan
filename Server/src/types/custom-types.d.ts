declare module 'connect-multiparty';

export type DocumentItem = {
  documents : string;
  workpackage: string;
  __v : number;
  _id : string;
};

type DocType = 'Rechnung' | 'POD' | 'Auftrag';