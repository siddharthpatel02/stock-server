import { Request } from "express";
import multer, { Multer } from "multer";

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

const uploadFile: Multer = multer({ storage: storage, fileFilter: imageFilter });

export { uploadFile };
