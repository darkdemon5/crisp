import React, { use } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, setError, setLoading } from "../Auth/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/firebaseConfig";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const checkLogin = useSelector((state) => state.auth.isAuth);
  const isRole = useSelector((state) => state.auth.role);

  React.useEffect(() => {
    if(checkLogin){
      if(isRole === "admin"){
        navigate("/dashboard");
      } else {
        navigate("/chat");
      }
    }
  }, [checkLogin, isRole, navigate]);

  const handleLogin = async (val) => {
    val.preventDefault();

    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const role = user.email === "admin@crisp.com" ? "admin" : "user";
      message.success("Logged in successfully");  
      // alert("Logged in successfully");
      dispatch(loginSuccess({ email, password, role }));
      if (role === "admin") {        
        navigate("/dashboard");
      } else {
        navigate("/chat");
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setError(error.message));
      // alert(error.message);
      
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-l from-sky-500 to-violet-500">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-8">
        <h1 className="text-center text-3xl font-bold text-white mb-8 drop-shadow-lg">
          Login
        </h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label=<span className="text-white text-lg font-medium">E-mail</span>
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/60 rounded-lg px-4 py-2 focus:bg-white"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-white text-lg font-medium">Password</span>
            }
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/60 rounded-lg px-4 py-2 focus:bg-white"
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={(e) => handleLogin(e)}
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow"
            >
              Login
            </Button>
          </Form.Item>
          <span className="text-white text-lg font-medium flex justify-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-white font-semibold hover:underline ml-2"
            >
              Sign Up
            </a>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Login;
