import { message, Tabs, Form, Button } from 'antd';
import React, { useState } from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import { login } from '@/services/login';

import styles from './index.less';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.status === 'ok') {
        message.success('登录成功！');
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/home');
        return;
      }
    } catch (error) {
      message.error('登录失败，请重试!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Form
          form={form}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values: any) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab="账户密码登录" />
          </Tabs>

          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
              }}
              placeholder="用户名: admin or user"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
              }}
              placeholder="密码: ant.design"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <Button
              onClick={() => {
                form?.submit();
              }}
            >
              登陆
            </Button>
          </>
        </Form>
      </div>
    </div>
  );
};

export default Login;
