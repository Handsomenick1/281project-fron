import React, { Component } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";

import { EditForm } from "./EditForm";
import { BASE_URL, TOKEN_KEY } from "../constants";

class EditPostButton extends Component {

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
    this.editForm
      .validateFields()
      .then((form) => {
        const { firstname, lastname, description } = form;
        
          let formData = new FormData();
          formData.append("firstname", firstname);
          formData.append("lastname", lastname);
          formData.append("description", description);
          formData.append("url", this.props.curIndex.src);

          let dc = {"firstname": firstname,
                    "lastname": lastname,
                    "description": description,
                    "url": this.props.curIndex.src
                }
          const opt = {
            method: "POST",
            url: `${BASE_URL}/update`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
            data: dc
          };

          axios(opt)
            .then((res) => {
              if (res.status === 200) {
                message.success("The image is updated!");
                this.handleCancel();
                this.setState({ confirmLoading: false });
              }
            })
            .catch((err) => {
              console.log("Update image failed: ", err.message);
              message.error("Failed to Update image!");
              this.setState({ confirmLoading: false });
            });
        
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
      <div className="Edit-btn">
        <Button style={{ marginTop: "0px", marginLeft: "30px" }} 
        type="primary" 
        size="default"
        icon={<EditOutlined />}
        onClick={this.showModal}>
          Edit Post
        </Button>
        <Modal
          zIndex = "2250"
          title="Edit Post"
          visible={visible}
          onOk={this.handleOk}
          okText="Edit"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <EditForm ref={(refInstance) => (this.editForm = refInstance)} />
        </Modal>
      </div>
    );
  }
}

export default EditPostButton;
