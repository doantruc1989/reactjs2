import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Pagination, Table, Form, Input, Button, Modal, } from 'antd';
import { SaveOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';


const Order = () => {
    const [order, setOrder] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [editingRow, setEditingRow] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        try {
            axios.get(`http://localhost:3001/admin/listorder`)
                .then((response => {
                    setOrder(response.data.map(row => ({
                        id: row.id,
                        userId: row.userId,
                        cartTotal: row.cartTotal,
                        revenue: row.revenue,
                        orderItems: row.orderItems,
                        createdAt: row.createdAt,
                    })))
                }));
        } catch (error) {
            console.log(error)
        }
    }, [currentPage, order])

    const columns = [
        {
            title: "id",
            dataIndex: "id",
            width: 50,
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="id"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: "UserId",
            dataIndex: "userId",
            width: 100,
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="userId"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: 'CartTotal',
            dataIndex: 'cartTotal',
            width: 120,
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="cartTotal"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },

        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            width: 100,
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="revenue"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: 'OrderItems',
            dataIndex: 'orderItems',
            ellipsis: true,
            width: 'auto',
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="orderItems"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            ellipsis: true,
            width: 'auto',
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="createdAt"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: 'Action',
            render: (_, record) => {
                return (
                    <>
                        <Button
                            type="link"
                            onClick={() => {
                                setEditingRow(record.id);
                                form.setFieldsValue({
                                    id: record.id,
                                    userid: record.userId,
                                    cartTotal: record.cartTotal,
                                    revenue: record.revenue,
                                    orderItems: record.orderItems,
                                    createdAt: record.createdAt,
                                });
                            }}
                        >
                            <EditOutlined style={{ fontSize: '20px' }} />
                        </Button>
                        <Button type="link" htmlType="submit">
                            <SaveOutlined style={{ fontSize: '20px' }} />
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                Modal.confirm({
                                    title: "Are you sure to delete this order record?",
                                    okText: "Yes",
                                    okType: "danger",
                                    onOk: () => {
                                        setEditingRow(record.id)
                                        try {
                                            axios.delete(`http://localhost:3001/sdasd/${record.id}`)
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    },
                                });
                            }}
                        >
                            <DeleteOutlined style={{ fontSize: '20px' }} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const onChange = (current) => {
        setcurrentPage(current);
    };

    const onFinish = (values) => {
        const updatedDataSource = [...order];
        setOrder(updatedDataSource);
        setEditingRow(null);
        try {
            axios.post(`http://localhost:3001/order/${values.id}`,
                values,
            );
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div>
            <h1>Order Table</h1>

            <Form form={form} onFinish={onFinish}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={order}
                    pagination={false} />
            </Form>

            {/* {products.map((product, index) => (
                <div key={index}>
                    {product.productName}
                </div>
            ))} */}

            <Pagination
                className='pagination'
                responsive={true}
                current={currentPage}
                onChange={onChange}
                total={50} />
        </div>
    )
}

export default Order