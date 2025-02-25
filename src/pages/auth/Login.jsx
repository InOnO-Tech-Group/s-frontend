import LoginForm from "../../components/auth/LoginForm";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import SEO from "../../components/re-usable/SEO";

const Login = () => {

  return (
    <>
      <SEO title="Log into your account - ES Gishoma" />
      <div className=" min-h-screen bg-primary">
        <div className="flex flex-col p-5">
          <AuthHeader />
          <LoginForm />
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default Login;
