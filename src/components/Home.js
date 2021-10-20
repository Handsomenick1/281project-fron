import React, { useState, useEffect } from "react";
import { Tabs, message } from "antd";
import axios from "axios";
import PhotoGallery from "./PhotoGallery";
import { BASE_URL, TOKEN_KEY } from "../constants";
import CreatePostButton from "./CreatePostButton"
const { TabPane } = Tabs;

function Home(props) {
    const [posts, setPost] = useState([]);
    const [searchword] = useState("image");
    useEffect( () => {
        fetchPost(searchword);
    }, [searchword]);
    
    const fetchPost= (searchword) => {
        var url = `${BASE_URL}/get`
        const opt = {
            method: "GET",
            url: url,
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
            
        };
          axios(opt)
            .then((res) => {
              if (res.status === 200) {
                setPost(res.data);
              }
            })
            .catch((err) => {
              message.error("Fetch posts failed!");
              console.log("fetch posts failed: ", err.message);
            });  
    }
    
    const renderPosts = (keyword) => {
        if (!posts || posts.length === 0) {
            return <div>No data!</div>;
        }
        console.log("images -> ", posts);
        const imageArr = posts
            .filter((item) => item.type === "image")
            .map((image) => {
                return {
                src: image.url,
                user: image.user,
                description: image.description,
                firstname: image.firstname,
                lastname: image.lastname,
                uploadtime: image.uploadtime,
                updatetime: image.updatetime,
                thumbnail: image.url,
                thumbnailWidth: 350,
                thumbnailHeight: 250
                };
        });
        return <PhotoGallery images={imageArr} />;
    }
    const showPost = (type) => {
        console.log("type -> ", type);
        setTimeout(() => {
            fetchPost("image");
          }, 1000);
      };
    const operations = <CreatePostButton onShowPost={showPost}/>;

    return (
      <div className="home">
          <div className="display">
          <Tabs
            tabBarExtraContent={operations}
           >
            <TabPane tab="Repository" key="image">
                {renderPosts("image")}
            </TabPane>
          
        </Tabs>
        </div>
      </div>
    );
   
}

export default Home;
