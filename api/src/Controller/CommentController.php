<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Form\CommentType;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;


/**
 * @Route("api/comment")
 */
class CommentController extends AbstractController
{

    /**

     * @Route("/", name="app_comment_index111", methods={"GET"})
     */
    public function index(Request $request,CommentRepository $commentRepository): Response
    {
        $page = $request->get('page');
        if(isset($page) && !empty($page))
            $result =  $this->view($commentRepository->findBy(['page'=>$page],['created_at'=>'DESC']));
        else
            $result =  $this->view($commentRepository->findBy(['parent'=>null],['created_at'=>'DESC'],5));
        return $this->json($result);
    }

    /**
     * @Route("/new", name="app_comment_new", methods={"GET", "POST"})
     */
    public function new(Request $request, CommentRepository $commentRepository,SerializerInterface $serializer): Response
    {
        $comment = $serializer->deserialize(
            $request->getContent(),
            Comment::class,
            'json'
        );

        $comment->setCreatedBy($this->getUser());
        $commentRepository->add($comment);
        return $this->json($comment->toJson());
    }

    /**
     * @Route("/setRating/{id}/{rating}", name="app_comment_set_rating", methods={"GET"})
     */
    public function setRating(Comment $comment, $rating, CommentRepository $commentRepository): Response
    {
        $comment->setRating($rating);
        $commentRepository->add($comment);
        return $this->json($comment->toJson());
    }

    /**
     * @Route("/new-reply-comment/{id}", name="app_comment_new_reply_comment", methods={"POST"})
     */
    public function newSubComment(Comment $comment, CommentRepository $commentRepository, Request $request,SerializerInterface $serializer): Response
    {

        $subComment = $serializer->deserialize(
            $request->getContent(),
            Comment::class,
            'json'
        );
        $subComment->setParent($comment);
        $subComment->setCreatedBy($this->getUser());
        $commentRepository->add($subComment);
        return $this->json($subComment->toJson());
    }

    private function view($entities){
        return array_map(function ($entity) {
            return $entity->toJson();
        }, $entities);
    }
}
