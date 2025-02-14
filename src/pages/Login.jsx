import { Form, Input, Button, Card, notification } from "antd";
import logo from '../assets/img/tab_logo.png'
import { loginUser } from "../api/auth/api";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  

  const [loginLoading, setLoginLoading] = useState(false)
  const { user, setUser, updateToken } = useContext(AuthContext);

  const navigate = useNavigate()

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
    });
  };


  useEffect(() => {
    if (user) {
      if (user != 'null') {
        if (user?.role == "user") {
          openNotification("error", "Access Denied", "You are Not Admin!");
        }
        else if (user?.role == "admin") {          
          navigate("/admin/dashboard");
        }
      }
    }
  }, [user]);


  const onFinish = async (values) => {
    setLoginLoading(true)

    await loginUser(values)
      .then((res) => {
        Cookies.set("token", res?.token);
        setLoginLoading(false)
        openNotification("success", "Success", "Login Successfully!");
        updateToken(res?.token)
      })
      .catch((err) => {
        if (err?.msg === "User does not exist") {
          openNotification("error", "Not Found", "User does not exist!");
        }
        else if (err?.msg === "Password is incorrect") {
          openNotification("error", "Password", "Incorrect Password!");
        }
        else {
          openNotification("error", "Error", "Something went wrong!");
        }
        setLoginLoading(false)
      })
  };

  return (
    <div className="flex justify-center p-8 items-center min-h-screen bg-[#080808]">
      <Card className="w-[400px] p-8 rounded-2xl border-none bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md shadow-2xl">
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="rounded-full w-28 h-28  border-[#FF004F] shadow-lg"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-[500] text-center text-[#FF004F] mb-6 drop-shadow-lg">
          Login to Your Account
        </h2>
        <Form name="admin_login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              autoComplete="email"
              type="email"
              placeholder="Email"
              size="large"
            />
          </Form.Item>


          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your Password!" }]}
          >
            <Input.Password
              autoComplete="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              loading={loginLoading}
              size="large"
              htmlType="submit"
              className="w-full mt-8 !bg-[#FF004F] hover:!bg-[#d90043] transition-all duration-300 text-white text-lg font-medium py-3 rounded-lg shadow-md hover:shadow-xl"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Forgot password? <span className="text-[#FF004F] cursor-pointer hover:underline">Reset here</span>
        </p>
      </Card>
    </div>
  )
}

export default Login;