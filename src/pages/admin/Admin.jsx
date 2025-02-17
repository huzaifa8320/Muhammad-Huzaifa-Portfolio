import React, { useContext, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { LogoutOutlined, FundProjectionScreenOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { AuthContext } from "../../context/AuthContext";

const { Sider } = Layout;

const AdminPanel = () => {

  const { user, logOut } = useContext(AuthContext);

  const { page } = useParams();
  const location = useLocation();
  const navigate = useNavigate()


  useEffect(() => {
    if (user) {
      if (user != 'null') {
        if (user?.role == "user") {
          openNotification("error", "Access Denied", "You are Not Admin!")
          navigate("/admin/login")
        }
      }
    }
    else {
      navigate("/admin/login")

    }
  }, [user])

  return (
    <Layout className="overflow-hidden" style={{
      minHeight: '100vh',
    }}>
      {/* Sidebar */}
      <Sider defaultCollapsed collapsible collapsedWidth={70} className="!bg-gray-700 h-full sm:h-auto !fixed sm:!relative  text-white transition-all duration-300  z-40">
        <div className="text-white text-lg font-bold text-center  h-16 m-5 py-4  flex justify-center items-center">
          <img src="https://res.cloudinary.com/deoqroxyy/image/upload/v1739786651/tab_logo_ajvhrb.png" alt="Logo" className="max-w-20 max-h-20 min-w-13  rounded-full border-2" />
        </div>

        <Menu selectedKeys={[location.pathname]} className="flex flex-col gap-2 custom-menu !bg-gray-700" theme="dark" mode="inline">
          <Menu.Item key="/admin/dashboard" icon={<FundProjectionScreenOutlined />}>
            <Link to="/admin/dashboard">Project</Link>
          </Menu.Item>
          <Menu.Item key="/admin/profile" icon={<UserOutlined />}>
            <Link to="/admin/profile">Profile</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout className="transition-all ml-[70px] sm:ml-0  duration-300 border-l">
        <div className="bg-gray-700 text-white flex-wrap !h-20 px-8  font-semibold flex justify-between items-center">
          <span className="text-white text-base sm:text-xl">{page == 'dashboard' ? 'Dashboard' : 'Profile'}</span>
          <Button onClick={() => logOut()} className="hidden md:block !bg-[#FF004F] hover:!bg-[#d4003a] sm:!p-5" icon={<LogoutOutlined />} type="primary">
            Logout
          </Button>
        </div>
        <div className="m-4 sm:m-8">

          {page == 'dashboard' && <Dashboard />}
          {page == 'profile' && <Profile />}
        </div>
      </Layout>


    </Layout>
  );
};

export default AdminPanel;