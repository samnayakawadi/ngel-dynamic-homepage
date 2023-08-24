import axios from "axios";
import React, { useState, useEffect } from "react";
import { UncontrolledCollapse } from "reactstrap";
import './styles.css'
import swal from 'sweetalert';
import { Container, Row, Col, Tab, Nav, Modal, Button } from 'react-bootstrap';
import Videojs from '../../pages/instructor/instCourses/video';
import UserService from "../../services/UserService";

const Menu = (props) => {

  useEffect(() => {
    UserService.generateToken();
   }, []);

  const [getUrlModal, setUrlModal] = useState({
    show: false
  })
  const UrlModalHide = () => {
    setUrlModal({ show: false })
  }


  const [getUrl, setUrl] = useState();
  const [getContentType, setContentType] = useState();
  const courseStructurContentView = (contentType, fileUrl) => {
    axios.get("http://10.244.3.218:8080/" + fileUrl)
      .then(res => {
        setUrl(res.data);
        setContentType(contentType);
        setUrlModal({ show: true });
        //window.open("http://10.244.3.218:8080/" + res.data, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1000,height=1000");
      }).catch(err => {
        swal("Error!", `${err} Try after sometime.`, "error");
      })
  }


  const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    width: 1100,
    height: 800,
    controls: true,
    sources: [
      {
        src: `http://10.244.3.218:8080/${getUrl}`,
        type: 'video/mp4',
      },
    ]
  };
  const [getData, setData] = useState()
  const [itemsCourse, setItemsCourse] = useState([]);

  const handleClick = () => {
    alert("id");
  }

  useEffect(() => {
    treeStructure();
  }, [])

  function treeStructure() {
    axios.get("http://10.244.3.218:8082/courseOrganizer/getCourseStructure/1")
      .then(res => {
        let menuData = [res.data];
        let menuItems = menuData.map((item, i) => {
          let menuItem = returnMenuItem(item, i);
          return menuItem;
        });
        setItemsCourse(menuItems);
      })
    const returnMenuItem = (item, i) => {
      let menuItem;

      if (item.nodes.length === 0) {
        menuItem = (
          <div className="item" key={i}>
            <div style={{ padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' }}>
              <span><i className="fas fa-folder" style={{ fontSize: "18px", color: 'black' }}></i><span style={{ marginLeft: "10px" }} onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label} &nbsp;&nbsp;</span>
              </span>
            </div>
          </div>
        );
      } else {
        let menuItemChildren = item.nodes.map((item, i) => {
          let menuItem = returnMenuItem(item, i);
          return menuItem;
        });
        menuItem = (
          <div key={i} className="item">
            <div className="toggler" id={`toggle-menu-item-${item.id}`}>
              <div style={{ padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px", marginTop: "8px", verticalAlign: "middle", marginRight: '10px' }}>
                <span ><i className='fas fa-folder' style={{ fontSize: "18px", color: 'black' }}></i><span style={{ marginLeft: "10px" }} onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label} &nbsp;&nbsp;</span>
                </span>
              </div>
            </div>
            <UncontrolledCollapse
              className="children"
              toggler={`#toggle-menu-item-${item.id}`}
            >
              <div>{menuItemChildren}</div>
            </UncontrolledCollapse>
          </div>
        );
      }
      return menuItem;
    };
  };

  return (
    <div>
      < div className="items" > {itemsCourse}
      </div >
      <Modal
        size="xl" centered show={getUrlModal.show} onHide={() => UrlModalHide()} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {getContentType === "zip" ? <i class="fas fa-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}> Zip</i>
              : getContentType === "pdf" ? <i class="fas fa-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}> PDF</i>
                : getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <i class="fas fa-file-image" style={{ fontSize: "25px", color: "#b2b1ff" }}> Image</i>
                  : getContentType === "html" ? <i class="fab fa-html5" style={{ fontSize: "25px", color: "#e54c21" }}> Html</i>
                    : getContentType === "ogg" || getContentType === "webm" || getContentType === "mp4" ? <i class="fas fa-file-video" style={{ fontSize: "25px", color: "#8cee02" }}> Video</i>
                      : getContentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}> Text</i>
                        : getContentType === "doc" || getContentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}> Doc</i>
                          : getContentType === "scorm" ? <i class="far fa-file-archive" style={{ fontSize: "25px", color: "green" }}> Scorm</i>
                            : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <img src={`http://10.244.3.218:8080/${getUrl}`} width="1100" height="800" />
              : getContentType === "pdf" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} type="application/pdf" ></iframe>
                : getContentType === "mp4" ? <div> <Videojs {...videoJsOptions} /></div>
                  : getContentType === "docx" ? <iframe width="100%" height="100%" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                    : getContentType === "html" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                      : getContentType === "zip" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                        : getContentType === "scorm" ? <iframe width="1100" height="800" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
                          : <p>No Content Available</p>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Menu;




// const [items, setItems] = useState([]);
//     useEffect(() => {
//         axios.get("http://10.244.3.218:8082/courseOrganizer/getCourseStructure/1")
//             .then(res => {
//                 let menuData = [res.data]
//                 let menuItems = menuData.map((item, i) => {
//                     let menuItem = returnMenuItem(item, i);
//                     return menuItem;
//                 });
//                 setItems(menuItems);
//             })
//         const returnMenuItem = (item, i) => {
//             let menuItem;

//             if (item.nodes.length === 0) {
//                 menuItem = (
//                     <ul className="item" key={i}>
//                         {item.nodetype == "pdf" ? <span onClick={() => courseStructurContentView(item.nodetype, item.filePath)}><i className="fas fa-file-pdf"></i><span style={{ marginLeft: "10px" }}>{item.label}</span></span>
//                             : item.nodetype == "png" || item.nodetype == "jpg" ? <span onClick={() => courseStructurContentView(item.nodetype, item.filePath)}><i className="fas fa-image"></i><span style={{ marginLeft: "10px" }}>{item.label}</span></span>
//                                 : item.nodetype == "zip" ? <span onClick={() => courseStructurContentView(item.nodetype, item.filePath)}><i className="fas fa-file-archive"></i><span style={{ marginLeft: "10px" }}>{item.label}</span></span>
//                                     : item.nodetype == "scorm" ? <span onClick={() => courseStructurContentView(item.nodetype, item.filePath)}><i className="fas fa-file-archive"></i><span style={{ marginLeft: "10px" }}>{item.label}</span></span>
//                                         : item.nodetype == "html" ? <span onClick={() => courseStructurContentView(item.nodetype, item.filePath)}><i className="fab fa-html5"></i><span style={{ marginLeft: "10px" }}>{item.label}</span></span>
//                                             : item.nodetype == "mp4" ? <span onClick={() => courseStructurContentView(item.nodetype, item.filePath)}><i className="fas fa-video"></i><span style={{ marginLeft: "10px" }}>{item.label}</span></span>
//                                                 : <span>{item.label}</span>}
//                     </ul>
//                 );
//             } else {
//                 let menuItemChildren = item.nodes.map((item, i) => {
//                     let menuItem = returnMenuItem(item, i);
//                     return menuItem;
//                 });
//                 menuItem = (
//                     <ul key={i} className="item">
//                         <li className="toggler" id={`toggle-menu-item-${item.id}`}>
//                             {item.nodetype == "folder" ? <span><i className="fas fa-folder"></i><span style={{ marginLeft: "10px" }}>{item.label}123</span></span>
//                                 // : item.nodetype == "root" ? <span><i className="fas fa-house-user"></i><span style={{ marginLeft: "10px" }}>{item.label}</span></span>
//                                 : <span>{item.label}</span>}
//                         </li>

//                         <UncontrolledCollapse
//                             className="children"
//                             toggler={`#toggle-menu-item-${item.id}`}
//                         >
//                             {menuItemChildren}
//                         </UncontrolledCollapse>
//                     </ul>
//                 );
//             }
//             return menuItem;
//         };
//     }, []);

