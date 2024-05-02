"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal, DatePicker, Form, Input, Select } from "antd";
import { useRef } from "react";
import { FormInstance } from "antd/lib/form";
import {
  useGetUsersQuery,
  useRegisterUserMutation,
} from "@/app/redux/features/auth/authApi";
import { toast } from "react-toastify";
type Props = {};

const AddUser: React.FC = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerUser, { isSuccess, error }] = useRegisterUserMutation();
  const { refetch } = useGetUsersQuery({});
  const formRef = useRef<FormInstance>(null);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Thêm User thành công!");
      if (formRef.current) {
        formRef.current.resetFields();
        setIsModalOpen(false);
      }
      refetch();
    }
    if (error) {
      toast.error("Thêm User thất bại!");
    }
  }, [isSuccess, error]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { RangePicker } = DatePicker;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const onFinish = async (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
    };
    await registerUser(values);
  };
  return (
    <>
      <Button onClick={showModal}>Add User</Button>
      <Modal
        title="Thêm User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded",
        }}
      >
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          variant="filled"
          ref={formRef}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Vui long nhập Role!" }]}
          >
            <Select>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button className="text-black" type="primary" htmlType="submit">
              Tạo User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
