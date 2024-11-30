import axios from "axios";
import React, { useState } from "react";
import { Lia500Px } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/toasts/ToastManager";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-whight text-primary py-4 text-center">
        Header Content Here
      </header>
      <LoginForm />
      {/* Footer Placeholder */}
      <footer className="bg-white text-primary py-4 text-center">
        Footer Content Here
      </footer>
    </div>
  );
};

export default Login;
