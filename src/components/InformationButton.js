import React, { Component } from "react";
import { Modal, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

class InformationButton extends Component {
    state = {
        visible: false,
    };
    
    showModal = () => {
        this.setState({
          visible: true
        });
      };
    handleClose = () => {
        console.log("Clicked close button");
          this.setState({
            visible: false
        });
    };
    render() {
        return (
            <div>
            <Button type="primary" 
            style={{ marginBottom: "0px", marginLeft: "30px", color: "white"}} 
            size="default"
            onClick={this.showModal}
            icon={<QuestionCircleOutlined />}
            >
                Information
            </Button>
            <Modal
                zIndex = "2600"
                width={750}
                title="Information"
                visible={this.state.visible}
                onOk={this.handleClose}
                onCancel={this.handleClose}
                okText="ok"
            >
            <p> Firstname: {this.props.curobj.firstname} </p>
            <p> Lastname: {this.props.curobj.lastname}</p>
            <p> Description: {this.props.curobj.description}</p>
            <p> UploadTime: {this.props.curobj.uploadtime}</p>
            <p> UpdateTime: {this.props.curobj.updatetime}</p>
            <p> URL: {this.props.curobj.thumbnail}</p>
            </Modal>
          </div>
        );
      }
}

export default InformationButton;
