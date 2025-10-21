import React, { use } from "react";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError, setLoading, signUpSuccess } from "../Auth/authSlice";
import { db, auth } from "../Auth/firebaseConfig";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullname, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,32}$)[A-Za-z0-9!@#$%^&*]+$/;

  const handleSignUp = async (val) => {
    val.preventDefault();
    if (!fullname || !email || !password || !confirmpassword) {
      dispatch(setError("Please fill all the fields"));
      // alert("Please fill all the fields");
      message.warning("Please fill all the fields");
      return;
    }
    if (password !== confirmpassword) {
      dispatch(setError("Passwords do not match"));
      // alert("Passwords do not match");
      message.error("Passwords do not match");
      return;
    }
    if (!passwordRegex.test(password)) {
      dispatch(
        setError(
          "Password must be 6-32 characters, include uppercase, lowercase, number, and special character (!@#$%^&*)"
        )
      );
      alert(
        "Password must be 6-32 characters, include uppercase, lowercase, number, and special character (!@#$%^&*)"
      );
      return;
    }

    dispatch(setLoading(true));
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const userid = auth.currentUser.uid;
      // alert("User created successfully");
      message.success("User created successfully");
      set(ref(db, "users/" + userid), {
        fullname: fullname,
        user: email,
        role: "user",
      });
      dispatch(signUpSuccess({ fullname, email, uid: userid, role: "user",createdAt: Date.now(),}));
      navigate("/chat");
    } catch (error) {
      dispatch(setError(error.message));
      // alert(error.message);
      message.error(error.message);
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-l from-sky-500 to-violet-500">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Sign Up
        </h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={
              <span className="text-white text-lg font-medium">Full Name</span>
            }
            name="fullname"
            rules={[
              { required: true, message: "Please input your Full Name!" },
            ]}
          >
            <Input
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white/60 rounded-lg px-4 py-2 focus:bg-white"
            />
          </Form.Item>
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

          <Form.Item
            label={
              <span className="text-white text-lg font-medium">
                Confirm Password
              </span>
            }
            name="confirmpassword"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/60 rounded-lg px-4 py-2 focus:bg-white"
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={(e) => handleSignUp(e)}
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow"
            >
              SignUp
            </Button>
          </Form.Item>
          <span className="text-white text-lg font-medium flex justify-center">
            have an account?
            <a href="/login" className="text-white ml-2">
              Login
            </a>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
