import React, { forwardRef } from "react";
import { Form, Input } from "antd";

export const EditForm = forwardRef((props, formRef) => {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      position: 'absolute',
    };
    
    return (
        <div className="EditForm">
            <Form name="validate_other" {...formItemLayout} ref={formRef}>
                <Form.Item
                name="firstname"
                label="Firstname"
                rules={[
                    {
                    required: true,
                    message: "Please input your firstname!"
                    }
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                name="lastname"
                label="Lastanme"
                rules={[
                    {
                    required: true,
                    message: "Please input your Lastname!"
                    }
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                    required: true,
                    message: "Please input your Description!"
                    }
                ]}
                >
                <Input />
                </Form.Item>
            </Form>
      </div>
    );
   });