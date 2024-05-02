import express from "express";
import { jwtAuthentication } from "../utility/authentication";

import { getDashBoardDetails } from "../dashboard/presentation/dashBoardController";
const dashBoardRouter = express.Router();

dashBoardRouter.route("/").get(jwtAuthentication, getDashBoardDetails);
export { dashBoardRouter };
