import express from "express"
import {BuildingController} from "./building.controller";
import validateRequest from "../../middlewares/validateRequest";
import {BuildingValidations} from "./building.validation";

const router = express.Router()

router.post("/create-building", validateRequest(BuildingValidations.create), BuildingController.insertIntoDb)
router.get("/", BuildingController.getAllFromDb)

export const BuildingRoutes ={router}