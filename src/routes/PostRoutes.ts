import { Router } from "express";
import PostController from "../controllers/PostController";

const PostRouter = Router();

PostRouter.post("/api/post", PostController.createPost);
PostRouter.get("/api/post", PostController.listPosts);
PostRouter.patch("/api/post/:id", PostController.updatePost);
PostRouter.delete("/api/post/:id", PostController.deletePost);

export default PostRouter;