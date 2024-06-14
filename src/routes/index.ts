import { Router } from "express";

import UserRouter from "./UserRoutes"
import PostRouter from "./PostRoutes"
import CommentRouter from "./CommentRoutes"

const routes = Router();

const allRoutes = [UserRouter, PostRouter, CommentRouter];
routes.use(allRoutes);

export default routes;