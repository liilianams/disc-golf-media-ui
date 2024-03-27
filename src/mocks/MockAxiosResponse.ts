import { AxiosResponse } from 'axios';

// eslint-disable-next-line
const _200Ok: AxiosResponse<any, any> = {
  data: 'success',
  status: 200,
  statusText: 'OK',
  headers: {},
  // eslint-disable-next-line
  config: {} as any,
  request: {}
};

// eslint-disable-next-line
const _302Found: AxiosResponse<any, any> = {
  data: 'found',
  status: 302,
  statusText: 'Found',
  headers: {},
  // eslint-disable-next-line
  config: {} as any,
  request: {}
};

export const MockAxiosResponse = {
  _200Ok: _200Ok,
  _302Found: _302Found,
};
