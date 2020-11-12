const axios = require('axios');
const BASE_URL = "https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence"
const APIKEY = "03aa7ba718da920e0ea362c876505c6df32197940669c5b150711b03650a78cf";

async function doKyc(BirthDate, GivenName, MiddleName, FamilyName, LicenceNumber, StateOfIssue, ExpiryDate) {
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
    if (response.verificationResultCode === "N") {
        console.log('False')
        return false
    } else {
        return true
    }

}