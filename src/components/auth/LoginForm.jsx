import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/toasts/ToastManager";
import { login } from "../../redux/slices/authSlice";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validateInputs = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Please enter a valid email address";
      }
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      if (response.status === 200) {
        setIsLoading(false);
        localStorage.clear();
        localStorage.setItem("userIdToLogin", response.session.userId)
        addToast("success", response.message, 5000);
        navigate("/verify-otp");
      } else {
        setIsLoading(false);
        addToast("error", response.message, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      addToast("error", error.message || "An unexpected error occurred.", 3000);
    }
  };

  return (
    <main className="flex flex-1 bg-primary items-center justify-center rounded-3xl shadow-lg w-full mx-auto mt-10 max-w-4xl h-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl rounded-3xl shadow-lg">
        <div className="hidden md:flex flex-col justify-center items-start bg-primary text-white p-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
          <h1 className="text-4xl font-bold mb-4">Log into your account</h1>
          <p className="text-lg">
            Welcome back to ES Gishoma Admin Portal, use your email and password
            to log in to your account. If you don't remember the password, feel
            free to reset it through the forgot password button.
          </p>
        </div>

        <div className="flex flex-col justify-center bg-white items-center p-12 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="text-primary text-5xl mb-4">🔒</div>
              <h2 className="text-2xl font-semibold">Welcome Back!</h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  id="email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter E-mail"
                  value={email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary">
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              <div>
                <Link to={"/forgot-password"}
                  className="text-primary"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
