import React from "react";
import VerifyOTPForm from "../../components/auth/VerifyOTPForm";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import SEO from "../../components/re-usable/SEO";

const VerifyOTP = () => {
  return (
    <>
      <SEO title="Verify OTP - ES Gishoma" />
      <div className="bg-primary h-screen">
        <div className="w-4/5 mx-auto">
          <AuthHeader />
          <VerifyOTPForm />
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
