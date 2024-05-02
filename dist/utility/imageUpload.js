"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileS3 = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.mimetype.split("/")[1];
        cb(null, `${uniqueSuffix}.${ext}`);
    },
});
const imageFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new Error("kindly upload images only"), false);
    }
};
const uploadFile = (0, multer_1.default)({
    storage: storage,
    fileFilter: imageFilter,
});
exports.uploadFile = uploadFile;
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});
const uploadFileS3 = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
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
exports.uploadFileS3 = uploadFileS3;
//# sourceMappingURL=imageUpload.js.map