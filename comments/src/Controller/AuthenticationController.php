<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;


class AuthenticationController extends AbstractController
{
    /**
     *
     */
    private $passwordEncoder;
    /**
     *
     */
    private $jwtEncoder;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        JWTEncoderInterface $jwtEncoder
    )
    {

        $this->passwordEncoder = $passwordEncoder;
        $this->jwtEncoder = $jwtEncoder;
    }
    /**
     * @Route("/signup", name="app_authentication")
     * @param Request $request
     */
    public function index(Request $request,UserRepository $userRepository,JWTTokenManagerInterface $jwtManager): Response
    {
        $data = json_decode(
            $request->getContent(),
            true
        );

        //$form = $this->createForm(UserType::class, new User());

        //$form->submit($data);


        $user = new User();
        /*$form = $this->createForm(UserType::class, $usr);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userRepository->add($usr);
            //return $this->redirectToRoute('app_test_index', [], Response::HTTP_SEE_OTHER);
            return $this->json([
                'message' => $data
            ]);
        }*/

        $checkUser =  $userRepository->findOneBy(['email'=>$data['email']]);
        if(!$checkUser) {
            $user->setEmail($data['email']);
            $user->setName($data['name']);
            $user->setRoles($data['roles']);
            $user->setProvider($data['provider']);
            $user->setPassword('eee');
           
            $userRepository->add($user);
        }else{
            $user = $checkUser;
        }


        $jwt = $jwtManager->create($user);
        /*$token = $this->jwtEncoder->encode(
            [
                'username' => 'eee',
                'exp'      => time() + 3600,
            ]
        );*/

        return $this->json([
            'token' =>$jwt
        ]);


        /*return $this->render('authentication/index.html.twig', [
            'controller_name' => 'AuthenticationController',
        ]);*/
    }
    public function cast($object)
    {
        if (is_array($object) || is_object($object)) {
            foreach ($object as $key => $value) {
                $this->$key = $value;
            }
        }
    }
}
