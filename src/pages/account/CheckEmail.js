const { default: axios } = require("axios");
const { default: adminServices } = require("../../services/adminServices");

module.exports.CheckEmail = (getMail) => {
    const mail = `${getMail}`;
    const domainArray = mail.split("@");
    const spamDomain = domainArray[1];
    var checkStatus;

    adminServices.checkEmailSpam(spamDomain).then((resp) => {
        //console.log("MESSAGE ===== " + resp.data.status)
        if (resp.status === 200) {
            //console.log("under 200")
            return false
        }


    }).catch((err) => {
        //console.log("under catch")
        //console.log(err);
    })

    //console.log("Outside")




    // axios.get()

    // if (mail.includes("@yopmail.com")) {
    //     return true;
    // }
    // else {
    //     return false;
    // }

}




