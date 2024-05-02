import { Request } from "express";
import multer, { Multer } from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

type MulterDestinationCallback = (
  error: Error | null,
  destination: string
) => void;

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: MulterDestinationCallback
  ) {
    cb(null, "public/uploads");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: MulterDestinationCallback
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${uniqueSuffix}.${ext}`);
  },
});
const imageFilter = (
  _req: any,
  file: { mimetype: string },
  cb: (arg0: Error, arg1: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("kindly upload images only"), false);
  }
};

const uploadFile: Multer = multer({
  storage: storage,
  fileFilter: imageFilter,
});

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const uploadFileS3 = multer({
  storage: multerS3({
    s3: s3 as any,
    bucket: "stock-product-images",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, file.fieldname));
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = file.mimetype.split("/")[1];
      cb(null, `${uniqueSuffix}.${ext}`);
    },
  }),
  fileFilter: imageFilter,
});

export { uploadFile, uploadFileS3 };
