import React, { useState, ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface LoginFormData {
  username: string;
  password: string;
}

function parseToken(token: string) {
  try {
    // 1. Get payload (middle part of JWT)
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;

    // 2. Decode base64 (handle UTF-8 properly)
    const json = decodeURIComponent(
      atob(base64Payload)
        .split("")
        .map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    // 3. Parse JSON
    const data = JSON.parse(json);
    return data;
  } catch (e) {
    return null;
  }
}

const LoginPage: React.FC = () => {
  const { setToken, setTrainId, setRole } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Typed change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Typed submit handler
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials. Please try again.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      const parsedToken = parseToken(data.token);
      setTrainId(parsedToken?.train_id || "");
      setRole(parsedToken?.role || "");

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      setError("Connection failed");
      console.error(err);
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-[#171719] w-full h-screen font-">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#171719] tracking-tight">
            Войти в систему
          </h1>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-sm text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-sm text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Имя пользователя
            </label>
            <input
              id="username"
              type="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-200 rounded-xl mt-1 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Вход...
            </div>
          ) : (
            "Войти"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
