import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useAddMovieMutation, useEditMovieMutation } from '@/app/redux/features/movie/movie.service';
import { useGetGenreQuery } from '@/app/redux/features/movie/genre.service';
import { Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Space, Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import Image from 'next/image';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 36 },
};
const validateMessages = {
    required: '${label} không được để trống!',
    types: {
        // email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
export default function MDeditMovie({ datamovie }: any) {
    const [url, setUrl] = useState<any>(datamovie.image)
    const [loadingImage, setLoadingImage] = useState(false)
    const props: UploadProps = {
        name: 'file',
        customRequest: async (options) => {
            const formData = new FormData();
            formData.append('image', options.file);
            console.log(options);
            setLoadingImage(!loadingImage)
            try {
                const response = await fetch('http://localhost:5000/api/v1/movie/img', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        authorization: 'authorization-text',
                    },
                });

                if (!response.ok) {

                    throw new Error('Failed to upload file');
                }

                const data = await response.json();
                setUrl(data.data)
                setLoadingImage(false)


                //   message.success(`${options.file.name} file uploaded successfully`);
            } catch (error) {
                //   message.error(`${options.file.name} file upload failed.`);
            }

        },
    };
    const { data } = useGetGenreQuery()
    const options = data?.data.map((item: any) => ({
        value: item._id,
        label: item.name,
    }));
    const [editMovie] = useEditMovieMutation()
    const [form] = Form.useForm();
    form.setFieldsValue(datamovie);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const data = await form.validateFields();
            editMovie({
                id: datamovie._id,
                body: { ...data, image: url }
            });
            // form.resetFields();
            // setUrl(null)
            // setOpen(false);
            console.log({
                id: datamovie._id,
                body: { ...data, image: url }
            });

        } catch (error) {
            console.error('Failed to add movie:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Button className='bg-danger' onClick={showModal}>
                Sửa
            </Button>
            <Modal
                width={800}
                title="Thêm Phim"
                open={open}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                ]}
            >
                <Form
                    form={form}
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}
                >
                    <Form.Item name='name' label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='director' label="Tác giả" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item >
                    <Form.List
                        {...layout}
                        name="cast"
                        rules={[
                            {
                                validator: async (_, cast) => {
                                    if (!cast || cast.length < 1) {
                                        return Promise.reject(new Error('Cần ít nhất 1 diễn viên'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                <Form.Item
                                    label="Diễn viên"
                                >
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '20%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        label={`Tên diễn viên ${index + 1}`}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Tên diễn viên không được để trống.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="Tên diễn viên" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}

                            </>
                        )}
                    </Form.List>
                    <Form.Item label="Hình Ảnh">
                        <Upload
                            {...props}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        {loadingImage ? <LoadingOutlined /> : ''}
                        {url ? (
                            <Image width={100} height={100} alt='sdsjdh' src={url.url}></Image>
                        ) : (
                            <Image width={100} height={100} alt='sdsjdh' src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/image-png-512.png'></Image>
                        )}
                    </Form.Item>

                    <Form.Item name='trailer' label="trailer" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='duration' label="Thời gian" rules={[{ type: 'number', min: 30, max: 500 }, { required: true }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name='description' label="Mô tả" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item >
                        <Button
                            className='bg-blue-500 hover:bg-blue-700 text-white'
                            type="primary"
                            loading={loading}
                            // onClick={handleOk}
                            htmlType="submit">
                            Sửa
                        </Button>
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}
