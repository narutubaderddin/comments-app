import React from "react";
import Comments from "../../Comments/Comments";

const Page1 = () => {
  return (
    <>
      <p class="text-base px-20 pt-20">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1....
      </p>
      <Comments page="page1" />
    </>
  );
};

export default Page1;
