# Docu.ai: Document Automation POC for Fintech Company 📈📊

![ScreenRecording2024-02-10at14 57 16-ezgif com-speed](https://github.com/tomnotthomas/docu.ai/assets/126760913/7407cb07-e87a-47c1-ae65-fc863cea1fa0)

*Note: Processing your document takes some time.  Allow a few seconds(20seconds) to pass until you switch from
"Hochladen" to the Dashboard.*

## Introduction

This Proof of Concept (POC) is developed for a large fintech company with the aim to automate document checks against specific criteria. We leverage Amazon's machine learning algorithms, specifically **AMAZON Textract**, to extract and analyze data from documents. The goal is to assess the feasibility of creating an automated solution versus purchasing an existing one.



## Setup Guide 🛠️

### Creating AWS Account and Setting up Services

1. **Create an AWS account** if you don't have one.
2. **Enable an S3 bucket** in your AWS account.
3. Note: Amazon Textract doesn't require enabling like the S3 bucket.

### Connecting your VSCODE with AWS
1. **Add AWS Toolkit - Amazon Q, Codewhisperer, and more** to your add ins.
2. **Go to AWS console** on the top right, click on the account name and click on Security credentials to obtain your Access key and private acces key
or use SSO, to connect your VSCODE with your AWS account.

### Configuring Environment Variables

#### For Server

- `MY_BUCKET`: Name of your AWS bucket.
- `PROFILE`: Name of your AWS profile.
- `REGION_TEXTRACT`: The region where you want your Textract client to be used. Ideally, it should be near your S3 bucket to reduce latency.
- `REGION_S3`: The region where your S3 bucket is deployed.

#### For Client

- `MY_BUCKET`: Name of your AWS bucket.
- `PROFILE`: Name of your AWS profile.

### Running the Application

- **Backend**: Run `node index.js` in your terminal.
- **Frontend**: Execute `npm run dev`.

  ## Key Terms and Document Criteria 📑

- **German Terms in Use**:
  - *Rechnung* (Invoice)
  - *Auftrag* (Order)
  - *POD* (Proof of Delivery)

- **Document Criteria**:
  - *POD*: Must include a signature.
  - *Rechnung*: Should contain a total amount and an “Auftragsnummer”.
  - *Auftrag*: Should include a total amount.
  - All three documents (*POD*, *Rechnung*, *Auftrag*) are required for each work package.
  - The value for the total amount on *Rechnung* and *Auftrag* should match.

## Assumptions 🧐

- File Naming and Format:
  - An *Auftrag* is always named “Auftrag” and is a PDF (e.g., `Auftrag(5).pdf`).
  - A *Rechnung* is always named “Rechnung” and is a PDF (e.g., `Rechnung35.pdf`).
  - A *POD* is always named “POD” and is a PDF (e.g., `POD32.pdf`).

- Document Content:
  - Each PDF contains only the necessary document, with no additional attachments.
  - There are not more than 3000 words on a document.
  - A PDF for any of the named files contains only one document.

## Next Steps 🚀

- Replace the PDF to image converter (`pdf2img`) to address empty image conversions.
- Develop a multi-file upload feature for faster processing.
- Extend document checks and increase reliability using custom models from Textract.
- Implement a feature to handle multiple documents in one PDF.
- Add a loading screen when the documents are still in process for the upload section

## Technologies Used 🛠️

- **AWS Textract**: For document analysis.
- **AWS S3**: For file storage.
- **Next.js**: For frontend development.
- **Express with MongoDB & Mongoose**: For backend development.
- **JavaScript**: The primary programming language used.

## Contributors

- Tom Schwabe (original author)
- Giovanni Silvotti
- Andro Kubonin

---

*Note: This POC is part of an ongoing project and is subject to changes and improvements.*


