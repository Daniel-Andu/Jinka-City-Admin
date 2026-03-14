import React from "react";
import { Row, Col, Card, Typography, Space, Button } from "antd";
import {
    BankOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    PictureOutlined,
    SettingOutlined,
    MailOutlined,
    MessageOutlined,
    FolderOpenOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export const Dashboard = () => {
    const { t } = useTranslation();
    const quickActions = [
        {
            title: "Hero Sliders",
            description: "Create hero images and headlines.",
            to: "/hero-sliders",
            icon: <PictureOutlined />,
        },
        {
            title: "Page Hero Slides",
            description: "Assign hero slides to pages.",
            to: "/page-hero-slides",
            icon: <LinkOutlined />,
        },
        {
            title: "News",
            description: "Publish city news and updates.",
            to: "/news",
            icon: <FileTextOutlined />,
        },
        {
            title: "Departments",
            description: "Manage government departments.",
            to: "/departments",
            icon: <BankOutlined />,
        },
        {
            title: "Services",
            description: "Edit public service listings.",
            to: "/city-services",
            icon: <AppstoreOutlined />,
        },
        {
            title: "Subscribers",
            description: "View newsletter subscribers.",
            to: "/subscribers",
            icon: <MailOutlined />,
        },
        {
            title: "Messages",
            description: "Review contact messages.",
            to: "/messages",
            icon: <MessageOutlined />,
        },
        {
            title: "Media Library",
            description: "Manage uploaded files.",
            to: "/media",
            icon: <FolderOpenOutlined />,
        },
        {
            title: "Settings",
            description: "Update site settings and info.",
            to: "/settings",
            icon: <SettingOutlined />,
        },
    ];

    return (
        <div>
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <Title level={2} style={{ color: "white", marginBottom: 8 }}>
                    {t('dashboard.title')}
                </Title>
                <Text style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: 16 }}>
                    {t('dashboard.welcome')}
                </Text>
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                    Quick Actions
                </Title>
                <Row gutter={[16, 16]}>
                    {quickActions.map((action) => (
                        <Col xs={24} sm={12} lg={8} key={action.to}>
                            <Card bordered style={{ borderRadius: 10 }}>
                                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                                    <Space>
                                        {action.icon}
                                        <Text strong>{action.title}</Text>
                                    </Space>
                                    <Text type="secondary">{action.description}</Text>
                                    <Link to={action.to}>
                                        <Button type="primary" block>
                                            Open
                                        </Button>
                                    </Link>
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
};
