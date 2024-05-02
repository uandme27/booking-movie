import React, { useState } from 'react';
import { Button, Modal, Form, type FormProps, Input, Spin } from 'antd';
import { useAddGenreMutation } from '@/app/redux/features/movie/genre.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MDaddGenre() {
    const [form] = Form.useForm();

    const notify = (string: string) => toast(string);
    const [data, { isLoading, isSuccess, isError }] = useAddGenreMutation()
    const onFinish: FormProps["onFinish"] = async (values) => {
        setConfirmLoading(true);
        try {
            await data(values)
            form.resetFields();
            // setOpen(false);
        } catch (error) {
            console.error('Failed to add movie:', error);
        } finally {
            setConfirmLoading(false);
        }

        setOpen(false);
        notify(`Thêm thành công thể loại ${values.name}`)
    };
    const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // setConfirmLoading(true);
    };
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <button onClick={showModal} className='bg-cyan-600 hover:bg-cyan-700  text-white py-2 px-4 rounded'>
                Thêm thể loại {isLoading ? <Spin /> : ''}
            </button>
            <Modal
                title="Thêm thể loại"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Form
                        form={form}
                        key={1}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Thể loại"
                            name="name"
                            rules={[{ required: true, message: 'Nhập tối thiểu 2 kí tự và tối đa 20 kí tự!', max: 20, min: 2 }]}
                        >
                            <Input
                                count={{
                                    show: true,
                                    max: 20,
                                }}

                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={confirmLoading}
                                type='primary'
                                className="bg-cyan-600 hover:bg-cyan-700  text-white  rounded" htmlType="submit">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>,
                ]}
            >


            </Modal>
        </>
    )
}
