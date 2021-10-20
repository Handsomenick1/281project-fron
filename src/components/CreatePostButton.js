import React, { Component } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";

import { PostForm } from "./PostForm";
import { BASE_URL, TOKEN_KEY } from "../constants";

class CreatePostButton extends Component {
  state = {
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });

    // get form data
    this.postForm
      .validateFields()
      .then((form) => {
        const { firstname, lastname, description, uploadPost } = form;
        const { type, originFileObj } = uploadPost[0];
        const postType = type.match(/^(image)/g)[0];
        if (postType) {
          let formData = new FormData();
          formData.append("firstname", firstname);
          formData.append("lastname", lastname);
          formData.append("description", description);
          formData.append("mediafile", originFileObj);

          const opt = {
            method: "POST",
            url: `${BASE_URL}/upload`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
            data: formData
          };

          axios(opt)
            .then((res) => {
              if (res.status === 200) {
                message.success("The image is uploaded!");
                this.postForm.resetFields();
                this.handleCancel();
                this.props.onShowPost(postType);
                this.setState({ confirmLoading: false });
              }
            })
            .catch((err) => {
              console.log("Upload image failed: ", err.message);
              message.error("Failed to upload image!");
              this.setState({ confirmLoading: false });
            });
        }
      })
      .catch((err) => {
        console.log("err ir validate form -> ", err);
      });
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Post
        </Button>
        <Modal
          title="Create New Post"
          visible={visible}
          onOk={this.handleOk}
          okText="Create"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <PostForm ref={(refInstance) => (this.postForm = refInstance)} />
        </Modal>
      </div>
    );
  }
}

export default CreatePostButton;
