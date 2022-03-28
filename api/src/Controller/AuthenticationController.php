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
        $user = new User();
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

        return $this->json([
            'token' =>$jwt
        ]);
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
