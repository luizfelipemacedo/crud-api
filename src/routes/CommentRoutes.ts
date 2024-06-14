import { Router } from "express";
import CommentController from "../controllers/CommentController";

const CommentRouter = Router();

CommentRouter.post("/api/comment", CommentController.createComment);
CommentRouter.get("/api/comment", CommentController.listComments);
CommentRouter.patch("/api/comment/:id", CommentController.updateComment);
CommentRouter.delete("/api/comment/:id", CommentController.deleteComment);

export default CommentRouter;