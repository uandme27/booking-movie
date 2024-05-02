import React, { useState } from 'react';
import { Button, Modal, Form, type FormProps, Input, Spin } from 'antd';
import { useEditGenreMutation } from '@/app/redux/features/movie/genre.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MDeditGenre({ dataId }: any) {
    const [form] = Form.useForm();
    const notify = (string: string) => toast(string);
    const [editGenre] = useEditGenreMutation()
    const onFinish: FormProps["onFinish"] = async (values: any) => {
        setConfirmLoading(true);
        try {
            await editGenre({
                id: dataId._id,
                body: values
            });
            form.resetFields();
            setOpen(false);
            notify(`Sửa thành công`)
        } catch (error) {
            console.error('Failed to add movie:', error);
        } finally {
            setConfirmLoading(false);
        }
    };
    const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setConfirmLoading(true);
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
            <Button className='bg-danger' onClick={showModal}>
                Sửa
            </Button>
            {/* <button onClick={showModal} className='bg-cyan-600 hover:bg-cyan-700  text-white py-2 px-4 rounded'>
                Thêm thể loại {isLoading ? <Spin /> : ''}
            </button> */}
            <Modal
                title={`Sửa thể loại `}
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
                            initialValue={dataId.name}
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
                                {/* {isLoading ? <Spin /> : "Xác nhận"} */}
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
