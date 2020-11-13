import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

import { doKycCheck } from '../index';
it('returns true', async() => {
    expect(true).toBe(true);
});


it('should mock something', async () => {
    axios.post.mockResolvedValue({ data: 'moo cow' });
    const response = await doKycCheck();
    expect(response).toEqual({ data: 'moo cow'});
  });

