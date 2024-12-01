import React from "react";
import VerifyOTPForm from "../../components/auth/VerifyOTPForm";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import SEO from "../../components/re-usable/SEO";

const VerifyOTP = () => {
  return (
    <>
      <SEO title="Verify OTP - ES Gishoma" />
      <div className=" min-h-screen bg-primary">
      <div className="flex flex-col p-5">
          <AuthHeader />
          <VerifyOTPForm />
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
