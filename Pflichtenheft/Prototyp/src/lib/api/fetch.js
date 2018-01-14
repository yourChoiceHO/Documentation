import Future from 'fluture';
import client from './client';

const fetch = options =>
  Future((reject, resolve) => {
    client(options)
      .then(response => resolve(response.data))
      .catch(reject);
  });

export default fetch;
