import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Checkbox } from 'antd';
import SelectAllCheckbox from '../components/SelectAllCheckbox'; 
const AdminPage = ({ users, deleteUser }) => {
    const [data, setData] = useState(users);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); 

    const showAddModal = () => {
        setIsModalVisible(true);
    };

    const handleAddUser = (values) => {
        const newUser = {
            key: data.length + 1,
            name: values.name,
            age: values.age,
            address: values.address,
        };
        setData([...data, newUser]);
        setIsModalVisible(false);
        message.success('Запис додано!');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDeleteSelected = () => {
        setData(data.filter((user) => !selectedRowKeys.includes(user.key)));
        message.success('Вибрані записи видалені');
        setSelectedRowKeys([]); 
    };

    const columns = [
        {
            title: <SelectAllCheckbox selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} data={data} />, 
            key: 'select',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.key)}
                    onChange={(e) => {
                        const newSelectedRowKeys = e.target.checked
                            ? [...selectedRowKeys, record.key]
                            : selectedRowKeys.filter((key) => key !== record.key);
                        setSelectedRowKeys(newSelectedRowKeys);
                    }}
                />
            ),
        },
        { title: 'Ім\'я', dataIndex: 'name', key: 'name' },
        { title: 'Вік', dataIndex: 'age', key: 'age' },
        { title: 'Адреса', dataIndex: 'address', key: 'address' },
    ];

    return (
        <div>
            <h1>Сторінка Адміністратора</h1>
            <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
                Додати запис
            </Button>
            <Button
                type="danger"
                onClick={handleDeleteSelected}
                disabled={selectedRowKeys.length === 0}
                style={{ marginBottom: 16, marginLeft: 10 }}
            >
                Видалити вибрані записи
            </Button>
            <Table
                rowSelection={{
                    selectedRowKeys,
                    onChange: (keys) => setSelectedRowKeys(keys),
                }}
                columns={columns}
                dataSource={data}
                rowKey="key"
            />
            <Modal
                title="Додати нового користувача"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleAddUser}>
                    <Form.Item
                        label="Ім'я"
                        name="name"
                        rules={[{ required: true, message: 'Введіть ім\'я' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Вік"
                        name="age"
                        rules={[
                            { required: true, message: 'Введіть вік' },
                            { pattern: /^[0-9]+$/, message: 'Вік повинен бути числом' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Адреса"
                        name="address"
                        rules={[{ required: true, message: 'Введіть адресу' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Додати
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminPage;
