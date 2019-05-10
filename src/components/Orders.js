import React, { useState } from "react";
import { Modal, Button, Table, Divider, Input, Form } from "antd";

function Orders() {
    const [dialogVisible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        notes: ""
    });
    const [indexUpdate, setIndexUpdate] = useState(0);
    const { name, price, notes } = formData;
    const [orders, setOrders] = useState([
        {
            key: "0",
            name: "Cocktails",
            price: 10,
            notes: "New York No. 1 Lake Park"
        },
        {
            key: "1",
            name: "Milk",
            price: 12,
            notes: "New York No. 1 Lake Park"
        },
        {
            key: "2",
            name: "Cocktails",
            price: 14,
            notes: "New York No. 1 Lake Park"
        },
        {
            key: "3",
            name: "Cocktails",
            price: 16,
            notes: "New York No. 1 Lake Park"
        }
    ]);
    const [dialogUpdate, setVisibleUpdate] = useState(false);
    const { Column } = Table;
    const { TextArea } = Input;
    const pStyle = {
        width: "100%",
        margin: "10px 0"
    };
    function deleteOrder(index) {
        const newOrder = [...orders];
        newOrder.splice(index, 1);
        setOrders(newOrder);
    }

    function addOrder() {
        const params = {
            key: orders.length + 1,
            name: name,
            price: price,
            notes: notes
        };
        orders.push(params);
        setOrders(orders);
        setVisible(false);
        setFormData("");
    }
    const updateFormData = event => {
        event.persist();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    function handleUpdate(event) {
        // event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function updateOrder(index) {
        setVisibleUpdate(false);
        orders[index].name = formData.name;
        orders[index].price = formData.price;
        orders[index].notes = formData.notes;
        setOrders(orders);
    }
    function openModal(index) {
        setFormData(orders[index]);
        setVisibleUpdate(true);
        setIndexUpdate(index);
    }
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Add Orders
            </Button>
            <Modal
                title="Add Orders"
                visible={dialogVisible}
                onOk={() => addOrder()}
                onCancel={() => setVisible(false)}
            >
                <Form>
                    <Input placeholder="Please name" name="name" value={name} onChange={updateFormData} />
                    <Input
                        placeholder="Please price"
                        name="price"
                        value={price}
                        onChange={updateFormData}
                        style={pStyle}
                    />
                    <TextArea placeholder="Please notes" name="notes" value={notes} onChange={updateFormData} />
                </Form>
            </Modal>
            <Table dataSource={orders} rowKey="uid">
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Notes" dataIndex="notes" key="notes" />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record, index) => (
                        <span>
                            <Button onClick={() => openModal(index)}>Edit</Button>
                            <Modal
                                title="Update Orders"
                                visible={dialogUpdate}
                                onOk={() => updateOrder(indexUpdate)}
                                onCancel={() => setVisibleUpdate(false)}
                            >
                                <Form>
                                    <Input
                                        placeholder="Please name"
                                        name="name"
                                        value={name}
                                        onChange={e => {
                                            e.persist = () => {};
                                            handleUpdate(e);
                                        }}
                                    />
                                    <Input
                                        placeholder="Please price"
                                        name="price"
                                        style={pStyle}
                                        value={price}
                                        onChange={e => {
                                            e.persist = () => {};
                                            handleUpdate(e);
                                        }}
                                    />
                                    <TextArea
                                        placeholder="Please notes"
                                        name="notes"
                                        value={notes}
                                        onChange={e => {
                                            e.persist = () => {};
                                            handleUpdate(e);
                                        }}
                                    />
                                </Form>
                            </Modal>
                            <Divider type="vertical" />
                            <Button
                                onClick={() => {
                                    deleteOrder(index);
                                }}
                            >
                                Delete
                            </Button>
                        </span>
                    )}
                />
            </Table>
        </div>
    );
}
export default Orders;
