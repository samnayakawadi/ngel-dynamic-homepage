import React, { useState, useEffect, useMemo } from "react";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import HeaderTwo from "../../components/HeaderTwo";
import { Styles } from "./styles/AddCourseCategory.js"
import { Container, Row, Col, Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import FooterTwo from "../../components/FooterTwo";
import instructorService from '../../services/instructorService';
import swal from 'sweetalert';
import DataTable from "react-data-table-component";
import FilterDataTable from "./FilterDataTable";
import { colors } from "../../components/common/element/elements.js";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import UserService from "../../services/UserService";

const customStyles = {
    title: {
        style: {
            fontColor: 'red',
            fontWeight: '900',
        }
    },
    rows: {
        style: {
            minHeight: '72px'
        },
    },
    headCells: {
        style: {
            widthRight: '8px',
            widthLeft: '8px',
            fontSize: '17px',
            // fontWeight: '500',
            // textTransform: 'uppercase',
            // paddingLeft: '0 8px',
            // marginLeft: '10px',
        },
    },
    cells: {
        style: {
            fontSize: '15px',
            widthRight: '8px',
            widthLeft: '8px',
            // paddingLeft: '0 8px',
            // marginLeft: '10px'
        },
    },
};

const languages = [

    {
        code: 'en',
        name: 'English',
        country_code: 'gb',
    },

    {
        code: 'hi',
        name: 'Hindi',
        country_code: 'in'
    },
    // {
    //     code: 'te',
    //     name: 'Telugu',
    //     country_code: 'in'
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
]

function AddCourseCategory() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    /* Add Course Category code start */

    const onBlurCatNameHandler = () => {
        const cat_name = document.getElementById("category_name");
        const catnameValue = cat_name.value.trim();

        if (catnameValue === "") {
            setError(cat_name, `${t('blank_err')}`);
        } else if (catnameValue.match(/^[A-Za-z0-9&., ]+$/)) {
            setSuccess(cat_name);
        } else if (catnameValue.length > 50) {
            setError(cat_name, t('text_max_50_error'));
        }
        else if (catnameValue.length < 5) {
            setError(cat_name, t('min_5_char_error'));
        } else {
            setError(cat_name, t('alpha_digit_special_char_allow'));
        }
    }

    const onBlurCatDescHandler = () => {
        const cat_desc = document.getElementById("category_desc");
        const catDescValue = cat_desc.value.trim();

        if (catDescValue === "") {
            setError(cat_desc, `${t("desc_blank_err")}`);
        } else if (catDescValue.match(/^[A-Za-z0-9&., ]+$/)) {
            setSuccess(cat_desc);
        } else if (catDescValue.length > 150) {
            setError(cat_desc, t);
        }
        else if (catDescValue.length < 5) {
            setError(cat_desc, t('min_5_char_error'));
        } else {
            setError(cat_desc, t('alpha_digit_special_char_allow'));
        }
    }

    const [loading, setLoading] = useState({
        isLoading: false
    })

    let duplicateErr = false;

    const formSubmit = async (e) => {
        e.preventDefault();
        let status = {
            topicStatus: true,
            desStatus: true
        };
        const catname = document.getElementById("category_name");
        const cat_desc = document.getElementById("category_desc");
        const catValue = catname.value.trim();
        const catDescValue = cat_desc.value.trim();

        if (catDescValue === "") {
            setError(cat_desc, `${t("desc_blank_err")}`);
        } else if (catDescValue.match(/^[A-Za-z0-9&., ]+$/)) {
            setSuccess(cat_desc);
        } else if (catDescValue.length > 150) {
            setError(cat_desc, t('text_min_150_char'));
        }
        else if (catDescValue.length < 5) {
            setError(cat_desc, t('min_5_char_error'));
        } else {
            setError(cat_desc, t('alpha_digit_space_allowed'));
        }


        if (catValue === "") {
            setError(catname, (`${t('blank_err')}`));
            status.topicStatus = false;
        } else if (!catValue.match(/^[A-Za-z0-9&., ]+$/)) {
            setError(catname, (`${t('special_err')}`));
            status.topicStatus = false;
        }
        else {
            //console.log(getEditCategoryState.categoryName);
            if (getUpdate === false) {
                await instructorService.getAllCourseCategory()
                    .then(res => {
                        res.data.map((data) => {
                            if (data.categoryName === catValue) {
                                ////console.log(data.categoryName);
                                setError(catname, ('Duplicate entry'));
                                status.topicStatus = false
                                duplicateErr = true;
                            }
                            else {
                                ////console.log(data.categoryName);
                                setSuccess(catname)
                            }

                        }, [])
                    })
                    .catch(err => {
                        //console.log(err);
                    })
            } else {
                ////console.log(data.categoryName);
                setSuccess(catname)
            }

        }



        ////console.log(status.topicStatus, status.desStatus);
        ////console.log(status)
        if (status.topicStatus === true && status.desStatus === true) {
            if (getEditCategoryState.length == 0) {
                setLoading({ isLoading: true });
                instructorService.addCourseCategory({ categoryName: catValue, category_description: catDescValue })
                    .then(async res => {
                        if (res.data == "Category saved successfully") {
                            await swal(`${t('success')}`, `${t('C_Add_success')}`, "success");
                            document.getElementById("formData").reset();
                            setLoading({ isLoading: false });
                            instructorService.getAllCourseCategory()
                                .then(res => {
                                    setCourseCat(res.data);
                                })
                        }
                        else {
                            swal(`${t('error')}`, `${t('try_sometimes')}`, "error");
                        }
                    }).catch(err => {
                        alert(`${"services_is_down_please_update_after_sometime"}`);
                    });
            } else {
                instructorService.editCategory({ categoryName: catValue, category_description: catDescValue, categoryId: getEditCategoryState.categoryId })
                    .then(async res => {
                        if (res.data == "Category updated successfully!!!") {
                            await swal(`${t('success')}`, `${t('cat_update_success')}`, "success");
                            document.getElementById("formData").reset();
                            setEditCategoryState([]);
                            instructorService.getAllCourseCategory()
                                .then(res => {
                                    setCourseCat(res.data);
                                })
                        }
                    }).catch(err => {
                        //console.log(err);
                    })
            }

        }
        else {
            if (duplicateErr === true) {
                await swal(t('dup'), t('category_exit'), "error");
                setError(catname, t('dup'));
                status.topicStatus = false
            }
            else {
                await swal(t('something_went_wrong'), t('pls_enter_correct_text'), "error");
            }

        }

    }

    function setError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector(".registration_input-msg");
        formControl.className = "form-control text-left error";
        errorMsg.innerText = message;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = "form-control success";
    }

    function iscategoryName(catName) {
        return /^[_A-z]*((-|\s)*[_A-z])*$/.test(catName);
    }

    function iscategoryDesc(catDesc) {
        return /^[_A-z.]*((-|\s)*[_A-z])*$/.test(catDesc);
    }

    /* Add Course Category code End */

    /* Get all the Course Category and Datatable code here */
    const [getCourseCat, setCourseCat] = useState([]);
    useEffect(() => {
        instructorService.getAllCourseCategory()
            .then(res => {
                setCourseCat(res.data);
            }).catch(err => {
                //console.log(err);
            })
    }, [])

    const categoryDelete = (categoryId) => {
        swal({
            title: `${t('swal_title')}`,
            text: `${t('delete_this_category')}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: t('yes_delete'),
            closeOnConfirm: false
        }).then(isConfirmed => {
            if (isConfirmed) {
                instructorService.deleteCategory(categoryId)
                    .then(async res => {
                        if (res.data == "Category deleted successfully!!") {
                            await swal(`${t('delete')}`, `${t('delete_success_mgs')}`, "success");
                            instructorService.getAllCourseCategory()
                                .then(res => {
                                    setCourseCat(res.data);
                                }).catch(err => {
                                    //console.log(err);
                                })
                        } else {
                            await swal(`${t('delete')}`, res.data, "warning");
                        }
                    })
            }
        });
    }

    const [getEditCategoryState, setEditCategoryState] = useState([])
    const [getUpdate, setUpdate] = useState(false)

    const categoryEdit = (categoryId, categoryName, categoryDesc) => {
        document.getElementById("formData").reset();
        setEditCategoryState({
            categoryId: categoryId,
            categoryName: categoryName,
            categoryDesc: categoryDesc
        })
        setUpdate(true);
    }

    const columns = [
        {
            name: "Category ID",
            selector: "categoryId",
            sortable: true,
            width: '150px'
        },
        {
            name: "Category Name",
            selector: "categoryName",
            sortable: true,
            wrap: true,
            width: '200px'
        },
        {
            name: "Category Description",
            selector: "category_description",
            sortable: true,
            wrap: true,
            width: '250px'
        },
        {
            name: "Action",
            sortable: true,
            width: '150px',
            cell: (row) => <div>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">`${t('delete')}`</Tooltip>}>
                    <span className="d-inline-block">
                        <a class="link" href="#"><i class="fas fa-trash" onClick={() => categoryDelete(row.categoryId)} style={{ fontSize: "18px", color: "#006dff" }}></i></a>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{t('edit')}</Tooltip>}>
                    <span className="d-inline-block">
                        <a class="link" href="#"><i class="fas fa-edit" onClick={() => categoryEdit(row.categoryId, row.categoryName, row.category_description)} style={{ fontSize: "18px", color: "#006dff", marginLeft: '20px' }}></i> </a>
                    </span>
                </OverlayTrigger>
            </div>
        }

    ]


    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const filteredItems = getCourseCat.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
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
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    /* Get all the Course Category and Datatable code end here */

    const reset = () => {
        setEditCategoryState([])
    }

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">
                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title={t('create_course_cat')} />

                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col sm="5">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>{t('course_Category')}</h3>
                                    </div>
                                    <form id="formData" onSubmit={formSubmit} className="form">
                                        <p className="form-control">
                                            <label htmlFor="registration_fname">{t('cat_name')} : </label>
                                            <input type="text" minLength={5} maxLength={50} name="category_name" defaultValue={getEditCategoryState.categoryName} placeholder={`${t('enter')} ${t('cat_name')}`} id="category_name" onBlur={onBlurCatNameHandler} />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="registration_fname">{t('cat_desc')} : </label>
                                            <input type="text" minLength={5} maxLength={150} name="category_desc" defaultValue={getEditCategoryState.categoryDesc} placeholder={`${t('enter')} ${t('cat_desc')}`} id="category_desc" onBlur={onBlurCatDescHandler} />
                                            <span className="registration_input-msg"></span>
                                        </p>

                                        <button className="btn btn-primary" style={{ background: `${colors.gr_bg}` }} disabled={loading.isLoading ? "true" : ""}>{loading.isLoading ? (<> {t("loading")}</>) : <>{t('submit')}</>}</button>
                                        <button type="reset" onClick={() => reset()} className="btn btn-primary" style={{ background: "#8f8f8f" }}>{t('reset')}</button>
                                    </form>
                                </div>
                            </Col>
                            <Col sm="7">
                                <div className="registration-box" style={{ maxWidth: '800px' }}>
                                    <form className="form">
                                        <p className="form-control">
                                            <label htmlFor="registration_fname">{t('cat_name')}: </label>
                                        </p>
                                    </form>
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
                                            fixedHeader
                                            fixedHeaderScrollHeight="300px"
                                        />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Footer 2 */}
                <FooterTwo />
            </div>
        </Styles>
    )
}
export default AddCourseCategory;