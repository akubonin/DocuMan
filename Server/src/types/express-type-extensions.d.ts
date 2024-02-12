import { Request, Response } from "express";
import { File } from "multiparty";

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface TypedRequestFiles<T> extends Request {
  files: T;
}