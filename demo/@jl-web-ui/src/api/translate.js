// import mergeRequest from '../util/mergeRequest';
import request from '../util/request';

export const translateApi = async (data) => request({ url: '/api/external/translation/translateBatchWithCache', data, method: 'POST' });

export const reTranslateApi = async (data) => request({ url: '/api/external/translation/reTranslate', data, method: 'POST' });

export const updateTranslationResultApi = async (data) => request({ url: '/api/external/translation/updateTranslationResult', data, method: 'POST' });
