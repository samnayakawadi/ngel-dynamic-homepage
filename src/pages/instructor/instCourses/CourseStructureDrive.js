import { render } from "@testing-library/react";
import React, { useState, useEffect, useMemo } from "react";
import { BreadcrumbBox } from "../../../components/common/Breadcrumb";
import HeaderTwo from "../../../components/HeaderTwo";
import { Button, Card, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Videojs from "./video.js";
import swal from "sweetalert";
import instructorService from "../../../services/instructorService.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FilterDataTable from "../FilterDataTable";
import FooterTwo from "../../../components/FooterTwo";
import UserService from "../../../services/UserService";
import { UncontrolledCollapse } from "reactstrap";
import JSZip from "jszip";
import "../styles.css";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import md5 from "md5";
import ViewPdf from "../ViewPdf.js";
import CryptoJS from "crypto-js";
import axios from "axios";

const customStyles = {
  title: {
    style: {
      fontColor: "red",
      fontWeight: "900",
    },
  },
  headCells: {
    style: {
      fontSize: "17px",
      fontWeight: "500",
      textTransform: "uppercase",
      paddingLeft: "0 8px",
      marginLeft: "10px",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      // paddingLeft: '0 8px',
      // marginLeft: '10px'
    },
  },
};

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },

  {
    code: "hi",
    name: "Hindi",
    country_code: "in",
  },
  // {
  //   code: 'te',
  //   name: 'Telugu',
  //   country_code: 'in'
  // },
  {
    code: 'pu',
    name: 'Punjabi',
    country_code: 'in'
  },
  // {
  //     code : 'mr',
  //     name : 'Marathi',
  //     country_code : 'in'
  // }
];

