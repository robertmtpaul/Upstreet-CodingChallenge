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
    expect(response).toBe("1985-02-08")
    });

// Check if a given name is sent in axios post request
it('submits a given name', async()=> {
    mockedAxios.post.mockResolvedValue({
        data: {
            "givenName" : "James"
        }
    });
    const response = await doKycCheck();
    expect(response).toBe({
        data: {
            "givenName" : "James"
        }
    });
});

// TODO: add tests for remaining fields.