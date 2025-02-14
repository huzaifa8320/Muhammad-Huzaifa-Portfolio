import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

function Admin() {

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
        if (user?.role != "admin") {
          openNotification("error", "Access Denied", "You are Not Admin!");
          navigate("/admin/login");
        }
      }
    }
    else{
        navigate('/admin/login')
    }
  }, [user]);
console.log(user);


    return(
        <h1>Hello Admin 👋</h1>
    )
}

export default Admin;