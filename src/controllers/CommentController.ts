import { Request, Response } from "express";
import CommentDataBaseService from "../services/CommentDataBaseService";

class CommentController {
  async listComments(_: Request, response: Response) {
    const comments = await CommentDataBaseService.listDBComments();
    return response.json({ comments });
  }

  async createComment(request: Request, response: Response) {
    const { content, postId, authorId } = request.body;

    const input = { content, postId, authorId };

    if (Object.values(input).includes(undefined)) {
      return response.json({ message: "Falta parâmetros" }).status(400);
    };

    const newComment = await CommentDataBaseService.insertDBComment({
      content,
      post: { connect: { id: postId } },
      author: { connect: { id: authorId } },
    });

    return response.json({ newComment });
  }

  async updateComment(request: Request, response: Response) {
    const commentId = request.params?.id;
    if (!commentId) return response.json({ message: "Faltou o ID" }).status(400);

    const input = {
      content: request.body?.content,
      postId: request.body?.postId,
      authorId: request.body?.authorId,
    }

    if (Object.values(input).includes(undefined)) {
      return response.json({ message: "Falta parâmetros" }).status(400);
    }

    const { content, postId, authorId } = input;

    const updatedComment = await CommentDataBaseService.updateDBComment(
      {
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
      parseInt(commentId)
    );
    return response.json({ updatedComment }).status(200);
  }

  async deleteComment(request: Request, response: Response) {
    const commentId = request.params?.id;
    if (!commentId) return response.json({ message: "Faltou o ID" }).status(400);

    await CommentDataBaseService.deleteDBComment(
      parseInt(commentId)
    );
    return response.json({ message: "Comentário deletado com sucesso" }).status(200);
  }
}

export default new CommentController();