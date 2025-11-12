import request from '../util/request';

export const systemProjectList = async () => request({ url: '/api/system/frontend/list', method: 'GET' });
