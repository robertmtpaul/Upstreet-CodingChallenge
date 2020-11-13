const axios = require('axios');
const BASE_URL = "https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence"
const APIKEY = "03aa7ba718da920e0ea362c876505c6df32197940669c5b150711b03650a78cf";
// Pass in input for the function for validation by API
export async function doKycCheck(BirthDate, GivenName, MiddleName, FamilyName, LicenceNumber, StateOfIssue, ExpiryDate) {

    // Nested functions for carrying out data validation.
    function isValidDob() {
        // Using regular expression check if the BirthDate passed in is in correct format, and if not, return false
        if(!/^\d{4}-\d{2}-\d{2}$/.test(BirthDate)){
            console.log('Birth date in invalid format') 
            return false;
        }            
    }


    // Set up a function to reject input that is over 100 characters
    function checkLengths(){
        if( GivenName.length >= 100){
            return false
        }
        else if( MiddleName.length >= 100){
            return false
        } else if( FamilyName.length >=100){
            return false
        }
    }
    // Fail if license number is missing.
    function checkLicenseNumber(){
        if (input === null ){
            return false
        }
    }

    isValidDob();
    checkLengths();
    // // checkLength();
    // // checkLength();
    // checkLicenseNumber();


    const props = {
        url: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'token': APIKEY
        }
    }

    const response = await axios.post(`${BASE_URL}`, props, {
        "birthDate": BirthDate,
        "givenName": GivenName,
        "middleName": MiddleName,
        "familyName": FamilyName,
        "licenceNumber": LicenceNumber,
        "stateOfIssue": StateOfIssue,
        "expiryDate": ExpiryDate,
    });

    console.log(response)

    if (response.verificationResultCode === "N") {
        console.log('False')
        return false
    } else if (response.verificationResultCode === "D") {
        throw {
            code: "D",
            message: "Document Error"
        }

    } else if (response.verificationResultCode === "S") {
        throw {
            code: "S",
            message: "Server Error"
        }
    } else {
        console.log('True')
        return true
    }

}