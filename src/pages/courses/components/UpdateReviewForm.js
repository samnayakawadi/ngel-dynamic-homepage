import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Styles1 } from '../styles/updatereviewform'
import service from '../../../services/service'
import UserService from '../../../services/UserService.js';
import CourseDetails from '../CourseDetails.js';
//import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

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



const UpdateReviewForm = ({ reviewdata, starrating, courseid, ureviewid, learnerId, tenantId }, props) => {

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

  useEffect(() => {
    UserService.generateToken();
  }, []);
  // alert("tenantId:::"+tenantId);

  let userId = UserService.getUserid();
  const state = {
    rating: '',
    reviewText: '',
    learnerId: userId,
    itemId: courseid,
    reviewStatus: 'Done',
    reviewType: 1,
    ratingError: '',
    reviewTextError: '',
  }
  const [rating, setRating] = useState(null);
  const [reviewText, getReviewText] = useState(null);
  const [hover, setHover] = useState(null);
  const [getupdaterate, setupdaterate] = useState(state);
  const [getratedata, setRatedata] = useState([]);

  useEffect(() => {

    service.getoverallRating(courseid)
      .then(res => {
        setRatedata(res.data);
        updateRatingInfo();
      })
      .catch(err => {
        //console.log(err);
      })

  }, []);

  function updateRatingInfo() {


    setRating(starrating);
    setupdaterate(reviewdata);
    //   
  }



  const validate = () => {
    let ratingError = '';
    let reviewTextError = '';


    if (!rating) {
      ratingError = t('rating_blank_err');
    }
    if (getupdaterate.reviewText != '' || getupdaterate.reviewText.length <= 1) {
      reviewTextError = t('rating_blank_err');
    }

    if (ratingError != '') {
      setupdaterate({ ...reviewdata, ratingError });
      return false;
    }

    return true;
  }
  const refreshPage = () => {
    //alert("check");
    window.location.reload();
  }

  const updatereview = () => {
    if (getupdaterate == reviewdata) {
      if (validate()) {
        let review = {
          rating: rating, reviewId: ureviewid, reviewText: reviewdata, learnerId: learnerId,
          itemId: courseid, reviewStatus: 'Done', reviewType: 1, tenantId: tenantId
        };
        service.updaterating(review).then(async response => {
          //alert("check inisde the service call")
          await swal(t('review_update_success'), t('review_update_success_desc'), "success");
          refreshPage();
        }).catch(err => {
          //console.log(err);
        });
      }
    }
    else {
      if (validate()) {
        let review = {
          rating: rating, reviewId: ureviewid, reviewText: getupdaterate.reviewText, learnerId: learnerId,
          itemId: courseid, reviewStatus: 'Done', reviewType: 1, tenantId: tenantId
        };
        service.updaterating(review).then(async response => {
          //alert("check inisde the service call")
          await swal(t('review_update_success'), t('review_update_success_desc'), "success");
          refreshPage();
        }).catch(err => {
          //console.log(err);
        });
      }
    }
  }

  return (
    <div className="Updatereview-form">
      <Styles1>
        <form id="form6" className="form review-comment-form">
          <div className="star-rating">
            {[...Array(5)].map((star, i) => {
              // const bfrupdatestarrate= null;
              const ratingValue = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={props.ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      // bfrupdatestarrate <= (starrating||hover) ? "#ffc107":"#e4e5e9"
                    }

                    size={40}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />


                </label>


              );

            })

            }

          </div>
          <div>
            <p style={{ fontSize: 12, color: "red" }}>
              {getupdaterate.ratingError}
            </p>
          </div>

          <br></br>
          <br></br>

          <div>

            <textarea placeholder="Provide the feedback here" id="desc6" defaultValue={reviewdata} onChange={e => setupdaterate({ ...getupdaterate, reviewText: e.target.value })} cols="30" rows="5" name="reviewText"
            ></textarea>

          </div>

          <div>

            <br></br>
            <br></br>


            <div className="updt-btn">
              <button type="button" onClick={() => {
                updatereview(ureviewid);
              }}>
                {t('update_review')}
              </button>
            </div>

          </div>
          <br></br>
          <br></br>

        </form>
      </Styles1>
    </div>
  );
}

export default UpdateReviewForm