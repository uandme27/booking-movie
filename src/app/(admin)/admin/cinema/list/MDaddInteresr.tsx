'use client'
import React, { useEffect, useState } from 'react';
import { ConfigProvider, Modal } from 'antd';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { useAddMovieMutation, useGetMovieQuery } from '@/app/redux/features/movie/movie.service';
import { Select, Space } from 'antd';
import { useAddInterestMutation, useGetBranchQuery, useGetCinemaQuery, useGetRoomQuery } from '@/app/redux/features/movie/cinema.service';
import type { DatePickerProps, GetProps } from 'antd';
import { DatePicker } from 'antd';
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
};
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
export default function MDaddInteresr() {
    const [data] = useAddInterestMutation()
    const { data: dataMV }: any = useGetMovieQuery()
    const { data: cinema }: any = useGetCinemaQuery()
    const { data: branch }: any = useGetBranchQuery()
    const { data: room }: any = useGetRoomQuery()

    // if (branch) {
    //     console.log('branch', branch?.data);
    // }

    const cinemaData = cinema?.data.map((item: any) => ({ label: item.name, value: item._id }))
    const [cinemaS, setCinemaS] = useState(cinema?.data[0]._id)
    const [branchS, setBranchS] = useState(branch?.data[0]._id)
    let branchData: any = branch?.data.filter((item: any) => (item.cinema == cinemaS)).map((item: any) => ({ label: item.name, value: item._id }))
    let roomData: any = room?.data.filter((item: any) => (item.branch == branchS)).map((item: any) => ({ label: item.name, value: item._id }))
    if (roomData) {
        console.log('roomData', roomData);
    }
    console.log(branchS);

    const handleCinema = (value: any) => {
        setCinemaS(value)
    };
    const handleBranch = (value: any) => {
        setBranchS(value)
    };
    const selectMovies = dataMV?.movie?.map((item: any) => ({
        value: item._id,
        label: item.name
    }))
    const [form] = Form.useForm();
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
            const data1 = await form.validateFields();
            console.log(data1);
            await data(values);
            form.resetFields();
            setOpen(false);
        } catch (error) {
            console.error('Failed to add movie:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Button onClick={showModal}>
                Thêm suất chiếu
            </Button>
            {branch ? <Modal
                width={800}
                title="Thêm suất chiếu"
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
                    <Form.Item label="Phim" name="movie" rules={[{ required: true }]}>
                        <Select options={selectMovies} />
                    </Form.Item>
                    <Form.Item label="Rạp " name="test1" rules={[{ required: true }]}>
                        <Select
                            onChange={handleCinema}
                            options={cinemaData}
                        />
                    </Form.Item>

                    <Form.Item label="Chi nhánh" name="test2" rules={[{ required: true }]}>
                        <Select
                            onChange={handleBranch}
                            options={branchData}
                        />
                    </Form.Item>
                    <Form.Item label="Phòng" name="roomId" rules={[{ required: true }]}>
                        <Select
                            options={roomData}
                        />
                    </Form.Item>

                    <Form.Item label="Thời gian" name="startTime" rules={[{ required: true }]}>
                        <DatePicker showTime onOk={onOk} />
                    </Form.Item>
                    <Form.Item >
                        <Button
                            className='bg-blue-500 hover:bg-blue-700 text-white'
                            type="primary"
                            loading={loading}
                            // onClick={handleOk}
                            htmlType="submit">
                            Submit
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
            </Modal > : 'đang tải'}
        </>
    )
}
