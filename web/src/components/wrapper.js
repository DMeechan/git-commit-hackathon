import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

export default function Wrapper(PureComponent) {
    class Layout extends React {
        render() {
            return (
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">Submit Feedback</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Submit Feedback</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <WrappedComponent {...this.props} />
                        </div>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>
                        Stackshack 2019 - Team: git commit
                    </Footer> */}
                </Layout>
            );
        }
    }
}