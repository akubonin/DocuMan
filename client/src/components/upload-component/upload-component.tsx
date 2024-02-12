import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import './upload-component.css';
import  'dotenv/config'
import { TiUploadOutline } from "react-icons/ti";

type VorgangData = { vorgang: string | undefined };
type PostData  = {
  bucket : string | undefined;
  photo : string;
}
const fileTypes: string[] = ["JPG", "PDF"];

export const getVorgang = (file : File) : string | undefined => {
  const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
  if (fileNameWithoutExtension.startsWith('Rechnung')) {
    return fileNameWithoutExtension.substr(8);
  }
  if (fileNameWithoutExtension.startsWith('Auftrag')) {
    return fileNameWithoutExtension.substr(7);
  }
  if (fileNameWithoutExtension.startsWith('POD')) {
    return fileNameWithoutExtension.substr(3);
  }
};

const URL: string = 'http://localhost:8080'

export const upload = async (file: File): Promise<void> => {
  // Create a FormData object to append the file for sending as multipart/form-data
  const formData: FormData = new FormData();
  formData.append("file", file);
  // Send a POST request to upload the file to the server
  const uploadResponse: Response = await fetch(URL + "/uploaddoc", {
    method: "POST",
    body: formData,
  });
  // Check if the upload was successful; otherwise, throw an error
  if (!uploadResponse.ok) {
    throw new Error('Upload failed');
  }
}

export const analyse = async (file: File): Promise<void> => {
   // Extract the photo name without extension
  const postData: PostData = {
    bucket: process.env.MY_BUCKET,
    photo: file.name.split('.').slice(0, -1).join('.'),
  };
  // Send a POST request to analyze the uploaded document
  const analyseResponse: Response = await fetch(URL + '/analysedoc', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  // Check if the analysis was successful; otherwise, throw an error
  if (!analyseResponse.ok) {
    throw new Error('Analysis failed');
  }
}

export const deleteStatus = async (vorgangData: VorgangData): Promise<void> => {
  // Send a DELETE request to delete the document status based on vorgangData
  const deleteResponse: Response = await fetch(URL + '/statusofdocuments', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vorgangData),
  });
  // Check if the deletion was successful; otherwise, throw an error
  if (!deleteResponse.ok) {
    throw new Error('Deletion failed');
  }
}

export const updateStatus = async (vorgangData: VorgangData): Promise<void> => {
  // Send a POST request to update the status of the document after deletion
  const postResponse: Response = await fetch(URL + '/statusofdocuments', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vorgangData),
  });
  // Check if the post-operation was successful; otherwise, throw an error
  if (!postResponse.ok) {
    throw new Error('Post-operation failed');
  }
}

function DragDrop() : React.ReactNode {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleChange = (newFiles : File[]) : void => {
    const file : File = newFiles[0];
    console.log("Selected file:", {newFiles});
    setFile(file);
    loadFile(file);
  };

  const loadFile = async (file: File): Promise<void> => {
    try {
      upload(file);
      // Update the upload status to indicate successful file upload
      setUploadStatus("File uploaded successfully");
      analyse(file);

      // Prepare data for the deletion request
      const vorgangData: { vorgang: string | undefined } = { vorgang: getVorgang(file) };

      deleteStatus(vorgangData);
      updateStatus(vorgangData);

      // Should check if error.message is always present, and therefore type 'any' is used.
    } catch (error: any) {
      console.error("Error:", error);

      // Set the upload status to the error message and clear it after 5 seconds
      setUploadStatus(error?.message);
      setTimeout(() => setUploadStatus(''), 5000);
    }
  };


  return ( <div
    id='upload-window'>
      <h2 id='document-upload' data-testid='header'>Dokumente hochladen</h2>
      {uploadStatus && <div id='upload-status'>{uploadStatus}</div>}
      <div>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="Upload-documents"
          types ={fileTypes}
          label={"Zieh die Dokumente hier hinein"}
          onTypeError={() => console.error("Es werden nur pdf und .png Dateien unterstützt")}
          children={<div id='upload'><TiUploadOutline id='upload-upload-icon' />
         <p data-testid='main-text'> Dokumente hinein ziehen </p> </div>}
        />
      </div>
    </div> );
}


export default DragDrop;