function CourseStructureDrive() {

  let token = "test";

  useEffect(() => {
    token = UserService.generateToken();
  }, []);

  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  const [errorMsg, setErrorMsg] = useState();
  const [getLoading, setLoading] = useState();

  let userId = UserService.getUserid();
  const [getUploadModalState, setUploadModalState] = useState({
    show: false,
  });
  const [getModalState, setModalState] = useState({
    show: false,
  });

  const handleModal2 = () => {
    setErrorMsg();
    setModalState({ show: false });
  };

  const handleModal = () => {
    setModalState({ show: true });
  };

  const FileUploadModalShow = () => {
    setUploadModalState({ show: true });
    setCheckBox(false);
    setShow(false);
  };

  const FileUploadModalHide = () => {
    setabc({
      ...getabc,
      currentFile: undefined,
      selectFile: undefined,
      file: "",
    });
    setErrorMsg1({
      ...errorMsg1,
      fileErr: "",
      durationErr: "",
    });
    setUploadModalState({ show: false });
  };

  const UrlModalHide = () => {
    setUrlModal({ show: false });
    setUrl("");
  };

  const [getUrlModal, setUrlModal] = useState({
    show: false,
  });

  function changeBackgroundOver(e) {
    e.target.style.background =
      "linear-gradient(90deg, #009444 0%, #11B67A 100%)";
  }

  function changeBackgroundOut(e) {
    e.target.style.background =
      "linear-gradient(90deg, #11B67A 0%, #009444 100%)";
  }

  function save(getParentId) {
    const folder_name = document.getElementById("folderName");
    if (folder_name.value === "") {
      return setErrorMsg(t("enter_folder_name"));
    }
    if (!folder_name.value.match(/^[A-Za-z ]{2,50}$/)) {
      //console.log("True");
      return setErrorMsg(
        t('alphabet_2_to_50')
      );
    }
    let dirname = folder_name.value;
    if (getParentId.length == 0) {
      let register = { dirName: dirname, lastModifiedBy: userId };
      instructorService
        .createDirectory(register)
        .then(async (response) => {
          if (response.status == 201) {
            await swal(t("created"), t("root_folder_created"), "success");
            instructorService.getFolderStructure(userId).then((res) => {
              setFolder(res.data);
            });
            folderStructureTree();
            setModalState(false);
            setParentId([]);
          } else {
            alert("some error");
          }
        })
        .catch((err) => {
          swal(t("error"), t("try_sometimes"), "error");
        });
    } else {
      let register = {
        dirName: dirname,
        lastModifiedBy: userId,
        dirParentId: getParentId,
      };
      instructorService
        .createChildDirectory(register)
        .then(async (response) => {
          if (response.status == 200) {
            await swal(t("created"), t("child_folder_created"), "success");
            instructorService.getFolderStructure(userId).then((res) => {
              setFolder(res.data);
            });
            folderStructureTree();
            setModalState(false);
            setParentId([]);
          } else {
            alert("some error");
          }
        })
        .catch((err) => {
          swal(t("error"), t("try_sometimes"), "error");
        });
    }
  }

  const [isActiveFolderId, setIsActiveFolderId] = useState();
  const abc1 = (dirId, dirName) => {
    setIsActiveFolderId(dirId);
    setParentId(dirId);
    setFolderName(dirName);
    instructorService.contentDetails(dirId, userId).then((res) => {
      setContentDetails(res.data);
      //console.log(res.data);
    });
  };

  const [items, setItems] = useState([]);
  function folderStructureTree() {
    instructorService.getFolderStructure(userId).then((res) => {
      let menuItems = res.data.map((item, i) => {
        let menuItem = returnMenuItem(item, i);
        return menuItem;
      });
      setItems(menuItems);
    });
    const returnMenuItem = (item, i) => {
      let menuItem;
      if (item.Child.length === 0) {
        menuItem = (
          <div className="item" key={i}>
            <div>
              <span
                style={
                  isActiveFolderId == item.Id
                    ? {
                        backgroundColor: "#11b67a",
                        display: "block",
                        color: "white",
                        padding: "8px",
                        border: "1px solid #d3d3d3",
                        borderRadius: "5px",
                        marginTop: "8px",
                        verticalAlign: "middle",
                        marginRight: "10px",
                      }
                    : {
                        padding: "8px",
                        display: "block",
                        border: "1px solid #d3d3d3",
                        borderRadius: "5px",
                        marginTop: "8px",
                        verticalAlign: "middle",
                        marginRight: "10px",
                      }
                }
                onClick={() => abc1(item.Id, item.Name)}
              >
                <i
                  className="fas fa-folder"
                  style={
                    isActiveFolderId == item.Id
                      ? { fontSize: "18px", color: "white" }
                      : { fontSize: "18px", color: "black" }
                  }
                ></i>
                <span style={{ marginLeft: "10px" }}>
                  {item.Name} &nbsp;&nbsp;
                </span>
                <span style={{ position: "relative", float: "right" }}>
                  {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                                        <span className="d-inline-block">
                                            <a class="link" href="#"><i class="fas fa-trash" onClick={() => deleteDirectory(item.Id)} style={{ fontSize: "16px" }}></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>
                                    </OverlayTrigger> */}
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">{t("edit")}</Tooltip>
                    }
                  >
                    <span className="d-inline-block">
                      <a class="link" href="#">
                        <i
                          class="fas fa-edit"
                          onClick={() => directoryEdit(item.Id, item.Name)}
                          style={{ fontSize: "16px" }}
                        ></i>
                      </a>
                    </span>
                  </OverlayTrigger>
                </span>
              </span>
            </div>
          </div>
        );
      } else {
        let menuItemChildren = item.Child.map((item, i) => {
          let menuItem = returnMenuItem(item, i);
          return menuItem;
        });
        menuItem = (
          <div key={i} className="item">
            <div className="toggler" id={`toggle-menu-item-${item.Id}`}>
              <div>
                <span
                  style={
                    isActiveFolderId == item.Id
                      ? {
                          backgroundColor: "#11b67a",
                          display: "block",
                          color: "white",
                          padding: "8px",
                          border: "1px solid #d3d3d3",
                          borderRadius: "5px",
                          marginTop: "8px",
                          verticalAlign: "middle",
                          marginRight: "10px",
                        }
                      : {
                          padding: "8px",
                          display: "block",
                          border: "1px solid #d3d3d3",
                          borderRadius: "5px",
                          marginTop: "8px",
                          verticalAlign: "middle",
                          marginRight: "10px",
                        }
                  }
                  onClick={() => abc1(item.Id, item.Name)}
                >
                  <i
                    className="fas fa-folder"
                    style={
                      isActiveFolderId == item.Id
                        ? { fontSize: "18px", color: "white" }
                        : { fontSize: "18px", color: "black" }
                    }
                  ></i>
                  <span style={{ marginLeft: "10px" }}>
                    {item.Name} &nbsp;&nbsp;
                  </span>
                  <span style={{ position: "relative", float: "right" }}>
                    {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                                            <span className="d-inline-block">
                                                <a class="link" href="#"><i class="fas fa-trash" onClick={() => deleteDirectory(item.Id)} style={{ fontSize: "16px" }}></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
                                            </span>
                                        </OverlayTrigger> */}
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">{t("edit")}</Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <a class="link" href="#">
                          <i
                            class="fas fa-edit"
                            onClick={() => directoryEdit(item.Id, item.Name)}
                            style={{ fontSize: "16px" }}
                          ></i>
                        </a>
                      </span>
                    </OverlayTrigger>
                  </span>
                </span>
              </div>
            </div>
            <UncontrolledCollapse
              className="children"
              toggler={`#toggle-menu-item-${item.Id}`}
            >
              {menuItemChildren}
            </UncontrolledCollapse>
          </div>
        );
      }
      return menuItem;
    };
  }

  useEffect(() => {
    folderStructureTree();
  }, [isActiveFolderId]);

  const [getFolder, setFolder] = useState([]);
  useEffect(() => {
    instructorService
      .getFolderStructure(userId)
      .then((res) => {
        setFolder(res.data);
      })
      .catch((err) => {
        swal(t("error"), t("try_sometimes"), "error");
      });
  }, []);

  /* Edit Dirctory Code Start Here*/
  const [getDirNameUpdateModal, setDirNameUpdateModal] = useState({
    show: false,
    dirName: "",
    dirParentId: "",
  });
  const FolderNameUpdateModalHide = () => {
    setDirNameUpdateModal({ show: false });
  };
  const directoryEdit = (Id, Name) => {
    setErrorMsg();
    setDirNameUpdateModal({ show: true, dirParentId: Id, dirName: Name });
  };
  const UpdateFolderName = (dirId) => {
    const fname = document.getElementById("folder_name");
    if (fname.value === "") {
      // setErrorMsg(t('enter_folder_name'));
      setErrorMsg1({
        ...errorMsg1,
        fileErr: t("enter_folder_name"),
      });
    } else if (!fname.value.match(/^[A-Za-z ]+$/)) {
      // setErrorMsg("Only Alphabets and Spaces are allowed");
      setErrorMsg1({
        ...errorMsg1,
        fileErr: t("Only Alphabets and Spaces are allowed"),
      });
    }
    if (fname.value === "" || !fname.value.match(/^[A-Za-z ]+$/)) {
      //console.log("Under IFF Both Condition are there ");
      return;
    }
    let dirname = fname.value;
    let data = { dirName: dirname, lastModifiedBy: userId, dirParentId: dirId };
    instructorService
      .folderNameUpdate(data)
      .then(async (res) => {
        if (res.status == 200) {
          setErrorMsg1({
            ...errorMsg1,
            fileErr: "",
            durationErr: "",
          });
          await swal(t("Updates"), t("folder_updated"), "success");
          instructorService.getFolderStructure(userId).then((res) => {
            setErrorMsg1({
              ...errorMsg1,
              fileErr: "",
              durationErr: "",
            });
            setFolder(res.data);
          });
          folderStructureTree();
          setDirNameUpdateModal({ show: false });
        } else {
          setErrorMsg1({
            ...errorMsg1,
            fileErr: "",
            durationErr: "",
          });
          // alert("some error");
        }
      })
      .catch((err) => {
        setErrorMsg1({
          ...errorMsg1,
          fileErr: "",
          durationErr: "",
        });
      });
  };

  /* Edit Dirctory Code End Here*/

  const [fileOption, setFileOption] = useState("none");
  const [getParentId, setParentId] = useState([]);
  const [getFolderName, setFolderName] = useState();
  const [getContentDetails, setContentDetails] = useState([]);
  const dirClick = (dirId, dirName) => {
    var togglers = document.querySelectorAll(".caret");
    togglers.forEach((toggler) => {
      toggler.onclick = function () {
        toggler.parentElement
          .querySelector(".nested")
          .classList.toggle("active");
        toggler.classList.toggle("caret-down");
      };
    });
  };

  const deleteDirectory = (id) => {
    instructorService.directoryStatusCheck(id).then(async (res) => {
      if (res.data.length === 0) {
        swal({
          title: t("swal_title"),
          text: t("delete_folder_structure"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: t('yes_delete'),
          closeOnConfirm: false,
        }).then((isConfirmed) => {
          if (isConfirmed) {
            let data = { lastModifiedBy: userId, dirParentId: id };
            instructorService.deleteDirectory(data).then(async (res) => {
              if (res.data === "deleted successfully") {
                await swal(t("swal_delete"), t("del_msg"), "success");
                instructorService.getFolderStructure(userId).then((res) => {
                  setFolder(res.data);
                });
                folderStructureTree();
                setParentId([]);
              }
            });
          }
        });
      } else {
        await swal(t("msg"), t("delete_content_then_folder"), "warning");
      }
    });
    // swal({
    //     title: "Are you sure?",
    //     text: "You Want to Delete this Folder Structure!",
    //     type: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#DD6B55",
    //     confirmButtonText: "Yes, delete it!",
    //     closeOnConfirm: false
    // }).then(isConfirmed => {
    //     if (isConfirmed) {
    //         let data = { lastModifiedBy: userId, dirParentId: id };
    //         instructorService.deleteDirectory(data)
    //             .then(async res => {
    //                 if (res.data === "deleted successfully") {
    //                     await swal("Deleted!", "Your Folder has been deleted.", "success");
    //                     instructorService.getFolderStructure(userId)
    //                         .then(res => {
    //                             setFolder(res.data);
    //                         })
    //                     folderStructureTree();
    //                 }
    //             })
    //     }
    // });
  };

  const Tree = ({ data }) => (
    <ul class="tree">
      {data &&
        data.map((item) => (
          <li style={{ fontSize: "16px" }}>
            <span class="caret" onClick={() => dirClick(item.Id, item.Name)}>
              <span onClick={() => abc1(item.Id, item.Name)}>
                {item.Name}&nbsp;&nbsp;
              </span>
            </span>
            {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                        <span className="d-inline-block">
                            <a class="link" href="#"><i class="fas fa-trash" onClick={() => deleteDirectory(item.Id)} style={{ fontSize: "16px" }}></i></a>&nbsp;&nbsp;
                        </span>
                    </OverlayTrigger> */}
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">{t("edit")}</Tooltip>}
            >
              <span className="d-inline-block">
                <a class="link" href="#">
                  <i
                    class="fas fa-edit"
                    onClick={() => directoryEdit(item.Id, item.Name)}
                    style={{ fontSize: "16px" }}
                  ></i>
                </a>
              </span>
            </OverlayTrigger>
            {item.Child && <ul class="nested">{<Tree data={item.Child} />}</ul>}
          </li>
        ))}
    </ul>
  );

  const alertMsg = () => {
    swal(`${t("select")}`, `${t("node")}`, "warning");
  };
  const [getUrl, setUrl] = useState();
  const [getContentType, setContentType] = useState();
  const contentView = (contentType, url, encodeStatus, streamId) => {
    instructorService
      .contentAccess(url)
      .then((res) => {
        //console.log("res.data PDFFFFFFFF", res.data);
        if (contentType === "pdf") {
          // This encodes the Actual URL
          const encrypted = CryptoJS.AES.encrypt(
            "/" + res.data,
            "cdac@123"
          ).toString();
          const safeEncodedString = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

          const pdfDomain = "10.244.3.218:8080"
          const finalSubDomain = pdfDomain + "/" + safeEncodedString

          // console.log("finalSubDomain", finalSubDomain)
          
          setUrl(finalSubDomain);
        } else {
                if(encodeStatus === 'success'){

                  axios.get(res.data, {
                      headers: { Authorization: token },
                       responseType: "arraybuffer",
                      }).then((response) => {
                        const data = `data:${response.headers['content-type']};base64,${new Buffer(response.data).toString('base64')}`
                        setUrl( data );
                    });

                    //setUrl(res.data);
                }
                else{
                    setUrl("http://10.244.3.218:8080/"+res.data);
                }
        }
        setContentType(contentType);
        setUrlModal({ show: true });
      })
      .catch((err) => {
        swal(`${t("error")}`, `${err} ${t("try_sometimes")}`, "error");
      });
  };
  const [getShareUrlData, setShareUrlData] = useState();
  const [ShareUrlModal, setShareUrlModal] = useState({
    show: false,
  });
  const shareUrlModalHide = () => {
    setShareUrlModal({ show: false });
  };
  const ShareUrl = (url) => {
    instructorService.contentAccess(url).then((res) => {
      setShareUrlData("http://pranit-pc.hyderabad.cdac.in:8080/" + res.data);
      setShareUrlModal({ show: true });
      let copyText = document.querySelector(".copy-text");
      copyText.querySelector("button").addEventListener("click", function () {
        let input = copyText.querySelector("input.text");
        input.select();
        document.execCommand("copy");
        copyText.classList.add("active");
        window.getSelection().removeAllRanges();
        setTimeout(function () {
          copyText.classList.remove("active");
        }, 2500);
      });
    });
  };

  const contentDelete = (contentId, folder_id) => {
    instructorService.checkContentStatus(contentId).then(async (res) => {
      if (res.data == true) {
        await swal(
          t('msg'),
          t('this_content_map_mydrive'),
          "warning"
        );
      } else {
        swal({
          title: t('swal_title'),
          text: t('u_want_to_delete_content'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: t('yes_delete'),
          closeOnConfirm: false,
        }).then((isConfirmed) => {
          if (isConfirmed) {
            instructorService.contentDelete(contentId).then(async (res) => {
              if (res.status == 200) {
                await swal(
                  t('deleted'),
                  t('your_content_deleted'),
                  "success"
                );
                instructorService
                  .contentDetails(folder_id, userId)
                  .then((res) => {
                    setContentDetails(res.data);
                  });
              }
            });
          }
        });
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.contentName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Type",
      selector: (row) => row.contentType,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.contentDuration,
      sortable: true,
    },
    {
      name: "Preview",
      sortable: true,
      cell: (row) => (
        <a
          class="link"
          href="#"
          onClick={() => contentView(row.contentType, row.previewUrl, row.encodeStatus, row.streamId)}
        >
          {row.contentType === "zip" ? (
            <i
              class="fas fa-file-archive"
              style={{ fontSize: "25px", color: "#fdbf00" }}
            ></i>
          ) : row.contentType === "pdf" ? (
            <i
              class="fas fa-file-pdf"
              style={{ fontSize: "25px", color: "#b30b00" }}
            ></i>
          ) : row.contentType === "jpg" ||
            row.contentType === "png" ||
            row.contentType === "jpeg" ? (
            <i
              class="fas fa-file-image"
              style={{ fontSize: "25px", color: "#b2b1ff" }}
            ></i>
          ) : row.contentType === "html" ? (
            <i
              class="fab fa-html5"
              style={{ fontSize: "25px", color: "#e54c21" }}
            ></i>
          ) : row.contentType === "ogg" ||
            row.contentType === "webm" ||
            row.contentType === "mp4" ? (
            <i
              class="fas fa-file-video"
              style={{ fontSize: "25px", color: "#8cee02" }}
            ></i>
          ) : // : row.contentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}></i>
          // : row.contentType === "doc" || row.contentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}></i>
          row.contentType === "scorm" ? (
            <i
              class="far fa-file-archive"
              style={{ fontSize: "25px", color: "green" }}
            ></i>
          ) : null}
        </a>
      ),
    },
    // {
    //     name: "Share Url",
    //     sortable: true,
    //     cell: (row) => <>{row.contentType === "zip" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to Copy!</Tooltip>}>
    //         <span className="d-inline-block">
    //             <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
    //         </span>
    //     </OverlayTrigger>
    //         : row.contentType === "pdf" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to Copy!</Tooltip>}>
    //             <span className="d-inline-block">
    //                 <CopyToClipboard text={getShareUrlData}>
    //                     <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
    //                 </CopyToClipboard>
    //             </span>
    //         </OverlayTrigger>
    //             : row.contentType === "jpg" || row.contentType === "png" || row.contentType === "jpeg" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to Copy!</Tooltip>}>
    //                 <span className="d-inline-block">
    //                     <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
    //                 </span>
    //             </OverlayTrigger>
    //                 : row.contentType === "html" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to Copy!</Tooltip>}>
    //                     <span className="d-inline-block">
    //                         <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
    //                     </span>
    //                 </OverlayTrigger>
    //                     : row.contentType === "ogg" || row.contentType === "webm" || row.contentType === "mp4" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to Copy!</Tooltip>}>
    //                         <span className="d-inline-block">
    //                             <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
    //                         </span>
    //                     </OverlayTrigger>
    //                         : row.contentType === "txt" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to Copy!</Tooltip>}>
    //                             <span className="d-inline-block">
    //                                 <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
    //                             </span>
    //                         </OverlayTrigger>
    //                             : row.contentType === "doc" || row.contentType === "docx" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to Copy!</Tooltip>}>
    //                                 <span className="d-inline-block">
    //                                     <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
    //                                 </span>
    //                             </OverlayTrigger>
    //                                 : row.contentType === "scorm" ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to Copy!</Tooltip>}>
    //                                     <span className="d-inline-block">
    //                                         <a class="link" onClick={() => ShareUrl(row.previewUrl)} href="#"><i class="fas fa-link"></i></a>
    //                                     </span>
    //                                 </OverlayTrigger>
    //                                     : null}
    //     </>
    // },

    {
      name: "Action",
      sortable: true,
      cell: (row) => (
        <div>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">{t("delete")}</Tooltip>}
          >
            <span className="d-inline-block">
              <a class="link" href="#">
                <i
                  class="fas fa-trash"
                  onClick={() => contentDelete(row.contentId, getParentId)}
                  style={{ fontSize: "20px", color: "#006dff" }}
                ></i>
              </a>
            </span>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">{t("edit")}</Tooltip>}
          >
            <span className="d-inline-block">
              <a class="link" href="#">
                <i
                  class="fas fa-edit"
                  onClick={() =>
                    contentEdit(
                      row.contentId,
                      row.contentName,
                      row.contentDuration
                    )
                  }
                  style={{
                    fontSize: "20px",
                    color: "#006dff",
                    marginLeft: "20px",
                  }}
                ></i>{" "}
              </a>
            </span>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  /* Table content Filter and Search */
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = getContentDetails.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterDataTable
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  /* File Content Update Code Start */
  const [getFileContentUpdateModalState, setFileContentUpdateModalState] =
    useState({
      show: false,
    });
  const FileContentUpdateModalHide = () => {
    setFileContentUpdateModalState({ show: false });
  };
  const [getFileContentDetails, setFileContentDetails] = useState({
    contentId: "",
    contentName: "",
    contentDuration: "",
  });
  const contentEdit = (contentId, contentName, contentDuration) => {
    setErrorMsg();
    setFileContentDetails({
      contentId: contentId,
      contentName: contentName,
      contentDuration: contentDuration,
    });
    setFileContentUpdateModalState({ show: true });
  };
  const UpdateFileDatails = (contentId, folder_id) => {
    setErrorMsg({
      ...errorMsg1,
      fileErr: "",
      durationErr: "",
    });
    const duration = document.getElementById("update_duration");
    const file_name = document.getElementById("update_file_name");
    if (duration.value == "") {
      setErrorMsg1({
        ...setErrorMsg1,
        durationErr: t('pls_enter_content_duration'),
      });
    }
    if (file_name.value === "") {
      setErrorMsg1({
        ...setErrorMsg1,
        fileErr: t('pls_enter_content_details'),
      });
    }
    if (!file_name.value.match(/^[A-Za-z ]+$/)) {
      setErrorMsg(t('only_alpha_with_space'));
    }
    if (errorMsg1.durationErr || errorMsg1.fileErr) {
      return;
    }

    let fileName = file_name.value.trim();
    let durationMin = duration.value.trim();
    let data = {
      contentId: contentId,
      contentName: fileName,
      contentDuration: durationMin,
    };
    instructorService
      .fileCotentDetailsUpdate(data)
      .then(async (res) => {
        if (res.status == 200) {
          setErrorMsg1({
            ...errorMsg1,
            fileErr: "",
            durationErr: "",
          });
          await swal(t("Updates"), t("details_update_msg"), "success");
          setFileContentUpdateModalState({ show: false });
          instructorService.contentDetails(folder_id, userId).then((res) => {
            setContentDetails(res.data);
            //console.log(res.data);
          });
        }
      })
      .catch((err) => {
        setErrorMsg1({
          ...errorMsg1,
          fileErr: "",
          durationErr: "",
        });
      });
  };
  /* File Content Update Code End */

  const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    width: 1100,
    height: 800,
    controls: true,
    sources: [
      {
        //src: `http://10.244.3.218:8080/${getUrl}`,
        src: `${getUrl}`,
        type: "video/mp4",
      },
    ],
  };

  /* File Upload Code */

  const [getabc, setabc] = useState({
    selectedFiles: undefined,
    currentFile: undefined,
    file: "",
  });
  const [checkBox, setCheckBox] = useState(false);
  const [show, setShow] = useState();
  const selectFile = (event) => {
    let fi = document.getElementById("file");
    var files = fi.files;
    for (var i = 0; i < files.length; i++) {
      // //console.log(files[i].type);
      if (
        files[i].type == "application/msword" ||
        files[i].type == "application/x-msdownload" ||
        files[i].type == "text/plain"
      ) {
        return swal(t("warning"), t("warning_file_msg"), "warning");
      }
      if (
        files[i].type == "application/x-zip-compressed" ||
        files[i].type == "application/zip"
      ) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
    setabc({
      selectedFiles: event.target.files,
    });
  };

  const [errorMsg1, setErrorMsg1] = useState({
    fileErr: "",
    durationErr: "",
  });

  const [htmlFileNames, setHtmlFileNames] = useState([]);
  const [ShareScormModal, setShareScormModal] = useState({
    show: false,
  });

  const shareScormModalHide = () => {
    setShareScormModal({
      show: false,
    });
  };

  const extractZip = async () => {
    let event = getabc.selectedFiles[0];
    // const zip = new JSZip();
    // const extractedFiles = await zip.loadAsync(file);
    // const fileNames = Object.keys(extractedFiles);
    // console.log(fileNames);
    // extractedFiles.forEach(async (relativePath, file) => {
    //   const content = await file.async("string");
    //   //save the file in the desired location
    // });

    //const file = event.target.files[0];

    // read the uploaded file as an ArrayBuffer
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(event);

    // use JSZip to extract the HTML file names
    fileReader.onload = async () => {
      const zip = new JSZip();
      const files = await zip.loadAsync(fileReader.result);

      const htmlFileNames = Object.keys(files.files).filter((fileName) =>
        fileName.endsWith(".html")
      );

      //console.log(htmlFileNames);
      if (htmlFileNames.length !== 0) {
        setHtmlFileNames(htmlFileNames);
        setShareScormModal({
          show: true,
        });
      }
    };
  };

  const fileUpload = (durationMin, fileName, fileSelectedOption) => {
    let currentFile = getabc.selectedFiles[0];

    let sig = md5(getabc.selectedFiles[0].size.toString());
    setabc({
      currentFile: currentFile,
    });
    setLoading(true);

    instructorService
      .fileUpload(
        currentFile,
        sig,
        userId,
        getParentId,
        durationMin,
        fileName,
        fileSelectedOption,
        checkBox,
        (event) => {}
      )
      .then(async (res) => {
        if (res.status === 200) {
          setLoading(false);
          if (res.data === "double-extension-file") {
            swal(t("error"), t("double-ext-file"), "error");
          } else if (res.data === "file-sig-error") {
            swal(t("error"), "Invalid File Error", "error");
          } else if (res.data === "Uploaded Successfully") {
            setErrorMsg1({
              ...errorMsg1,
              fileErr: "",
              durationErr: "",
            });
            await swal(t("uploaded"), res.data, "success");
          } else {
            await swal(t("msg"), res.data, "info");
          }
          setUploadModalState({ show: false });
          instructorService.contentDetails(getParentId, userId).then((res) => {
            setContentDetails(res.data);
            //console.log(res.data);
          });
        }
      })
      .catch((err) => {
        setabc({
          currentFile: undefined,
        });
      });
  };

  const handleChange = (event) => {
    setFileOption(event.target.value);
  };

  const upload = () => {
    // console.log(getabc.selectedFiles,"=============")
    const duration = document.getElementById("duration");
    const file_name = document.getElementById("file_name");

    let fileerr;
    let durationerr;

    if (file_name.value === "") {
      fileerr = t("pls_enter_file_name");
      //return setErrorMsg(t('pls_enter_file_name'))
    } else if (!file_name.value.match(/^[A-Za-z ]{2,50}$/)) {
      fileerr = t('alphabet_2_50');
      // setErrorMsg1({
      //     ...errorMsg1,
      //     fileErr: "Alphabet are Allowed. Range From 2 to 50"
      // })
      //return setErrorMsg(t('pls_enter_file_name'))
    }
    if (duration.value == "") {
      durationerr = t("pls_enter_file_duration");
      // setErrorMsg1({
      //     ...errorMsg1,
      //     durationErr: t('pls_enter_file_duration')
      // })
      //return setErrorMsg(t('pls_enter_file_duration'))
    } else if (!duration.value.match(/^[0-9]{1,3}$/)) {
      durationerr = t('only_digit_allow');
      // setErrorMsg1({
      //     ...errorMsg1,
      //     durationErr: "Only Digits Are Allowed"
      // })
      //return setErrorMsg(t('pls_enter_file_duration'))
    }

    if (fileerr || durationerr) {
      setErrorMsg1({
        ...errorMsg1,
        fileErr: fileerr,
        durationErr: durationerr,
      });
      return;
    }

    let fileName = file_name.value;
    let durationMin = duration.value;

    let fi = document.getElementById("file");
    if (fi.files.length > 0) {
      for (let i = 0; i <= fi.files.length - 1; i++) {
        const fsize = fi.files.item(i).size;
        ////console.log(fsize)
        //const file = Math.round((fsize / 102400));
        // The size of the file.
        if (
          fi.files[i].type === "image/jpeg" ||
          fi.files[i].type === "image/png" ||
          fi.files[i].type === "application/pdf" ||
          fi.files[i].type === "text/html" ||
          fi.files[i].type === "video/ogg" ||
          fi.files[i].type === "video/webm" ||
          fi.files[i].type === "video/quicktime" ||
          fi.files[i].type === "video/mp4" ||
          fi.files[i].type === "video/mpeg" ||
          fi.files[i].type === "application/zip" ||
          fi.files[i].type === "application/x-compressed-zip" ||
          fi.files[i].type === "application/x-7z-compressed" ||
          fi.files[i].type === "application/octet-stream" ||
          fi.files[i].type === "application/x-zip-compressed"
        ) {
          if (fsize >= 10485760000000000000000) {
            return swal(t("warning"), t("file_size_exceeded"), "warning");
          }
        } else {
          return swal(t("warning"), t("pls_select_valid_file"), "warning");
        }
      }
    }
    let currentFile = getabc.selectedFiles[0];

    //console.log("checkBox----" + checkBox);
    if (checkBox === true) {
      extractZip(currentFile);
      //console.log("fileOption----->", fileOption);
      if (fileOption !== "none") {
        fileUpload(durationMin, fileName, fileOption);
      }
    } else {
      fileUpload(durationMin, fileName, fileOption);
    }

    setabc({
      selectedFiles: undefined,
    });
  };

  const scrollWin = () => {
    window.scrollTo(0, 290);
  };

  // function PdfViewer(pdfUrl) {
  //     console.log("pdfUrl===>", pdfUrl);
  //     const [numPages, setNumPages] = useState(null);
  //     const [pageNumber, setPageNumber] = useState(1);

  //     function onDocumentLoadSuccess({ numPages }) {
  //       setNumPages(numPages);
  //     }

  //     useEffect(() => {
  //       setPageNumber(1);
  //     }, [pdfUrl]);

  //     return (
  //       <div>
  //         <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
  //           <Page pageNumber={pageNumber} />
  //         </Document>
  //         <p>
  //           Page {pageNumber} of {numPages}
  //         </p>
  //         <button
  //           disabled={pageNumber <= 1}
  //           onClick={() => setPageNumber(pageNumber - 1)}
  //         >
  //           Previous
  //         </button>
  //         <button
  //           disabled={pageNumber >= numPages}
  //           onClick={() => setPageNumber(pageNumber + 1)}
  //         >
  //           Next
  //         </button>
  //       </div>
  //     );
  //   }

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main-wrapper course-page">
      <HeaderTwo />

      <BreadcrumbBox title={t("course_Content_Drive")} />

      <div class="row">
        <div class="col-xs-6 col-sm-3 col-md-3">
          <div class="bd-highlight">
            <a
              href="#"
              class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <svg class="bi me-2" width="40" height="32"></svg>
              <span class="fs-4" style={{ marginTop: "10px" }}>
                <i
                  class="fas fa-hdd"
                  style={{ fontSize: "25px", marginRight: "5px" }}
                ></i>
                {t("my_drive")}
              </span>
            </a>
            <hr />
            {/* <Tree class="tree" data={getFolder} /> */}

            <div style={{ marginLeft: "10px" }} className="items">
              {items}
            </div>
            <hr />
          </div>
        </div>
        <div class="col-xs-6 col-sm-9 col-md-9">
          <nav
            class="navbar navbar-expand-lg navbar-light bg-light"
            style={{ borderBottom: "1px inset" }}
          >
            <div class="container-fluid">
              <div class="navbar-nav">
                <a class="nav-link" href="#" onClick={() => handleModal()}>
                  <i
                    className="fas fa-folder-plus"
                    style={{ fontSize: "25px", marginRight: "5px" }}
                  ></i>
                  {t("create")}
                </a>
                &nbsp;&nbsp;
                {getParentId.length == 0 ? (
                  <a class="nav-link" href="#" onClick={() => alertMsg()}>
                    <i
                      className="fa fa-upload"
                      style={{ fontSize: "25px", marginRight: "5px" }}
                    ></i>
                    {t("upload")}
                  </a>
                ) : (
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => FileUploadModalShow()}
                  >
                    <i
                      className="fa fa-upload"
                      style={{ fontSize: "25px", marginRight: "5px" }}
                    ></i>
                    {t("upload")}
                  </a>
                )}
              </div>
            </div>
          </nav>
          <nav
            class="navbar navbar-expand-lg navbar-light bg-light"
            style={{ borderBottom: "1px inset" }}
          >
            <div class="container-fluid">
              <div class="navbar-nav">
                <a class="nav-link">
                  {t("my_files")} &nbsp;&nbsp;
                  <i className="fa fa-angle-right"></i>
                </a>
                {getFolderName == null ? null : (
                  <a class="nav-link" href="#">
                    <i className="fa fa-folder-open"></i> &nbsp;&nbsp;
                    {getFolderName}
                  </a>
                )}
              </div>
            </div>
          </nav>
          <div class="shadow-lg p-3 bg-body rounded">
            {getContentDetails.length == 0 ? (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  fontSize: "20px",
                }}
              >
                {t("no_records_to_display")}
              </p>
            ) : (
              <Card>
                <DataTable
                  columns={columns}
                  data={filteredItems}
                  defaultSortField="Name"
                  defaultSortAsc={true}
                  striped
                  pagination
                  highlightOnHover
                  customStyles={customStyles}
                  subHeader
                  subHeaderComponent={subHeaderComponent}
                />
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Folder Creation model code start here*/}
      <Modal
        centered
        show={getModalState.show}
        onHide={() => handleModal2()}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ alignContent: "center" }}
          >
            {t("new_folder_details")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <span style={{ fontSize: "20px" }}>New Folder Details</span><br /> */}
          {t("required_fields")} *
          <div class="mb-3 mt-3">
            <label for="name">{t("name")} : *</label>
            <input
              type="text"
              minLength={2}
              maxLength={50}
              class="form-control"
              id="folderName"
              placeholder={t("enter_folder_name")}
              name="folder"
            />
            <span style={{ color: "red" }}>{errorMsg}</span>
            {/* {getParentId} */}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            variant="primary"
            style={{
              background: "linear-gradient(90deg, #11B67A 0%, #009444 100%)",
            }}
            onMouseOut={changeBackgroundOut}
            onMouseOver={changeBackgroundOver}
            id="register"
            onClick={() => save(getParentId)}
          >
            {t("submit")}
          </Button>
          <Button variant="secondary" onClick={() => handleModal2()}>
            {t("cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Folder Creation model code end here*/}

      {/* File upload model code start here*/}
      <Modal
        centered
        show={getUploadModalState.show}
        onHide={() => FileUploadModalHide()}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("upload_documents_files")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ marginLeft: 10, color: "red" }}>
              <span>{t("upload_files")}</span>
            </div>
            <div style={{ marginLeft: 10, color: "red" }}>
              <span>{t("req_file")}</span>
            </div>
            <div class="mb-3 mt-3">
              <label for="name">{t("file_name")} : </label>
              <input
                type="text"
                minLength={3}
                maxLength={50}
                class="form-control"
                id="file_name"
                placeholder={t("pls_enter_file_name")}
                name="file_name"
              />
              <span style={{ color: "red" }}>{errorMsg1.fileErr}</span>
            </div>
            <div class="mb-3 mt-3">
              <label for="name">{t("duration_minutes")} : </label>
              <input
                type="number"
                class="form-control"
                min="0"
                max="60"
                id="duration"
                placeholder={t("duration_minutes")}
                name="duration"
              />
              <span style={{ color: "red" }}>{errorMsg1.durationErr}</span>
            </div>
            <div class="mb-3 mt-3">
              <input
                type="file"
                class="form-control"
                onChange={selectFile}
                accept="*"
                id="file"
              />
            </div>
            {show == true ? (
              <div class="mb-3 mt-3">
                <label for="name">{t("scorm_zip")} &nbsp; </label>
                <input
                  type="checkbox"
                  id="ScormCheckbox"
                  onClick={() => {
                    setCheckBox(!checkBox);
                    extractZip();
                  }}
                  data-toggle="toggle"
                  data-onstyle="primary"
                ></input>
              </div>
            ) : null}
            {/* {getLoading ? (
              <button class="btn btn-success" disabled>
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="sr-only">{t("submit")}.</span>
                </div>{" "}
                {t("upload")}
              </button>
            ) : (
              <>
                {!getabc.selectedFiles ? (
                  <>
                    <button
                      className="btn btn-success"
                      disabled
                      onClick={() => upload()}
                    >
                      {t("upload")}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => upload()}
                    >
                      {t("upload")}
                    </button>
                  </>
                )}
              </>
            )} */}

            {ShareScormModal.show === true && checkBox === true ? (
              <div>
                <p>{t('select_one_to_show_scorm_file')}: </p>
                <label>{t('file_name')}:</label>
                {htmlFileNames.map((data) => {
                  return (
                    <div>
                      <input
                        type="radio"
                        value={data}
                        checked={fileOption === data}
                        onChange={handleChange}
                      />{" "}
                      {data}
                    </div>
                  );
                })}
                <br></br>
              </div>
            ) : null}
            {getLoading ? (
              <button class="btn btn-success" disabled>
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="sr-only">{t("submit")}.</span>
                </div>{" "}
                {t("upload")}
              </button>
            ) : (
              <button
                className="btn btn-success"
                disabled={!getabc.selectedFiles}
                onClick={() => upload()}
              >
                {t("upload")}
              </button>
            )}
            {/* <button className="btn btn-success" disabled={!getabc.selectedFiles} onClick={() => upload()}>
                            {t('upload')}
                        </button> */}
          </div>
          {/* <FileUpload userId={props.userId} courseId={props.courseId} tenantId={props.tenantId} assignId={getAssignId} /> */}
          {/* <FileUpload user_id={userId} dir_name={getParentId} /> */}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => setUploadModalState(false)} className="btn btn-danger">Close</Button> */}
          <Button
            onClick={() => FileUploadModalHide()}
            className="btn btn-danger"
          >
            {t('close')}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* File upload model code end here*/}

      {/* ContentView model code start here*/}
      <Modal
        size="xl"
        centered
        show={getUrlModal.show}
        onHide={() => UrlModalHide()}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {getContentType === "zip" ? (
              <i
                class="fas fa-file-archive"
                style={{ fontSize: "25px", color: "#fdbf00" }}
              >
                {" "}
                Zip
              </i>
            ) : getContentType === "pdf" ? (
              <i
                class="fas fa-file-pdf"
                style={{ fontSize: "25px", color: "#b30b00" }}
              >
                {" "}
                PDF
              </i>
            ) : getContentType === "jpg" ||
              getContentType === "png" ||
              getContentType === "jpeg" ? (
              <i
                class="fas fa-file-image"
                style={{ fontSize: "25px", color: "#b2b1ff" }}
              >
                {" "}
                Image
              </i>
            ) : getContentType === "html" ? (
              <i
                class="fab fa-html5"
                style={{ fontSize: "25px", color: "#e54c21" }}
              >
                {" "}
                Html
              </i>
            ) : getContentType === "ogg" ||
              getContentType === "webm" ||
              getContentType === "mp4" ? (
              <i
                class="fas fa-file-video"
                style={{ fontSize: "25px", color: "#8cee02" }}
              >
                {" "}
                Video
              </i>
            ) : // : getContentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}> Text</i>
            // : getContentType === "doc" || getContentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}> Doc</i>
            getContentType === "scorm" ? (
              <i
                class="far fa-file-archive"
                style={{ fontSize: "25px", color: "green" }}
              >
                {" "}
                Scorm
              </i>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {getContentType === "jpg" ||
            getContentType === "png" ||
            getContentType === "jpeg" ? (
              <img
                //src={`http://10.244.3.218:8080/${getUrl}`}
                src={`${getUrl}`}
                width="100%"
                height="100%"
              ></img>
            ) : // : getContentType === "pdf" ? <iframe width="100%" height="800" src={`http://10.244.3.218:8080/${getUrl}`+ "#toolbar=0"} type="application/pdf" embedded="true" onContextMenu={handleContextMenu}></iframe>
            getContentType === "pdf" ? (
              <div>
                {" "}
                <ViewPdf
                  pdfUrl={`http://meghs1.hyderabad.cdac.in/pdfViewer/${getUrl}`}
                />
              </div>
            ) : getContentType === "mp4" ? (
              <div>
                {" "}
                <Videojs {...videoJsOptions} />
              </div>
            ) : // : getContentType === "docx" ? <iframe width="100%" height="100%" src={`http://10.244.3.218:8080/${getUrl}`} ></iframe>
            getContentType === "html" ? (
              <iframe
                width="100%"
                height="800"
                //src={`http://10.244.3.218:8080/${getUrl}`}
                src={`${getUrl}`}
              ></iframe>
            ) : getContentType === "zip" ? (
              <iframe
                width="100%"
                height="800"
                //src={`http://10.244.3.218:8080/${getUrl}`}
                src={`${getUrl}`}
              ></iframe>
            ) : getContentType === "scorm" ? (
              <iframe
                width="100%"
                height="800"
                 //src={`http://10.244.3.218:8080/${getUrl}`}
                 src={`${getUrl}`}
              ></iframe>
            ) : (
              <p>{t("no_content_available")}</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
      {/* ContentView model code end here*/}

      {/* Content details update model code start here*/}
      <Modal
        centered
        show={getFileContentUpdateModalState.show}
        onHide={() => FileContentUpdateModalHide()}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("update_file_details")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3 mt-3">
            <label for="name">{t("file_name")} : </label>
            <input
              type="text"
              minLength={3}
              maxLength={50}
              class="form-control"
              defaultValue={getFileContentDetails.contentName}
              id="update_file_name"
              placeholder={t("pls_enter_file_name")}
              name="file_name"
            />
            <span style={{ color: "red" }}>{errorMsg1.fileErr}</span>
          </div>
          <div class="mb-3 mt-3">
            <label for="name">{t("duration")} : </label>
            <input
              type="number"
              class="form-control"
              defaultValue={getFileContentDetails.contentDuration}
              min="0"
              max="120"
              id="update_duration"
              placeholder={t("enter_duration")}
              name="duration"
            />
            <span style={{ color: "red" }}>{errorMsg1.durationErr}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() =>
              UpdateFileDatails(getFileContentDetails.contentId, getParentId)
            }
            className="btn btn-primary"
          >
            {t("Updates")}
          </Button>
          <Button
            onClick={() => FileContentUpdateModalHide(false)}
            className="btn btn-danger"
          >
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Content details update model code end here*/}

      {/* Dirctory Name details update model code start here*/}
      <Modal
        centered
        show={getDirNameUpdateModal.show}
        onHide={() => FolderNameUpdateModalHide()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("update_folder_name")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3 mt-3">
            <label for="name">{t("folder_name")} : </label>
            <input
              type="text"
              minLength={3}
              maxLength={50}
              class="form-control"
              defaultValue={getDirNameUpdateModal.dirName}
              id="folder_name"
              placeholder={t("enter_folder_name")}
              name="folder_name"
            />
            <span style={{ color: "red" }}>{errorMsg1.fileErr}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => UpdateFolderName(getDirNameUpdateModal.dirParentId)}
            className="btn btn-primary"
          >
            {t("update")}
          </Button>
          <Button
            onClick={() => FolderNameUpdateModalHide(false)}
            className="btn btn-danger"
          >
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Dirctory Name details update model code end here*/}

      {/* ShareUrl model code start here*/}
      <Modal
        centered
        show={ShareUrlModal.show}
        onHide={() => shareUrlModalHide()}
      >
        <Modal.Body style={{ padding: "0px" }}>
          <div class="container" style={{ width: "75%" }}>
            <div class="copy-text">
              <input
                type="text"
                class="text"
                value={getShareUrlData}
                readonly
              />
              <button>
                <i class="fa fa-clone"></i>
              </button>
              <div style={{ marginLeft: "25px", marginTop: "-8px" }}>
                <a href="#">
                  <i
                    class="fas fa-times"
                    onClick={() => shareUrlModalHide()}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Share Url model code end here*/}

      <FooterTwo />
    </div>
  );
}

export default CourseStructureDrive;
