jest.mock('axios');

const { doKycCheck } = require('../index.js');
jest.mock('axios');
it('returns true', async() => {
    expect(true).toBe(true);
});


// it('returns DriverLicenseResponse', async() => {
//         axios.post.mockResolvedValue({
//                 data: [{
//                         verifyDocumentResult: {
//                             type: "DriverLicenceResponse"
//                         },
//                         {
//                             verificationRequestNumber: 00000,
//                             verificationResultCode: "N"
//                         }
//                     ]
//                 });

//             const type = await getRequestType(); expect(type).toEqual('DriverLicenseResponse');

//         });
// }