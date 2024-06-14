import { Request, Response } from "express";
import PostDataBaseService from "../services/PostDataBaseService";

class PostController {
  async listPosts(_: Request, response: Response) {
    const posts = await PostDataBaseService.listDBPosts();
    return response.json({ posts }).status(200);
  }

  async createPost(request: Request, response: Response) {
    const input = {
      title: request.body?.title,
      content: request.body?.content,
      published: request.body?.published,
      authorId: request.body?.authorId,
    };

    if (Object.values(input).includes(undefined)) {
      return response.json({ message: "Falta parâmetros" }).status(400);
    };

    const { title, content, published, authorId } = input;

    const newPost = await PostDataBaseService.insertDBPost({
      title,
      content,
      published,
      author: { connect: { id: parseInt(authorId) } },
    });
    return response.json({ newPost }).status(201);
  }

  async updatePost(request: Request, response: Response) {
    const postId = request.params?.id;
    if (!postId) return response.json({ message: "Faltou o ID" }).status(400);

    const input = {
      title: request.body?.title,
      content: request.body?.content,
      published: request.body?.published,
      authorId: request.body?.authorId,
    };

    const { title, content, published, authorId } = input;

    const updatedPost = await PostDataBaseService.updateDBPost(
      {
        title,
        content,
        published,
        author: { connect: { id: parseInt(authorId) } },
      },
      parseInt(postId)
    );
    return response.json({ updatedPost }).status(200);
  }

  async deletePost(request: Request, response: Response) {
    const postId = request.params?.id;
    if (!postId) return response.json({ message: "Faltou o ID" }).status(400);

    await PostDataBaseService.deleteDBPost(parseInt(postId));
    return response.json({ message: "Post deletado com sucesso" }).status(200);
  }
}

export default new PostController();