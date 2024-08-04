import { SignUp } from "@clerk/clerk-react";
import "./sign-up.scss";

const SignUpPage = () => (
  <div className="sign-up">
    <SignUp path="/sign-up" />
  </div>
);

export default SignUpPage;
