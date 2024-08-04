import { SignIn } from "@clerk/clerk-react";
import "./sign-in.scss";

const SignInPage = () => (
  <div className="sign-in">
    <SignIn path="/sign-in" />
  </div>
);

export default SignInPage;
