import multiparty from "multiparty";
import {error} from "next/dist/build/output/log";
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import * as fs from "fs";
import mime from "mime-types";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

const bucketName = 'e-commerce-yt';

export default async function handler(req, res) {
    await mongooseConnect();
    await isAdminRequest(req, res);

    const form = new multiparty.Form();

    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if(err) throw err;
            resolve({fields, files});
        })
    });

    console.log('length', files.file.length);

    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCCESS_KEY,
        }
    })
    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        console.log({ext, file});
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
    }
    return res.json({links});

}

export const config = {
    api: {bodyParser: false},
}