import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:7070/api/v1/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email, password },
    })
      .then(function (response) {
        const res = response.data;
        if (res.success) {
          // localStorage.setItem("token", res.token);
          // localStorage.setItem("id", res.user.id);
          // localStorage.setItem("user", JSON.stringify(res.user));
          setIsLoading(false);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setIsLoading(false);
          alert(res.message);
        }
      })
      .catch(function (error) {
        setIsLoading(false);

        console.log(error.response);
      });
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-whight text-primary py-4 text-center">
        Header Content Here
      </header>

      <main className="flex flex-1 bg-primary items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl bg-white rounded-lg shadow-lg">
          <div className="hidden md:flex flex-col justify-center items-start bg-primary text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Explore More</h1>
            <p className="text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="text-primary text-5xl mb-4">🔒</div>
                <h2 className="text-2xl font-semibold">Welcome Back!</h2>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter E-mail"
                    value={email}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary">
                  Login
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-4 text-gray-500 text-sm">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                <span className="font-medium text-gray-600">
                  Connect with Google
                </span>
              </button>

              {/* Forgot Password */}
              <div className="text-center mt-4">
                <a
                  href="#"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Forgot Password
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Placeholder */}
      <footer className="bg-white text-primary py-4 text-center">
        Footer Content Here
      </footer>
    </div>
  );
};

export default Login;
