import axios from 'axios';
import AWS from "aws-sdk";

/** Steps to use this:
 * Refer to this doc from AWS on how to create S3 supporting Identity to use in this component. https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
 *  (1) Create Cognito identity pool (see this) and grab the ID of the pool
 *  (2) Ensure the IAM created by cognito has access to your S3 bucket
 *  (3) Use this vue component as a uploader component to upload one image. We can rewrite it to support multi images easily.
 *
 *  Once done through with the Prerequisite tasks part of the above, just grab the cognito Identity pool id and come here.
 *  Use it like this:
 * 
 */
 

 /** 
 * Documentation for reference to this:
 * 1. AWS S3 JavaScript SDK ref: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
 * 2. Cognito for identity pool to use here
 * 3. Nice blog on how to do the UI portion: https://www.academind.com/learn/vue-js/snippets/image-upload/
 * 4. Nice blog on how to handle image file base64: 
 */


  var albumBucketName = "museaimages1";
  var bucketRegion = "us-east-1";
  var IdentityPoolId = "us-east-1:d0b2be91-2d6c-4a94-8d54-28fea41fc2b6";
  export class Uploader {
  constructor() {
    AWS.config.update({
        region: bucketRegion,
        
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId,
        })
      });

      //*/ get reference to S3 client 
    this.s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: albumBucketName }
      });

  }


  

  uploadImage(payload, album) {
    let s3 = this.s3;
    return new Promise(function(resolve, reject) {
        
        /*let encodedImage = payload.file;
        console.log(encodedImage)
        let decodedImage = Buffer.from(encodedImage, 'base64');*/
        var filePath = payload.fileName;
        var params = {
            "Bucket": albumBucketName+album,
            "Body": payload.file,
            "Key": filePath,
            "ACL": "public-read", /* This makes the image public, but only works if your S3 bucket allows public access */
            "ContentType": payload.contentType /* This is important to handle jpg vs png etc */
        };
        s3.upload(params, function (err, data) {
            if (err) {
              console.log(err)  
              reject(err);

            } else {
                /**
                 * data returned after upload will look like this:
                 *          Bucket: "bucketName"
                            Key: "somefilenametouseinS3.png"
                            Location: "URL to your image"
                 */
                resolve(data);
                
            }
        });
    })
  }
}



