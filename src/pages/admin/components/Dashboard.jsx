import React, { useEffect, useState } from "react";
import { Upload, Button, Form, Input, Modal, Table, notification } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadToCloudinary } from "../../../api/cloudnary/cloudnary";
import { addProject, deleteProject, getProjects } from "../../../api/projects/project";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isAddingProj, setIsAddingProj] = useState(false)
  const [isGettingProj, setIsGettingProj] = useState(true)
  const [form] = Form.useForm();


  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data?.data);

      setIsGettingProj(false)
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsGettingProj(false)
    }
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const openNotification = (type, message, description) => {
    notification[type]({ message, description, placement: "topRight" });
  };

  const handleAddProject = async (values) => {
    setIsAddingProj(true)
    if (!fileList.length) {
      openNotification("error", "Error", "Please upload an image");
      setIsAddingProj(false)
      return;
    }

    const imageFile = fileList[0].originFileObj

    const uploadedImageUrl = await uploadToCloudinary(imageFile);
    if (!uploadedImageUrl) {
      setIsAddingProj(false)
      return;
    }

    const newProject = {
      title: values.title,
      description: values.description,
      image: uploadedImageUrl,
    };

    await addProject(newProject)
      .then((res) => {
        console.log(res)
        setProjects([...projects, res?.data]);
        openNotification("success", "Success", "Project added successfully!");
        setIsAddingProj(false)
        setFileList([]);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        console.log(err)
        if (err?.msg == "Access Denied: No Token Provided") {
          openNotification("error", "Token", "You have No token!");
        }
        else if (err?.msg == "Please Use Another Title") {
          openNotification("error", "Title", "Please Use Another Title");
        }
        else {
          openNotification("error", "Error", "Failed to add project");
        }
        setIsAddingProj(false)
      })
  };

  const handleDelete = async (_id) => {
    console.log("Deleting project with ID:", _id);
    await deleteProject(_id)
      .then((res) => {
        console.log(res)
        setProjects(projects.filter((project) => project._id !== _id));
        openNotification("warning", "Deleted", "Project has been deleted!");
      })
      .catch((err) => {
        console.log(err)
        if (err?.msg == "Access Denied: No Token Provided") {
          openNotification("error", "Token", "You have No token!");
        }
        else if (err?.msg == "Project not found") {
          openNotification("error", "Not Found", "Project not found!");
        }
        else if (err?.msg == "Project ID is required") {
          openNotification("error", "Id", "Project ID is required");
        }
        else {
          openNotification("error", "Error", "Failed to delete project");
        }
      })
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Project"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record?._id)}>
          Delete
        </Button>
      ),
    },
  ];


  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between mb-4 items-center gap-3 flex-wrap">
        <p className="sm:text-xl text-[#364153] font-semibold">
          Total Projects: {projects?.length}
        </p>
        <Button
          type="primary"
          className="!bg-[#FF004F] hover:!bg-[#d4003a] sm:!p-5"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Add Project
        </Button>
      </div>

      <Table
        loading={isGettingProj}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "100%" }}
        dataSource={projects}
        columns={columns}
      />

      {/* Add Project Modal */}
      <Modal
        centered
        title="Add Project"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddProject}>
          <Form.Item label="Upload Image" required>
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={({ fileList }) => setFileList(fileList)}
              maxCount={1}
              accept="image/*"
              showUploadList={{ showPreviewIcon: false }}
            >
              {fileList.length < 1 &&
                <div>
                  <PlusOutlined />
                  <p>Upload</p>
                </div>
              }
            </Upload>
          </Form.Item>

          <Form.Item
            name="title"
            label="Project Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Enter project description" />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={isAddingProj}
              className="w-full !bg-[#FF004F] hover:!bg-[#d4003a] my-3"
            >
              Add Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
