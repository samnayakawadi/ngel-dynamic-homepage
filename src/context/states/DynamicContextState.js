import { useState } from "react"

// const DynamicContextState = () => {

const defaultDynamicContextState = {
  "eng": {
    "cdac_address": {
      "type": "text",
      "value": "Maharaja Ranjit Singh Punjab Police Academy",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "have_questions": {
      "type": "text",
      "value": "Have Questions",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "log_in": {
      "type": "text",
      "value": "Log In",
    },
    "register": {
      "type": "text",
      "value": "Register",
    },
    "megh_Logo": {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "Only Images are allowed (JPG/PNG/JPEG) with maximum file size is 1MB",
      "maxLength": 1 * 1024 * 1024
    },
    "call_us_now": {
      "type": "text",
      "value": "Call Us Now",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "call_us_phone": {
      "type": "link",
      "title": {
        "value": "+910182622206",
        "regex": "^\\+\\d+$",
        "errorMessage": "Only Numbers are allowed with symbol (+)",
        "minLength": "13",
        "maxLength": "13",
      },
      "link": {
        "value": "tel:+910182622206",
        "regex": "^tel:\\+\\d+$",
        "errorMessage": `Only acceptable format "tel:+Number" and Number exactly 10 digits."`,
        "minLength": "17",
        "maxLength": "17",
      }
    },
    "enquiry_us": {
      "type": "text",
      "value": "Enquiry Us",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "enquiry_us_id": {
      "type": "link",
      "title": {
        "value": "itcell.ppa@punjabpolice.gov.in",
        "regex": "^[\\w.]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,}$",
        "errorMessage": "Email-Id is Not valid and only spechial charecters('@','.') are allow ",
      },
      "link": {
        "value": "mailto:itcell.ppa@punjabpolice.gov.in",
        "regex": "^mailto:[\\w.]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,}$",
        "errorMessage": `Only acceptable format "mailto:Email-Id"`,
      },
    },
    "home": {
      "type": "text",
      "value": "Home"
    },
    "about_us": {
      "type": "text",
      "value": "About us"
    },
    "courses": {
      "type": "text",
      "value": "Courses"
    },
    "carousel_img1":
    {
      "ID": "1",
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "Only Images are allowed (JPG/PNG/JPEG) with maximum file size is 1MB",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img2":
    {
      "ID": "2",
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "Only Images are allowed (JPG/PNG/JPEG) with maximum file size is 1MB",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img3":
    {
      "ID": "3",
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "Only Images are allowed (JPG/PNG/JPEG) with maximum file size is 1MB",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img4":
    {
      "ID": "4",
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "Only Images are allowed (JPG/PNG/JPEG) with maximum file size is 1MB",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img5":
    {
      "ID": "5",
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "Only Images are allowed (JPG/PNG/JPEG) with maximum file size is 1MB",
      "maxLength": 1 * 1024 * 1024
    },
    "popular_courses": {
      "type": "text",
      "value": "Top Rated Courses",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "popular_courses_desc": {
      "type": "text",
      "value": "PPA offers online courses for Policetraining",
      "regex": "^[A-Za-z0-9\\s&()\\-;,'\"./?]*$",
      "errorMessage": `Only (character, numbers symbols(&()-;,'"./?)) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "modern_library": {
      "type": "text",
      "value": "E-Library",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "modern_library_desc": {
      "type": "text",
      "value": "The E-Library of the World's Best Books",
      "regex": "^[A-Za-z0-9\\s&()\\-;,'\"./?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "qualified_teacher": {
      "type": "text",
      "value": "Best Training",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "qualified_teacher_desc": {
      "type": "text",
      "value": "Interactive Training by Experienced Faculty",
      "regex": "^[A-Za-z0-9\\s&()\\-;,'\"./?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "hOPPA_image": {
      "type": "file",
      "link": "480e49d5-f318-4663-afe2-00f642a6ddbc.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "Only Images are allowed (JPG/PNG/JPEG) with maximum file size is 1MB",
      "maxLength": 1 * 1024 * 1024
    },
    "title": {
      "type": "text",
      "value": "HISTORY OF PUNJAB POLICE ACADEMY, PHILLAUR",
      "regex": "^[A-Za-z0-9\\s&\\-;',./?]+$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "about_desc1": {
      "type": "text",
      "value": "Prior to the enactment of the Police Act of 1861, the Punjab Police was known as 'Military Police Force' and it consisted of 8100 men. Out of these, 5400 were infantry divided into six Battalions and the remaining 2700 were the cavalry. The Punjab, the sword-arm of India, however, needed a superior force for its internal administration. The Police Act of 1861 came into force in Punjab with effect from the 1st January, 1890.",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "10",
      "maxLength": "600"
    },
    "about_desc2": {
      "type": "text",
      "value": "The Police Training School was established in the Phillaur Fort by a Home Department  notification dated  the 9th  September, 1891, with a meagre staff under Mr. J.M. Bishop, I.P., Assistant District  Superintendent of  Police. The School started functioning with effect from the 1st January, 1892. Thus Punjab became  the first state in the country to establish  such a  school.  Most  of the other  training schools  were set up after the report of the Police Commission, appointed in 1902 by Lord Cuzon.",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "10",
      "maxLength": "600"
    },
    "happy_students": {
      "type": "text",
      "value": "Happy Students",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "teachers": {
      "type": "text",
      "value": "Teachers",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "coursess": {
      "type": "text",
      "value": "Courses",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "read_more": {
      "type": "text",
      "value": "Read More",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "info_title": {
      "type": "text",
      "value": "Let us See What Our Trainees Think About Us Their Testimonials.",
      "regex": "^[A-Za-z0-9\\s&()\\-;,'\"./?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "view_all_courses": {
      "type": "text",
      "value": "View All Courses",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "upcoming": {
      "type": "text",
      "value": "Upcoming",
    },
    "events": {
      "type": "text",
      "value": "Events",
    },
    "frequently_ask": {
      "type": "text",
      "value": "Frequently Ask",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "question": {
      "type": "text",
      "value": "Question",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "faq_titile_1": {
      "type": "text",
      "value": "What is the USP or benefits of enrolling to the courses?",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "500"
    },
    "faq_desc_1": {
      "type": "text",
      "value": "C-DAC's industry skilling courses are designed, developed and mentored by R&D experts who have vast experience in implementing real time projects. These courses give an insight into end-to-end project life cycle as per industry standards and processes.",
      "regex": "^[A-Za-z0-9\\s&()\\-;':\",./?]*$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "500"
    },
    "faq_titile_2": {
      "type": "text",
      "value": "Who are eligible for enrolling to the courses?",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "500"
    },
    "faq_desc_2": {
      "type": "text",
      "value": "Anyone interested can enroll to the courses. Candidates from Electronics, Electrical, Instrumentation, Computer Science, Information Technology or from any equivalent discipline can enroll.",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "500"
    },
    "faq_titile_3": {
      "type": "text",
      "value": "Who are eligible for enrolling to the courses?",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "500"
    },
    "faq_desc_3": {
      "type": "text",
      "value": "Anyone interested can enroll to the courses. Candidates from Electronics, Electrical, Instrumentation, Computer Science, Information Technology or from any equivalent discipline can enroll.",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "500"
    },
    "card_title": {
      "type": "text",
      "value": "Dipak Nagare",
    },
    "card_desc": {
      "type": "text",
      "value": "This card create for practice"
    },
    "card_btn": {
      "type": "text",
      "value": "Go somewhere"
    },
    "cA": {
      "type": "text",
      "value": "Company Address"
    },
    "cdac_full_address": {
      "type": "text",
      "value": "Maharaja Ranjit Singh Punjab Police Academy, Phillaur Distt - Jalandhar, Punjab, India 144410",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "5",
      "maxLength": "250"
    },
    "copyright": {
      "type": "text",
      "value": "© 2023 Copyright"
    },
    "design_develop": {
      "type": "text",
      "value": "Centre for Development of Advanced Computing C-DAC",
      "regex": "^[A-Za-z0-9\\s&()-;\\\"',./?]+$",
      "errorMessage": `Only (character, numbers, symbols (&()-;'",./?)) are allowed`,
      "minLength": "1",
      "maxLength": "250"
    },
    "usefull_links": {
      "type": "text",
      "value": "Useful Links"
    },

    "footerPoweredBy": {
      "type": "Link",
      "title": {
        "value": "Punjab Police Academy",
        "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
        "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
        "minLength": "1",
        "maxLength": "250",
      },
      "link": {
        "value": "https://google.com",
        // "regex": "\\bhttps?:\\/\\/\\S+\\b",
        // "errorMessage": "Enter a vaid URL",
        "minLength": "1",
        "maxLength": "250",
      }
    },
    "footerMeghS": {
      "type": "Link",
      "title": {
        "value": "Punjab Police",
        "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
        "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
        "minLength": "1",
        "maxLength": "250",
      },
      "link": {
        "value": "https://punjabpolice.gov.in",
        // "regex": "\\bhttps?:\\/\\/\\S+\\b",
        // "errorMessage": "Enter a vaid URL",
        "minLength": "1",
        "maxLength": "250",
      }
    },
    "footerHelp": {
      "type": "Link",
      "title": {
        "value": "RTI",
        "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
        "errorMessage": `Only characters and Symbols ( &-;'",./?) are allowed`,
        "minLength": "1",
        "maxLength": "250",
      },

      "link": {
        "value": "https://www.punjabpoliceacademy.com/joining-instructions",
        // "regex": "\\bhttps?:\\/\\/\\S+\\b",
        // "errorMessage": "Enter a vaid URL",
        "minLength": "1",
        "maxLength": "250",
      }
    },

    "powerby1": {
      "type": "text",
      "value": "Powered By"
    },
    "megh1": {
      "type": "text",
      "value": "MeghSikshak",
      "regex": "^[A-Za-z\\s&()\\-;,'\".\\/\\?]*$",
      "errorMessage": "Only charactes are allowed",
      "minLength": "1",
      "maxLength": "250"
    }
  },

  "hnd": {
    "cdac_address": {
      "type": "text",
      "value": "महाराजा रणजीत सिंह पंजाब पुलिस अकादमी 123",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "have_questions": {
      "type": "text",
      "value": "कोई सवाल",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "log_in": {
      "type": "text",
      "value": "लॉगइन "
    },
    "register": {
      "type": "text",
      "value": "पंजीकरण करवाना"
    },
    "megh_Logo": {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "केवल छवियाँ (JPG/PNG/JPEG) अनुमति दी गई हैं जिनका अधिकतम फ़ाइल आकार 1MB है।",
      "maxLength": 1 * 1024 * 1024
    },
    "call_us_now": {
      "type": "text",
      "value": "हमें अभी फ़ोन करें",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "call_us_phone": {
      "type": "link",
      "title": {
        "value": "+910182622206",
        "regex": "^\\+\\d+$",
        "errorMessage": "सिंबल (+) के साथ केवल नंबरों की अनुमति है",
        "minLength": "13",
        "maxLength": "13",
      },
      "link": {
        "value": "tel:+910182622206",
        "regex": "^tel:\\+\\d+$",
        "errorMessage": `केवल स्वीकार्य प्रारूप "tel:+नंबर" और संख्या बिल्कुल 10 अंक।"`,
        "minLength": "17",
        "maxLength": "17",
      }
    },
    "enquiry_us": {
      "type": "text",
      "value": "हमसे पूछताछ करें",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "enquiry_us_id": {
      "type": "link",
      "title": {
        "value": "itcell.ppa@punjabpolice.gov.in",
        "regex": "^[\\w.]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,}$",
        "errorMessage": "ईमेल-आईडी मान्य नहीं है और केवल विशेष अक्षर ('@','।') की अनुमति है ",
      },
      "link": {
        "value": "mailto:itcell.ppa@punjabpolice.gov.in",
        "regex": "^mailto:[\\w.]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,}$",
        "errorMessage": `केवल स्वीकार्य प्रारूप "mailto: ईमेल-आईडी"`,
      },
    },
    "home": {
      "type": "text",
      "value": "होम"
    },
    "about_us": {
      "type": "text",
      "value": "अबाउट उस"
    },
    "courses": {
      "type": "text",
      "value": "पाठ्यक्रम"
    },
    "carousel_img1":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "केवल छवियाँ (JPG/PNG/JPEG) अनुमति दी गई हैं जिनका अधिकतम फ़ाइल आकार 1MB है।",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img2":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "केवल छवियाँ (JPG/PNG/JPEG) अनुमति दी गई हैं जिनका अधिकतम फ़ाइल आकार 1MB है।",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img3":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "केवल छवियाँ (JPG/PNG/JPEG) अनुमति दी गई हैं जिनका अधिकतम फ़ाइल आकार 1MB है।",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img4":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "केवल छवियाँ (JPG/PNG/JPEG) अनुमति दी गई हैं जिनका अधिकतम फ़ाइल आकार 1MB है।",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img5":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "केवल छवियाँ (JPG/PNG/JPEG) अनुमति दी गई हैं जिनका अधिकतम फ़ाइल आकार 1MB है।",
      "maxLength": 1 * 1024 * 1024
    },
    "popular_courses": {
      "type": "text",
      "value": "टॉप रेटेड कोर्सेज ",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "popular_courses_desc": {
      "type": "text",
      "value": "पीपीए पुलिस प्रशिक्षण के लिए ऑनलाइन कोर्सेज प्रदान करता है",
      "regex": "^[\\u0900-\\u097F\\s&-;'|\",:.?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;'|",:.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "modern_library": {
      "type": "text",
      "value": "इ-पुस्तकालय",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "modern_library_desc": {
      "type": "text",
      "value": "विश्व की सर्वश्रेष्ठ पुस्तकों की आधुनिक लाइब्रेरी",
      "regex": "^[\\u0900-\\u097F\\s&-;'|\",:.?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;'|",:.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "qualified_teacher": {
      "type": "text",
      "value": "बेस्ट ट्रेनिंग",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "qualified_teacher_desc": {
      "type": "text",
      "value": "अनुभवी फैकल्टी द्वारा इंटरएक्टिव ट्रेनिंग",
      "regex": "^[\\u0900-\\u097F\\s&-;'|\",:.?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;'|",:.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "hOPPA_image": {
      "type": "file",
      "link": "480e49d5-f318-4663-afe2-00f642a6ddbc.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "केवल छवियाँ (JPG/PNG/JPEG) अनुमति दी गई हैं जिनका अधिकतम फ़ाइल आकार 1MB है।",
      //"minLength": 14 * 1024,
      "maxLength": 1 * 1024 * 1024
    },
    "title": {
      "type": "text",
      "value": "पंजाब पुलिस अकादमी, फिल्लौर का इतिहास",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "about_desc1": {
      "type": "text",
      "value": "1861 के पुलिस अधिनियम के लागू होने से पहले, पंजाब पुलिस को 'सैन्य पुलिस बल' के रूप में जाना जाता था और इसमें 8100 पुरुष शामिल थे। इनमें से 5400 पैदल सेना को छह बटालियनों में विभाजित किया गया था और शेष 2,700 घुड़सवार थे। हालाँकि, भारत की तलवार-भुजा, पंजाब को अपने आंतरिक प्रशासन के लिए एक बेहतर शक्ति की आवश्यकता थी। 1861 का पुलिस अधिनियम 1 जनवरी, 1890 से पंजाब में लागू हुआ।",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",.:/?0-9]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "10",
      "maxLength": "600"
    },
    "about_desc2": {
      "type": "text",
      "value": "फिल्लौर किले में पुलिस प्रशिक्षण स्कूल की स्थापना 9 सितंबर, 1891 को गृह विभाग की एक अधिसूचना द्वारा श्री जे.एम. बिशप, आई.पी., सहायक जिला पुलिस अधीक्षक के तहत एक अल्प कर्मचारी के साथ की गई थी। 1 जनवरी, 1892 से स्कूल ने काम करना शुरू कर दिया। इस तरह पंजाब इस तरह का स्कूल स्थापित करने वाला देश का पहला राज्य बन गया। लॉर्ड कुजोन द्वारा 1902 में नियुक्त पुलिस आयोग की रिपोर्ट के बाद अधिकांश अन्य प्रशिक्षण स्कूल स्थापित किए गए थे।",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",.:/?0-9]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "10",
      "maxLength": "600"
    },
    "happy_students": {
      "type": "text",
      "value": "खुश छात्र",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "teachers": {
      "type": "text",
      "value": "अध्यापक",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "coursess": {
      "type": "text",
      "value": "कोर्सेज",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "read_more": {
      "type": "text",
      "value": "और पढ़ें",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "info_title": {
      "type": "text",
      "value": "आइए देखें कि हमारे प्रशिक्षु हमारे बारे में क्या सोचते हैं। उनके टेस्टीमोनिअल्स।",
      "regex": "^[\\u0900-\\u097F\\s&-;'|\",:.?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;'|",:.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "view_all_courses": {
      "type": "text",
      "value": "सभी कोर्सेज देखें",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "upcoming": {
      "type": "text",
      "value": "अपकमिंग",
    },
    "events": {
      "type": "text",
      "value": "इवेंट्स"
    },
    "frequently_ask": {
      "type": "text",
      "value": "फ्रेक्वेंटली अस्केद",
      "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "question": {
      "type": "text",
      "value": "क़ुएस्तिओन्स"
    },
    "faq_titile_1": {
      "type": "text",
      "value": "पाठ्यक्रमों में दाखिला लेने की यूएसपी या लाभ क्या है?",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "faq_desc_1": {
      "type": "text",
      "value": "सी-डैक के उद्योग कौशल पाठ्यक्रम को अनुसंधान एवं विकास विशेषज्ञों द्वारा डिजाइन, विकसित और सलाह दी जाती है, जिनके पास वास्तविक समय की परियोजनाओं को लागू करने का व्यापक अनुभव है। ये पाठ्यक्रम उद्योग मानकों और प्रक्रियाओं के अनुसार एंड-टू-एंड परियोजना जीवन चक्र में अंतर्दृष्टि प्रदान करते हैं।",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "10",
      "maxLength": "500"
    },
    "faq_titile_2": {
      "type": "text",
      "value": " पाठ्यक्रमों में नामांकन के लिए कौन पात्र हैं?",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "faq_desc_2": {
      "type": "text",
      "value": "इच्छुक कोई भी कोर्स में दाखिला ले सकता है। इलेक्ट्रॉनिक्स, इलेक्ट्रिकल, इंस्ट्रूमेंटेशन, कंप्यूटर साइंस, सूचना प्रौद्योगिकी या किसी समकक्ष विषय से उम्मीदवार नामांकन कर सकते हैं।",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "500"
    },
    "faq_titile_3": {
      "type": "text",
      "value": "पाठ्यक्रमों में नामांकन के लिए कौन पात्र हैं?",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },
    "faq_desc_3": {
      "type": "text",
      "value": " इच्छुक कोई भी कोर्स में दाखिला ले सकता है। इलेक्ट्रॉनिक्स, इलेक्ट्रिकल, इंस्ट्रूमेंटेशन, कंप्यूटर साइंस, सूचना प्रौद्योगिकी या किसी समकक्ष विषय से उम्मीदवार नामांकन कर सकते हैं।",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "500"
    },
    "card_title": {
      "type": "text",
      "value": " दीपक नगरे"
    },
    "card_desc": {
      "type": "text",
      "value": "यह कार्ड अभ्यास के लिए बनाया गया है"
    },
    "card_btn": {
      "type": "text",
      "value": "कहीं जाओ"
    },
    "cA": {
      "type": "text",
      "value": "कम्पनी का पता"
    },
    "cdac_full_address": {
      "type": "text",
      "value": " महाराजा रणजीत सिंह पंजाब पुलिस अकादमी, फिल्लौर जिला - जालंधर, पंजाब, भारत 144410",
      "regex":  "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?0-9]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "5",
      "maxLength": "250"
    },
    "copyright": {
      "type": "text",
      "value": "© 2023 कॉपीराइट"
    },
    "design_develop": {
      "type": "text",
      "value": ", प्रगत संगणन विकास केंद्र",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    },

    "usefull_links": {
      "type": "text",
      "value": "उसेफुल लिंक्स"
    },

    "footerPoweredBy": {
      "type": "link",
      "title": {
        "value": "पंजाब पुलिस अकादमी",
        "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
        "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
        "minLength": "1",
        "maxLength": "250"
      },
      "link": {
        "value": "https://www.punjabpoliceacademy.com/",
        "regex": "\\bhttps?:\\/\\/\\S+\\b",
        "errorMessage": "वैध URL दर्ज करें",
        "minLength": "1",
        "maxLength": "250",
      }
    },
    "footerMeghS": {
      "type": "Link",
      "title": {
        "value": "पंजाब पुलिस",
        "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
        "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
        "minLength": "1",
        "maxLength": "250"
      },
      "link": {
        "value": "https://punjabpolice.gov.in/",
        "regex": "\\bhttps?:\\/\\/\\S+\\b",
        "errorMessage": "वैध URL दर्ज करें",
        "minLength": "1",
        "maxLength": "250",
      }
    },
    "footerHelp": {
      "type": "link",
      "title": {
        "value": "सूचना का अधिकार",
        "regex": "^[\\u0900-\\u097F\\s&-;:,'\"|.?]*$",
        "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&-;:,'"|.?)) की अनुमति है`,
        "minLength": "1",
        "maxLength": "250"
      },

      "link": {
        "value": "https://www.punjabpoliceacademy.com/joining-instructions",
        "regex": "\\bhttps?:\\/\\/\\S+\\b",
        "errorMessage": "वैध URL दर्ज करें",
        "minLength": "1",
        "maxLength": "250",
      }
    },
    "powerby1": {
      "type": "text",
      "value": "| द्वारा संचालित"
    },
    "megh1": {
      "type": "text",
      "value": "मेघशिक्षक",
      "regex": "^[\\u0900-\\u097F\\s&()\\-;'|\",:/?]+$",
      "errorMessage": `केवल (वर्ण, संख्या, प्रतीक (&()-;'|",: /?)) की अनुमति है`,
      "minLength": "1",
      "maxLength": "250"
    }
  },
  "tel": {
    "cdac_address": {
      "type": "text",
      "value": "మహారాజా రంజిత్ సింగ్ పంజాబ్ పోలీస్ అకాడమీ 123",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "1",
      "maxLength": "250"
    },
    "have_questions": {
      "type": "text",
      "value": "ఎవైనా సందేహాలు ఉన్నాయా",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "log_in": {
      "type": "text",
      "value": "లాగ్ ఇన్"
    },
    "Register": {
      "type": "text",
      "value": "నమోదు చేసుకోండ"
    },
    "register": {
      "type": "text",
      "value": "నమోదు"
    },
    "megh_Logo": {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "గరిష్ట ఫైల్ పరిమాణం 1MBతో చిత్రాలు మాత్రమే అనుమతించబడతాయి (JPG/PNG/JPEG)",
      "maxLength": 1 * 1024 * 1024
    },
    "call_us_now": {
      "type": "text",
      "value": "ఇప్పుడే మాకు కాల్ చేయండి",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "call_us_phone": {
      "title": {
        "value": "+910182622206",
        "regex": "^\\+\\d+$",
        "errorMessage": "సంఖ్యలు (+) గుర్తుతో మాత్రమే అనుమతించబడతాయి",
        "minLength": "13",
        "maxLength": "13",
      },
      "link": {
        "value": "tel:+910182622206",
        "regex": "^tel:\\+\\d+$",
        "errorMessage": `ఆమోదయోగ్యమైన ఫార్మాట్ "టెల్:+సంఖ్య" మరియు సంఖ్య ఖచ్చితంగా 10 అంకెలు మాత్రమే."`,
        "minLength": "17",
        "maxLength": "17",
      }
    },
    "enquiry_us": {
      "type": "text",
      "value": "మమ్మల్ని సంప్రదించండి",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "enquiry_us_id": {
      "type": "link",
      "title": {
        "value": "itcell.ppa@punjabpolice.gov.in",
        "regex": "^[\\w.]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,}$",
        "errorMessage": "ఇమెయిల్-ఐడి చెల్లదు మరియు ప్రత్యేక అక్షరాలు('@','.') మాత్రమే అనుమతించబడతాయి "
      },
      "link": {
        "value": "mailto:itcell.ppa@punjabpolice.gov.in",
        "regex": "^mailto:[\\w.]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,}$",
        "errorMessage": `కేవలం ఆమోదయోగ్యమైన ఫార్మాట్ "mailto:Email-Id"`,
      },
    },
    "home": {
      "type": "text",
      "value": "హోమ్"
    },
    "about_us": {
      "type": "text",
      "value": "మా గురించి"
    },
    "courses": {
      "type": "text",
      "value": "కోర్సులు"
    },
    "carousel_img1":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "గరిష్ట ఫైల్ పరిమాణం 1MBతో చిత్రాలు మాత్రమే అనుమతించబడతాయి (JPG/PNG/JPEG)",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img2":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "గరిష్ట ఫైల్ పరిమాణం 1MBతో చిత్రాలు మాత్రమే అనుమతించబడతాయి (JPG/PNG/JPEG)",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img3":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "గరిష్ట ఫైల్ పరిమాణం 1MBతో చిత్రాలు మాత్రమే అనుమతించబడతాయి (JPG/PNG/JPEG)",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img4":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "గరిష్ట ఫైల్ పరిమాణం 1MBతో చిత్రాలు మాత్రమే అనుమతించబడతాయి (JPG/PNG/JPEG)",
      "maxLength": 1 * 1024 * 1024
    },
    "carousel_img5":
    {
      "type": "file",
      "link": "65f2b8e6-1a74-495e-ae94-3b6b128c73f3.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "గరిష్ట ఫైల్ పరిమాణం 1MBతో చిత్రాలు మాత్రమే అనుమతించబడతాయి (JPG/PNG/JPEG)",
      "maxLength": 1 * 1024 * 1024
    },
    "popular_courses": {
      "type": "text",
      "value": "టాప్ రేటింగ్ కోర్సులు",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "popular_courses_desc": {
      "type": "text",
      "value": "C-DAC అత్యాధునిక టెక్నాలజీలలో కోర్సులను అందిస్తుంది",
      "regex": "^[\\u0C00-\\u0C7F\\sa-zA-Z0-9&()\\-'\",.?]+$",
      "errorMessage": "(అక్షరం, సంఖ్యలు) మాత్రమే అనుమతించబడతాయి",
      "minLength": "1",
      "maxLength": "250"

    },
    "modern_library": {
      "type": "text",
      "value": "ఆధునిక గ్రంథాలయం",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "modern_library_desc": {
      "type": "text",
      "value": "ప్రపంచంలోని ఉత్తమ పుస్తకాల ఆధునిక గ్రంథాలయం",
      "regex": "^[\\u0C00-\\u0C7F\\sa-zA-Z0-9&()\\-'\",.?]+$",
      "errorMessage": "(అక్షరం, సంఖ్యలు) మాత్రమే అనుమతించబడతాయి",
      "minLength": "1",
      "maxLength": "250"
    },
    "qualified_teacher": {
      "type": "text",
      "value": "అర్హత కలిగిన ఉపాధ్యాయులు",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "qualified_teacher_desc": {
      "type": "text",
      "value": "అనుభవజ్ఞులైన ఫ్యాకల్టీ ద్వారా ఇంటరాక్టివ్ శిక్షణ",
      "regex": "^[\\u0C00-\\u0C7F\\sa-zA-Z0-9&()\\-'\",.?]+$",
      "errorMessage": "(అక్షరం, సంఖ్యలు) మాత్రమే అనుమతించబడతాయి",
      "minLength": "1",
      "maxLength": "250"
    },
    "hOPPA_image": {
      "type": "file",
      "link": "480e49d5-f318-4663-afe2-00f642a6ddbc.png",
      "regex": "^([a-zA-Z0-9\\s_\\\\.\\-:])+(.png|.jpe?g|.gif)$",
      "errorMessage": "గరిష్ట ఫైల్ పరిమాణం 1MBతో చిత్రాలు మాత్రమే అనుమతించబడతాయి (JPG/PNG/JPEG)",
      "maxLength": 1 * 1024 * 1024
    },
    "title": {
      "type": "text",
      "value": "పంజాబ్ పోలీస్ అకాడమీ చరిత్ర, ఫిల్లౌర్", 
      "regex": "^[\\u0C00-\\u0C7F\\s\\'\",\-\:\\(\\)]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "about_desc1": {
      "type": "text",
      "value": "ఫిలింనగర్ కోటలో పోలీస్ ట్రైనింగ్ స్కూల్ 9 సెప్టెంబర్, 1891న హోం శాఖ నోటిఫికేషన్ ద్వారా శ్రీ జె.ఎం. అసిస్టెంట్ డిస్ట్రిక్ట్ సూపరింటెండెంట్ ఆఫ్ పోలీస్ ఆధ్వర్యంలో కొద్దిపాటి సిబ్బందితో బిషప్, పాఠశాల జనవరి 1, 1892 నుండి పనిచేయడం ప్రారంభించింది. అలా దేశంలోనే ఇలాంటి పాఠశాలను స్థాపించిన మొదటి రాష్ట్రంగా పంజాబ్ అవతరించింది. 1902లో లార్డ్ కుజోన్ నియమించిన పోలీస్ కమిషన్ నివేదికను అనుసరించి చాలా ఇతర శిక్షణా పాఠశాలలు స్థాపించబడ్డాయి",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "10",
      "maxLength": " 600 "
    },
    "about_desc2": {
      "type": "text",
      "value": "ఫిలింనగర్ కోటలో పోలీస్ ట్రైనింగ్ స్కూల్ 9 సెప్టెంబర్, 1891న హోం శాఖ నోటిఫికేషన్ ద్వారా శ్రీ జె.ఎం. అసిస్టెంట్ డిస్ట్రిక్ట్ సూపరింటెండెంట్ ఆఫ్ పోలీస్ ఆధ్వర్యంలో కొద్దిపాటి సిబ్బందితో బిషప్, పాఠశాల జనవరి 1, 1892 నుండి పనిచేయడం ప్రారంభించింది. అలా దేశంలోనే ఇలాంటి పాఠశాలను స్థాపించిన మొదటి రాష్ట్రంగా పంజాబ్ అవతరించింది. 1902లో లార్డ్ కుజోన్ నియమించిన పోలీస్ కమిషన్ నివేదికను అనుసరించి చాలా ఇతర శిక్షణా పాఠశాలలు స్థాపించబడ్డాయి",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "10",
      "maxLength": "600"
    },
    "happy_students": {
      "type": "text",
      "value": "హ్యాపీ స్టూడెంట్స్",
      "regex": "[\\u0C00-\\u0C7F0-9\\s,-]+$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "teachers": {
      "type": "text",
      "value": "ఉపాధ్యాయులు",
      "regex": "[\\u0C00-\\u0C7F0-9\\s,-]+$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "coursess": {
      "type": "text",
      "value": "కోర్సులు",
      "regex": "[\\u0C00-\\u0C7F0-9\\s,-]+$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "read_more": {
      "type": "text",
      "value": "మరింత చదవండి",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "info_title": {
      "type": "text",
      "value": "మన ట్రైనీలు మన గురించి ఏమనుకుంటున్నారో చూద్దాం. వారి టెస్టిమోనియల్స్.",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": "(అక్షరం, సంఖ్యలు) మాత్రమే అనుమతించబడతాయి",
      "minLength": "1",
      "maxLength": "250"
    },
    "view_all_courses": {
      "type": "text",
      "value": "అన్ని కోర్సులను చూడండి"
    },
    "upcoming": {
      "type": "text",
      "value": "తదుపరి"
    },
    "events": {
      "type": "text",
      "value": "ఈవెంట్స్"
    },
    "frequently_ask": {
      "type": "text",
      "value": "తరచుగా అడిగే ప్రశ్నలు",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    },
    "question": {
      "type": "text",
      "value": "ప్రశ్నలు"
    },
    "faq_titile_1": {
      "type": "text",
      "value": "కోర్సులకు నమోదు చేసుకోవడం వల్ల లేదా ప్రయోజనాలు ఏమిటి?",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "1",
      "maxLength": "250"
    },
    "faq_desc_1": {
      "type": "text",
      "value": "యొక్క పరిశ్రమ నైపుణ్యం కోర్సులు రియల్ టైమ్ అమలు చేయడంలో అపారమైన అనుభవం ఉన్న నిపుణులచే రూపొందించబడ్డాయి, అభివృద్ధి చేయబడ్డాయి మరియు మార్గదర్శకత్వం వహిస్తాయి. ఈ కోర్సులు పరిశ్రమ ప్రమాణాలు మరియు ప్రక్రియల ప్రకారం ఎండ్-టు-ఎండ్ ప్రాజెక్ట్ జీవిత చక్రం గురించి అంతర్దృష్టిని అందిస్తాయి.",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "1",
      "maxLength": "500"
    },
    "faq_titile_2": {
      "type": "text",
      "value": "కోర్సులకు నమోదు చేసుకోవడానికి ఎవరు అర్హులు?",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "1",
      "maxLength": "250"
    },
    "faq_desc_2": {
      "type": "text",
      "value": "ఆసక్తి ఉన్న ఎవరైనా కోర్సులకు నమోదు చేసుకోవచ్చు. ఎలక్ట్రానిక్స్, ఎలక్ట్రికల్ కంప్యూటర్ సైన్స్, ఇన్ఫర్మేషన్ టెక్నాలజీ లేదా ఏదైనా సమానమైన విభాగం నుండి అభ్యర్థులు నమోదు చేసుకోవచ్చు.",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "1",
      "maxLength": "250"
    },
    "faq_titile_3": {
      "type": "text",
      "value": "కోర్సుల్లో చేరేందుకు ఎవరు అర్హులు?",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "1",
      "maxLength": "250"
    },
    "faq_desc_3": {
      "type": "text",
      "value": "ఆసక్తి ఉన్న ఎవరైనా కోర్సుల్లో చేరవచ్చు. ఎలక్ట్రానిక్స్, ఎలక్ట్రికల్, కంప్యూటర్ సైన్స్, ఇన్ఫర్మేషన్ టెక్నాలజీ లేదా ఏదైనా సమానమైన విభాగంలో అభ్యర్థులు నమోదు చేసుకోవచ్చు.",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "1",
      "maxLength": "250"
    },
    "card_title": {
      "type": "text",
      "value": "దీపక్ నగరే"
    },
    "card_desc": {
      "type": "text",
      "value": "ఈ కార్డ్ ప్రాక్టీస్ కోసం రూపొందించబడింది"
    },
    "card_btn": {
      "type": "text",
      "value": "ఎక్కడికన్నా వెళ్ళు"
    },
    "cA": {
      "type": "text",
      "value": "కంపెనీ చిరునామా"
    },
    "cdac_full_address": {
      "type": "text",
      "value": "మహారాజా రంజిత్ సింగ్ పంజాబ్ పోలీస్ అకాడమీ, ఫిల్లౌర్ జిల్లా - జలంధర్, పంజాబ్, భారతదేశం 144410",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "5",
      "maxLength": "250"
    },
    "copyright": {
      "type": "text",
      "value": "© 2023 కాపీరైట్"
    },
    "design_develop": {
      "type": "text",
      "value": "మహారాజా రంజిత్ సింగ్ పంజాబ్ పోలీస్ అకాడమీ",
      "regex": "^[\\u0C00-\\u0C7F0-9\\s&()\\-'\",.?]+$",
      "errorMessage": `"కేవలం (అక్షరములు, సంఖ్యలు, చిహ్నములు (&()\-'",.?) ) మాత్రమే అనుమతించబడుతుంది."`,
      "minLength": "1",
      "maxLength": "250"
    },

    "usefull_links": {
      "type": "text",
      "value": "ఉపయోగకరమైన లింకులు"
    },

    "footerPoweredBy": {
      "type": "link",
      "title": {
        "value": "పంజాబ్ పోలీస్ అకాడమీ",
        "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
        "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
        "minLength": "1",
        "maxLength": "250"
      },
      "link": {
        "value": "https://www.punjabpoliceacademy.com/",
        "regex": "\\bhttps?:\\/\\/\\S+\\b",
        "errorMessage": "చెడ్డ URLని నమోదు చేయండి",
        "minLength": "1",
        "maxLength": "250",
      }
    },

  
    "footerMeghS": {
      "type": "link",
      "title": {
        "value": "పంజాబ్ పోలీసులు",
        "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
        "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
        "minLength": "1",
        "maxLength": "250"
      },

      "link": {
        "value": "https://punjabpolice.gov.in/",
        "regex": "\\bhttps?:\\/\\/\\S+\\b",
        "errorMessage": "చెడ్డ URLని నమోదు చేయండి",
        "minLength": "1",
        "maxLength": "250",
      }
    },
    "footerHelp": {
      "type": "link",
      "title": {
        "value": "సమాచార హక్కు",
        "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
        "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
        "minLength": "1",
        "maxLength": "250"
      },

      "link": {
        "value": "https://www.punjabpoliceacademy.com/joining-instructions",
        "regex": "\\bhttps?:\\/\\/\\S+\\b",
        "errorMessage": "చెడ్డ URLని నమోదు చేయండి",
        "minLength": "1",
        "maxLength": "250",
      }
    },
    "powerby1": {
      "type": "text",
      "value": "ద్వారా ఆధారితం"
    },
    "megh1": {
      "type": "text",
      "value": "మేఘశిక్షక్",
      "regex": "^[\\u0C00-\\u0C7F\\s\\,-]*$",
      "errorMessage": `అక్షరాలు మరియు చిహ్నాలు ( ,-:() ) మాత్రమే అనుమతించబడతాయి`,
      "minLength": "1",
      "maxLength": "250"
    }
  }
}
export default function DynamicContextState() {

  const [dynamicContextState, setDynamicContextState] = useState(defaultDynamicContextState)

  return { defaultDynamicContextState, dynamicContextState, setDynamicContextState }

}

export { defaultDynamicContextState };

// export default DynamicContextState







