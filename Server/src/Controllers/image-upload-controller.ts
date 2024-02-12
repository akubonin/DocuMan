import {
  S3Client,
  PutObjectCommand,
  S3ClientConfig
} from "@aws-sdk/client-s3";
import 'dotenv/config';
import { fromIni } from '@aws-sdk/credential-providers';
import fs from 'fs';
import pdf2img from 'pdf-img-convert';
import path from 'path';

import { TypedRequestFiles } from "../../src/types/express-type-extensions.js";
import { Response } from "express";
import { File } from "multiparty";

const credentials: { profile: string } = { profile: process.env.PROFILE || 'default' };
const region: string = process.env.REGION || 'default'

// Initialize S3 client
const s3Config: S3ClientConfig = {
  region,
  credentials: fromIni(credentials),
}

const s3Client : S3Client = new S3Client(s3Config);
// TypedRequestFiles<{ file: File | File[] }


type UploadedFile = {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: {
    'content-disposition': string;
    'content-type': string;
  };
  size: number;
  name: string;
  type: string;
};

type FilesProperty = {
  file: UploadedFile | UploadedFile[];
};


declare module 'express' {
  interface Request {
    files: FilesProperty
  }
}

// Upload function
const upload = async function (req : TypedRequestFiles<{file : File | File[]}>, res : Response) : Promise<void | undefined> {
  try {
    console.log(req.files, 'And here is file', req.files.file )
    if (!req.files || !req.files.file) {
      res.status(400).send("File not received");
      return;
    }

    const files = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
    let filesToUpload = [];

    for (const file of files) {
      const fileName = file.originalFilename;
      const fileExtension = path.extname(fileName).toLowerCase();

      if (fileExtension === '.pdf') {
        const conversion_config = {
          scale: 2.0
        };

        // Convert PDF to images (JPG)
        const convertedFiles = await pdf2img.convert(file.path, conversion_config);
        filesToUpload.push(...convertedFiles.map((buffer, index) => {
          const newFileName = `${path.basename(fileName, fileExtension)}-${index}.jpg`;
          fs.writeFileSync(newFileName, buffer);
          return {
            path: newFileName,
            originalFilename: newFileName
          };
        }));
      } else {
        filesToUpload.push(file);
      }
    }

    // Upload files to S3 and add file names to the array
    for (const uploadFile of filesToUpload) {
      const fileData = fs.readFileSync(uploadFile.path);

      const uploadParams = {
        Bucket: process.env.MY_BUCKET,
        Key: uploadFile.originalFilename,
        Body: fileData,
      };
      // Delete the temp file
      await s3Client.send(new PutObjectCommand(uploadParams));
      fs.unlinkSync(uploadFile.path);
    }

    console.log("Successfully uploaded data");
    // Send the original file name as response

    res.status(200).json({ fileName: files[0].originalFilename });
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      } else {
        res.status(500).send("An unknown error occurred");
      }
    }

  };

    export default upload;

