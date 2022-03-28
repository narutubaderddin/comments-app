import React, { useState } from "react";

import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { PostData } from "../../services/PostData";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [validateRecaptcha, setValidateRecaptcha] = useState(false);

  const responseFacebook = (response) => {
    singUp(response, "Facebook");
  };

  const responseGoogle = (response) => {
    singUp(response, "Google");
  };

  const onChangeRecaptcha = (value) => {
    setValidateRecaptcha(true);
  };

  const singUp = (res, type) => {
    let postData;
    if (type === "Facebook" && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url,
        roles: ["ROLE_USER"],
        passeword: "default",
      };
    }

    if (type === "Google" && res.Du) {
      postData = {
        name: res.Du.tf,
        provider: type,
        email: res.Du.tv,
        provider_id: res.Ba,
        token: res.accessToken,
        provider_pic: res.profileObj.imageUrl,
        roles: ["ROLE_USER"],
        passeword: "default",
      };
    }
    PostData("signup", postData).then((result) => {
      let responseJson = result;
      localStorage.setItem("token", responseJson.token);
      window.location = "/";
    });
  };

  return (
    <div className=" bg-gray-300">
      <div className="container h-screen flex justify-center items-center">
        <div className="p-8 bg-white rounded-lg max-w-6xl pb-10">
          <div className="flex justify-center mb-4">Comment system</div>
          <input
            type="text"
            className="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            placeholder="Email"
          />
          <input
            type="text"
            className="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            placeholder="Password"
          />
          <div className="flex justify-end items-center mt-2">
            <a className="text-gray-400 hover:text-gray-600">
              Forgot password?
            </a>
          </div>
          <div className="flex">
            <div className="ml-auto">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChangeRecaptcha}
              />
            </div>
          </div>
          <button
            className="uppercase h-12 mt-3 text-white w-full rounded bg-red-700 hover:bg-red-800"
            disabled
          >
            login
          </button>
          <div className="flex justify-between items-center mt-3">
            <hr className="w-full" />
            <span className="p-2 text-gray-400 mb-1">OR</span>
            <hr className="w-full" />
          </div>
          <div>
            <FacebookLogin
              appId="3088679171397499"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              size="medium"
              cssClass="uppercase h-12 mt-3 text-white w-full rounded bg-blue-800 hover:bg-blue-900"
              isDisabled={!validateRecaptcha}
            />
          </div>
          {/* <button className="uppercase h-12 mt-3 text-white w-full rounded bg-blue-800 hover:bg-blue-900">
            <i className="fa fa-facebook mr-2"></i>Facebook
          </button> */}
          {/* <button className="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900"><i
                            className="fa fa-google mr-2"></i>Google
                        </button>  */}
          <GoogleLogin
            className="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900"
            clientId="579063732673-tk9m6pii2n49cl34t2bvlr04e5lqom0d.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            disabled={!validateRecaptcha}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
