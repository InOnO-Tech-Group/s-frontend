import axios from "axios";
import React, { useState } from "react";
import { Lia500Px } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/toasts/ToastManager";
import LoginForm from "../../components/auth/LoginForm";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";

const Login = () => {
  
  return (
    <div className=" min-h-screen bg-primary">
      <div className="flex flex-col p-5">
      <AuthHeader/>
      <LoginForm />
      <AuthFooter/>
    </div>
    </div>
  );
};

export default Login;
