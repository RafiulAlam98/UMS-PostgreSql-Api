import express from "express"
import {RoomController} from "./room.controller";
import auth from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";

const router = express.Router()

router.post ("/create-room",auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), RoomController.insertIntoDb)


export const RoomRoutes = {router}