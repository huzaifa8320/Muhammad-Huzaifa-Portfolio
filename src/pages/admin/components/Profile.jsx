import { use, useContext, useState } from "react";
import { Card, Avatar, Button, Input, Upload, message, Typography } from "antd";
import { UploadOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context/AuthContext";

const AdminProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const { user } = useContext(AuthContext);
    console.log(user);

    const [userData, setUserData] = useState({
        name: "Hexa Admin",
        email: "admin@mhstore.com",
        role: "Super Admin",
        phone: "+123 456 7890",
        location: "New York, USA",
        avatar: "https://i.pravatar.cc/150?img=50", // Random Avatar
    });

    const handleEditToggle = () => setEditMode(!editMode);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleUpload = (info) => {
        if (info.file.status === "done") {
            const newAvatar = URL.createObjectURL(info.file.originFileObj);
            setUserData({ ...userData, avatar: newAvatar });
            message.success("Profile picture updated!");
        }
    };

    return (
        <div className="flex justify-center w-full items-center min-h-screen">
            <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/4 p-8 shadow-lg rounded-xl bg-[#364153] border border-gray-600">
                {/* Profile Header */}
                <div className="flex flex-col items-center">
                    <Avatar size={110} src={userData.avatar} className="border-4 border-gray-400 shadow-md" />
                    <Upload showUploadList={false} customRequest={handleUpload}>
                        <Button type="primary" icon={<UploadOutlined />} className="mt-3 !bg-[#FF004F] hover:!bg-[#d4003a] text-white">
                            Change Avatar
                        </Button>
                    </Upload>
                </div>

                {/* Profile Details */}
                <div className="mt-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Admin Profile</h2>
                        <Button
                            icon={editMode ? <CheckOutlined /> : <EditOutlined />}
                            onClick={handleEditToggle}
                            type="primary"
                            className="!bg-[#FF004F] hover:!bg-[#d4003a] text-white"
                        >
                            {editMode ? "Save" : "Edit"}
                        </Button>
                    </div>

                    <div className="mt-5 space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="bg-gray-700 p-3 rounded-lg shadow-md">
                            <label className="text-gray-300 font-semibold">Full Name</label>
                            {editMode ? (
                                <Input name="name" value={userData.name} onChange={handleChange} className="mt-1 bg-gray-600 text-white border-gray-500" />
                            ) : (
                                <p className="text-gray-100 text-lg font-medium">{user?.fullName}</p>
                            )}
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg shadow-md">
                            <label className="text-gray-300 font-semibold">Email</label>
                            <Typography.Text className="!text-gray-100 inline-block !text-lg">
                                {user?.email}
                            </Typography.Text>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg shadow-md">
                            <label className="text-gray-300 font-semibold">Role</label>
                            <p className="text-blue-400 text-lg font-medium">{user?.role}</p>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg shadow-md">
                            <label className="text-gray-300 font-semibold">Phone</label>
                            {editMode ? (
                                <Input name="phone" value={userData.phone} onChange={handleChange} className="mt-1 bg-gray-600 text-white border-gray-500" />
                            ) : (
                                <p className="text-gray-100 text-lg font-medium">{user?.phone ? user?.phone : 'Null'}</p>
                            )}
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg shadow-md">
                            <label className="text-gray-300 font-semibold">Location</label>
                            {editMode ? (
                                <Input name="location" value={userData.location} onChange={handleChange} className="mt-1 bg-gray-600 text-white border-gray-500" />
                            ) : (
                                <p className="text-gray-100 text-lg font-medium">{user?.location ? user?.location : 'Null'}</p>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminProfile;
