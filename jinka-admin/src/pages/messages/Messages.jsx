import React, { useState, useEffect } from "react";
import { List, Avatar, Badge, Card, Input, Modal, Typography, message as antMessage, Spin, Button, Space, Popconfirm } from "antd";
import {
    UserOutlined,
    SearchOutlined,
    CloseOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { messageService } from "../../services";

const { Text, Title } = Typography;

export const MessageList = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch messages from backend
    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await messageService.getAll();
            console.log('Messages from backend:', response);
            setMessages(response.data || response || []);
            antMessage.success('Messages loaded from database');
        } catch (error) {
            console.error('Error fetching messages:', error);
            antMessage.error('Failed to load messages from backend');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // Delete message
    const handleDelete = async (id) => {
        try {
            await messageService.delete(id);
            antMessage.success('Message deleted successfully');
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
            antMessage.error('Failed to delete message');
        }
    };

    const filteredMessages = messages.filter(msg =>
        (msg.name || msg.sender || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (msg.subject || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (msg.message || msg.preview || '').toLowerCase().includes(searchText.toLowerCase())
    );

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedMessage(null);
    };

    return (
        <div>
            <div className="page-header">
                <h1>Messages</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : `Connected to backend database (${messages.length} messages)`}
                </p>
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Input
                    placeholder="Search messages..."
                    prefix={<SearchOutlined />}
                    style={{ marginBottom: 16 }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                />

                <List
                    itemLayout="horizontal"
                    dataSource={filteredMessages}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                background: item.unread ? "#f0f9ff" : "white",
                                padding: "16px",
                                borderRadius: 8,
                                marginBottom: 8,
                                cursor: "pointer",
                            }}
                            onClick={() => handleMessageClick(item)}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot={item.unread}>
                                        <Avatar icon={<UserOutlined />} size={48} />
                                    </Badge>
                                }
                                title={
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: item.unread ? 600 : 400 }}>
                                            {item.sender}
                                        </span>
                                        <span style={{ fontSize: 12, color: "#6b7280" }}>
                                            {item.time}
                                        </span>
                                    </div>
                                }
                                description={
                                    <div>
                                        <div style={{ fontWeight: item.unread ? 600 : 400, marginBottom: 4 }}>
                                            {item.subject}
                                        </div>
                                        <div style={{ color: "#6b7280" }}>{item.preview}</div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>

            <Modal
                title={null}
                open={isDetailOpen}
                onCancel={handleCloseDetail}
                footer={null}
                width={700}
                closeIcon={<CloseOutlined />}
            >
                {selectedMessage && (
                    <div>
                        <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 16, marginBottom: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                <Avatar icon={<UserOutlined />} size={48} />
                                <div style={{ flex: 1 }}>
                                    <Title level={5} style={{ margin: 0 }}>{selectedMessage.sender}</Title>
                                    <Text type="secondary" style={{ fontSize: 12 }}>{selectedMessage.time}</Text>
                                </div>
                            </div>
                            <Title level={4} style={{ margin: 0 }}>{selectedMessage.subject}</Title>
                        </div>

                        <div style={{ marginBottom: 24, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                            {selectedMessage.fullMessage}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
