const axios = require('axios');
const { JsxEmit, idText } = require('typescript');
const BASE_URL = "https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence"
const APIKEY = "03aa7ba718da920e0ea362c876505c6df32197940669c5b150711b03650a78cf";
// Pass in input for the function for validation by API
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

jest.mock('axios');

it('returns DriverLicenseResponse', async() => {
            axios.post.mockResolvedValue({
                    data: [{
                            verifyDocumentResult: {
                                type: "DriverLicenceResponse"
                            },
                            {
                                verificationRequestNumber: 00000,
                                verificationResultCode: "N"
                            }
                        ]
                    });

                const type = await getRequestType(); expect(type).toEqual('DriverLicenseResponse');

            });