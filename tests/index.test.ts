// I am still learning how to use Jest for unit testing and 
// unfortunately was not able to add all code that I wanted. 
// I am confident that I can use this exercise as a starting 
// point to learn more about testing in Node.js!

import axios from 'axios';
jest.mock('axios');
// Assign typed mock to new variable
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Run simple test to make sure that jest test suite is working.
import { doKycCheck } from '../index';
it('returns true', async() => {
    expect(true).toBe(true);
});

// Check if a date of birth is sent in axios post request 
it('submits a date of birth ', async () => {
    mockedAxios.post.mockResolvedValue({ 
        data: {
            "birthDate" : "1985-02-08",
        }
      });
    const response = await doKycCheck();
    expect(response).toEqual("1985-02-08")
    });

// Check if a given name is sent in axios post request
it('submits a given name', async()=> {
    mockedAxios.post.mockResolvedValue({
        data: {
            "givenName" : "James"
        }
    });
    const response = await doKycCheck();
    expect(response).toEqual({
        data: {
            "givenName" : "James"
        }
    });
});

// Check if middle name is sent in axios post request.

it('submits a middle name', async()=> {
    mockedAxios.post.mockResolvedValue({
        data: {
            "middleName" : "Robert"
        }
    });
    const response = await doKycCheck();
    expect(response).toEqual({
        data: {
            "middleName" : "Robert"
        }
    });
});
// TODO: add tests for remaining fields.