import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
import { Button, Checkbox, Form, type FormProps } from 'antd';
import ThanhToanTienMat from './ThanhToanTienMat';
export default function ChonPhuongThucThanhToan({ ghedat, tenghe, tien, id, data }: any) {
    const [value, setValue] = useState(1);
    const [formData, setFormData] = useState(null);
    const [renderTT, setRenderTT] = useState(false)
    useEffect(() => {
        console.log('rerender');

    }, [renderTT])
    const onFinish: FormProps<any>["onFinish"] = (values) => {
        setFormData({
            ...values,
            seats: ghedat,
            tenghe,
            price: tien,
            interest: id
        }
        );
        setRenderTT(true)
        console.log(123);
    };

    const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setRenderTT(false)
    };

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {

        setIsModalOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsModalOpen(false);
        }, 3000);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <button type="button" onClick={showModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
            <Modal title="Thông tin thanh toán"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[
                    // <button type="button" key='1' onClick={handleCancel} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    //     Hủy
                    // </button>
                    // ,
                    // <button key='1' onClick={handleOk} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    //     Thanh toán
                    // </button>
                    // ,

                ]}
            >

                <div className="bg-white  mt-8"><h3 className="text-l mb-4 font-semibold">
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email nhận vé"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Vui lòng không để trống email !'
                            },
                            {
                                type: 'email',
                                message: 'Vui lòng nhập email hợp lệ'
                            }]}
                        >
                            <Input placeholder="abc123@gmail.com" />

                        </Form.Item>
                        <Form.Item
                            label="Phương thức thanh toán"
                            name="paymentMethod"
                            rules={[{ required: true, message: 'Vui lòng không để trống phương thức thanh toán !' }]}

                        >
                            <Radio.Group onChange={onChange} value={value}>
                                <Space direction="vertical">
                                    <Radio value={'Tiền mặt'}>
                                        <Image
                                            alt=""
                                            loading="lazy"
                                            width="50"
                                            height="50"
                                            decoding="async"
                                            data-nimg="1"
                                            className="inline-block mx-2 object-cover duration-500 ease-in-out group-hover:opacity-100&quot; scale-100 blur-0 grayscale-0)"
                                            src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678131-money-512.png"
                                        />
                                        <label className="inline-block md:text-base text-sm">Tiền mặt</label>
                                    </Radio>
                                    <Radio value={2} disabled={true}>
                                        <Image
                                            alt=""
                                            loading="lazy"
                                            width="50"
                                            height="50"
                                            decoding="async"
                                            data-nimg="1"
                                            className="inline-block mx-2 object-cover duration-500 ease-in-out group-hover:opacity-100&quot; scale-100 blur-0 grayscale-0)"
                                            src="https://cdn.galaxycine.vn/media/2022/4/29/shopee-pay_1651229746140.png"
                                        />
                                        <label className="inline-block md:text-base text-sm">Ví ShopeePay</label>
                                    </Radio>
                                    <Radio value={3} disabled={true}>
                                        <Image
                                            alt=""
                                            loading="lazy"
                                            width="50"
                                            height="50"
                                            decoding="async"
                                            data-nimg="1"
                                            className="inline-block mx-2 object-cover duration-500 ease-in-out group-hover:opacity-100&quot; scale-100 blur-0 grayscale-0)"
                                            src="https://cdn.galaxycine.vn/media/2020/10/20/momo-icon_1603203874499.png"
                                        />
                                        <label className="inline-block md:text-base text-sm">Ví Điện Tử MoMo</label>
                                    </Radio>
                                    <Radio value={'VNPAY'}>
                                        <Image
                                            alt=""
                                            loading="lazy"
                                            width="50"
                                            height="50"
                                            decoding="async"
                                            data-nimg="1"
                                            className="inline-block mx-2 object-cover duration-500 ease-in-out group-hover:opacity-100&quot; scale-100 blur-0 grayscale-0)"
                                            src="https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png"
                                        />
                                        <label className="inline-block md:text-base text-sm">VNPAY</label>
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>

                            {renderTT ? <ThanhToanTienMat renderTT={renderTT} data={formData} fullData={data}></ThanhToanTienMat> :
                                <Button type="primary" htmlType="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full  text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                                    Xác nhận
                                </Button>
                            }

                        </Form.Item>
                    </Form>
                </h3>

                </div>
            </Modal>

        </>
    )
}


