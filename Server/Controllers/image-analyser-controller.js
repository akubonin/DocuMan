import { TextractClient, AnalyzeExpenseCommand, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { fromIni } from '@aws-sdk/credential-providers';
import 'dotenv/config'
import RawTextOutput from '../Models/raw-ocr-output-model.js'

//Takes bucket and photo into the request body and provides text from an image

//REGION is the region of your AWS account, credentials profile is your profile name
const textractClient = new TextractClient({
  region: process.env.REGION,
  credentials: fromIni({ profile: process.env.PROFILE }),
});

const analyseDoc = async function (req, res, next) {


// You just need to provide the bucket and document name of your s3 bucket and you will get the text back.
const params = {
  Document: {
    S3Object: {
      Bucket: req.body.bucket,
      Name: req.body.photo
    },
  },
  FeatureTypes: ['TABLES', 'FORMS'],
};

  //if it is an invoice, we can get the total amount to be paid.
  const command = new AnalyzeExpenseCommand(params);
  const totalResponse = await textractClient.send(command);
  const positionInArray  = totalResponse.ExpenseDocuments[0]
  console.log({positionInArray});

const displayBlockInfo = async (response) => {
  try {
    let words = [];
    let handwriting= false;
    response.Blocks.forEach(block => {
      // Filter for lines and words only
      if ( block.BlockType === 'WORD') {
        words.push(block.Text.toLowerCase());
      }
    // Check whether we have handwriting in the document. We can use that to recognize the POD
     if (block.TextType === 'HANDWRITING'){
      handwriting = true;
     }
    })

//Find the total price (total amount for the invoice)
function findPriceText(data) {
  for (const item of data) {
      if (item.Type && item.Type.Text === "PRICE") {
          return item.ValueDetection ? item.ValueDetection.Text : null;
      }
  }
  return null; // Return null if no matching price type is found
}



const priceText = findPriceText(totalResponse.ExpenseDocuments[0].LineItemGroups[0].LineItems[0].LineItemExpenseFields);
console.log(priceText);




const rawOutput = await RawTextOutput.create({
  filename: req.body.photo,
  text: JSON.stringify(words),
  //If the document includes an Iban and an Account owner, it is an Invoice
  invoice: JSON.stringify({isinvoice: (words.includes('kontoinhaber:') || words.includes('kontoinhaber') && words.includes('iban') || words.includes('iban:') || req.body.photo.split(0,8) === 'Rechnung' ), price: priceText}),
  pod: handwriting ,
  //I will take the name of the document for now.
  order: (words.includes('bestellung') || words.includes('bestellung:') || words.includes('transportauftrag') || words.includes('transportauftrag:') || words.includes ('transportauftrag, ') || words.includes('transportauftrag,') || req.body.photo.split(0,7)=== 'Auftrag')
}) 
res.status(201).send(rawOutput);
  } catch (err) {
    console.log("Error", err);
  }
};

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);
    displayBlockInfo(response);
  } catch (err) {
    console.log("Error", err);
  }
};
analyze_document_text()
}
export default analyseDoc;