import {
  S3Client,
  S3ClientConfig,
  // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
  ListObjectsV2Command,
  _Object,  
} from "@aws-sdk/client-s3";
import 'dotenv/config'
import { fromIni } from '@aws-sdk/credential-providers';

//REGION is the region of your AWS account, credentials profile is your profile name
const credentials : { profile : string} ={ profile : process.env.PROFILE || 'default'};
const region : string = process.env.REGION || 'default'

const s3Config : S3ClientConfig = {
  region,
  credentials: fromIni(credentials),
}

const client  : S3Client = new S3Client(s3Config);


//Get all the documents from the specified S3 bucket.
const findFiles = async function () : Promise<(string | undefined)[] | undefined | void> {
  const command : ListObjectsV2Command = new ListObjectsV2Command({
    Bucket: process.env.MY_BUCKET,
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1000,
  });

  try {
    let isTruncated : boolean | undefined = true;

    let contents : (string| undefined)[] = [];

     interface ListObjectsResponseofInterest { 
      Contents?: _Object[]; 
      IsTruncated? : boolean;
      NextContinuationToken? : string; 
    } 

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } : ListObjectsResponseofInterest
      = await client.send(command);
        console.log("here is Contents:", Contents);
      const contentsList: string | undefined = Contents?.map((c) => `${c.Key}`).join(",");
      contents.push (contentsList);
      isTruncated = IsTruncated;
      if (NextContinuationToken) {
        command.input.ContinuationToken = NextContinuationToken;
      }
    }
    return contents;
    
  } catch (err) {
    console.error(err);
  }
};

export default findFiles;