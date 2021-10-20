import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { BASE_URL, TOKEN_KEY } from "../constants";
import axios from "axios";
import { Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import  EditPostButton  from "./EditPostButton";
import InformationButton from "./InformationButton";
import Gallery from 'react-grid-gallery';

const captionStyle = {
   backgroundColor: "rgba(0, 0, 0, 0.6)",
   maxHeight: "240px",
   overflow: "hidden",
   position: "absolute",
   bottom: "0",
   width: "100%",
   color: "white",
   padding: "2px",
   fontSize: "90%",
};

const wrapperStyle = {
   display: "block",
   minHeight: "1px",
   width: "100%",
   overflow: "auto",
};

function PhotoGallery(props) {
    const [images, setImages] = useState(props.images);
   const [curImgIdx, setCurImgIdx] = useState(0);
   const imagaArr = images.map( image => {
       return {
           ...image,
           customOverlay: (
               <div style={captionStyle}>
               <div>{`${image.uploadtime}`}</div>
           </div>
           )
       }
   });
   const onDeleteImage = () => {
    if (window.confirm(`Are you sure you want to delete this image?`)) {
      const curImg = images[curImgIdx];
      const newImageArr = images.filter((img, index) => index !== curImgIdx);
      console.log("delete image ", newImageArr);
      const opt = {
        method: "POST",
        url: `${BASE_URL}/delete`,
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        },
        data: {
            url : `${curImg.src}`,
        }
      };

      axios(opt)
        .then((res) => {
          console.log("delete result -> ", res);
          // case1: success
          if (res.status === 200) {
            // step1: set state
            setImages(newImageArr);
          }
        })
        .catch((err) => {
          // case2: fail
          message.error("Fetch posts failed!");
          console.log("fetch posts failed: ", err.message);
        });
    }
  };

  const onCurrentImageChange = (index) => {
    console.log("curIdx ", index);
    setCurImgIdx(index);
  };
  const onEditImage = () => {
    <EditPostButton />
  }
  useEffect(() => {
    setImages(props.images);
  }, [props.images]);

  const onInformation = () => {
    <InformationButton />
  }

   return (
       <div className="gallery" style={wrapperStyle}>
           <Gallery
               images={imagaArr}
               currentImageWillChange={onCurrentImageChange}
               enableImageSelection={false}
               backdropClosesModal={true}
               customControls={[
                <Button
                    style={{ marginTop: "0px", marginLeft: "0px" }}
                    key="deleteImage"
                    type="primary"
                    icon={<DeleteOutlined />}
                    size="default"
                    onClick={onDeleteImage}
                >
                  Delete Image
                </Button>,
                <InformationButton 
                    key="information"
                    type="primary"
                    size="default"
                    onClick={onInformation}
                    curobj={ images[curImgIdx] || '' }
                >
                    Information
                </InformationButton>,
                <EditPostButton
                        key="editImage"
                        type="primary"
                        size="default"
                        onClick={onEditImage}
                        curIndex={images[curImgIdx]}
                    >
                    Edit Image
                </EditPostButton>,
                
                
              ]}
           />
       </div>

   );
}

PhotoGallery.propTypes = {
   images: PropTypes.arrayOf(
       PropTypes.shape({
           user: PropTypes.string.isRequired,
           description: PropTypes.string.isRequired,
           src: PropTypes.string.isRequired,
           uploadtime: PropTypes.string.isRequired,
           updatetime: PropTypes.string.isRequired,
           firstname: PropTypes.string.isRequired,
            lastname: PropTypes.string.isRequired,
           thumbnail: PropTypes.string.isRequired,
           thumbnailWidth: PropTypes.number.isRequired,
           thumbnailHeight: PropTypes.number.isRequired,
       })
   ).isRequired
};

export default PhotoGallery;