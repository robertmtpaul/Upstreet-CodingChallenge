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