对现有`request`再次做了封装，解决重复接口在同一时间请求多次的问题

- 使用方式
```js
import mergeRequest from '@jl/web-ui/lib/util/mergeRequest';

export const requestApi1 = async (data) => mergeRequest({ url: '/api/xxxxx', data, method: 'GET' });
```