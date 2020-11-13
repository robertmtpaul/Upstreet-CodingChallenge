const axios = require('axios');
const BASE_URL = "https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence"
const APIKEY = "03aa7ba718da920e0ea362c876505c6df32197940669c5b150711b03650a78cf";

// Pass in input for the function for validation by API
export async function doKycCheck(BirthDate, GivenName, MiddleName, FamilyName, LicenceNumber, StateOfIssue, ExpiryDate) {
    
    // Nested functions for carrying out data validation before passed to API.
    function isValidDate() {
        // Using regular expression check if the BirthDate passed in is in correct format YYYY-MM-DD, and if not, return false
        if(!/^\d{4}-\d{2}-\d{2}$/.test(BirthDate)){
            throw Error('Birth date in incorrect format ')
        // Check if expiry date follows same pattern
        } else if(!/^\d{4}-\d{2}-\d{2}$/.test(ExpiryDate)){
            throw Error('Expiry date in incorrect format ')
        }      
    }
    // Set up a function to reject input that is over 100 characters
    function checkLengths(input){
        if( input.length >= 100){
            throw Error('Validation error: input over 100 characters')
        }
    }
    // Run check to see if input for license number is missing.
    function checkLicenseNumber(){
        if (LicenceNumber === null ){
            // Fail if number is missing.
            throw Error('Validation error: missing license number')
        }
    }

    //TODO: Validation of stateOfIssue with TypeScript Type

    // Run the functions that will carry out the data validation
    isValidDate();
    checkLengths(GivenName);
    checkLengths(MiddleName);
    checkLengths(FamilyName);
    checkLicenseNumber();

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