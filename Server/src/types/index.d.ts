import { File } from "multiparty";
import { Request } from "express"
declare module "express" {
  interface Request {
    files?: { file: File | File[] };
  }
}