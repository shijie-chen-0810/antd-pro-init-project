import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /api/fighting/mng/material/group': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: '000000',
      data: [
        {
          bizId: 'ding614949de72a0b8a2',
          bizType: 'fight',
          defaultGroup: 1,
          groupName: '未分组',
          id: 13,
          sorted: 0,
          status: 1,
          subBizType: 'fodder',
        },
        {
          bizId: 'ding614949de72a0b8a2',
          bizType: 'fight',
          defaultGroup: 0,
          groupName: '战报素材',
          id: 56,
          sorted: 0,
          status: 1,
          subBizType: 'fodder',
        },
      ],
      message: 'success',
      ok: true,
    });
  },
  'GET /api/fighting/mng/material/list': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: '000000',
      data: {
        curPage: 1,
        pageSize: 18,
        resultList: [
          {
            appId: '2_1501760764',
            bizId: '',
            bizType: 'fight',
            corpId: 'ding614949de72a0b8a2',
            groupId: 56,
            groupName: '战报素材',
            id: 56,
            materialId: 17284,
            materialPath: 'img/fight/206e4c5e9ffd425f9010eb7bc3925cdf.JPG',
            materialType: 1,
            materialUrl:
              '//qzz-material.forwe.store/img/fight/206e4c5e9ffd425f9010eb7bc3925cdf.JPG',
            nickName: '李金俊',
            status: 1,
            subBizType: 'fodder',
            useType: 2,
          },
          {
            appId: '2_1501760764',
            bizId: '',
            bizType: 'fight',
            corpId: 'ding614949de72a0b8a2',
            groupId: 56,
            groupName: '战报素材',
            id: 55,
            materialId: 16888,
            materialPath: 'img/fight/d07a638dbf0c4db7b1a071dd18338c57.jpg',
            materialType: 1,
            materialUrl:
              '//qzz-material.forwe.store/img/fight/d07a638dbf0c4db7b1a071dd18338c57.jpg',
            nickName: '劳译庆',
            status: 1,
            subBizType: 'fodder',
            useType: 2,
          },
          {
            appId: '2_1501760764',
            bizId: '',
            bizType: 'fight',
            corpId: 'ding614949de72a0b8a2',
            groupId: 56,
            groupName: '战报素材',
            id: 53,
            materialId: 13768,
            materialPath: 'img/fight/a9babd5776bf4b36b83a2c93b3c9d3fc.jpg',
            materialType: 1,
            materialUrl:
              '//qzz-material.forwe.store/img/fight/a9babd5776bf4b36b83a2c93b3c9d3fc.jpg',
            nickName: '1653637104272.jpg',
            status: 1,
            subBizType: 'fodder',
            useType: 2,
          },
          {
            appId: '2_1501760764',
            bizId: '',
            bizType: 'fight',
            corpId: 'ding614949de72a0b8a2',
            groupId: 56,
            groupName: '战报素材',
            id: 52,
            materialId: 13757,
            materialPath: 'img/fight/5f93fb95baa94ce794bdb146f215fe7d.jpg',
            materialType: 1,
            materialUrl:
              '//qzz-material.forwe.store/img/fight/5f93fb95baa94ce794bdb146f215fe7d.jpg',
            nickName: '期间内',
            status: 1,
            subBizType: 'fodder',
            useType: 2,
          },
          {
            appId: '2_1501760764',
            bizId: '',
            bizType: 'fight',
            corpId: 'ding614949de72a0b8a2',
            groupId: 56,
            groupName: '战报素材',
            id: 49,
            materialId: 12371,
            materialPath: 'img/fight/cba8c1be5a684bd5b58052389a925338.jpg',
            materialType: 1,
            materialUrl:
              '//qzz-material.forwe.store/img/fight/cba8c1be5a684bd5b58052389a925338.jpg',
            nickName: '1653016378567.jpg',
            status: 1,
            subBizType: 'fodder',
            useType: 2,
          },
          {
            appId: '2_1501760764',
            bizId: '',
            bizType: 'fight',
            corpId: 'ding614949de72a0b8a2',
            groupId: 56,
            groupName: '战报素材',
            id: 48,
            materialId: 12365,
            materialPath: 'img/fight/b6b9442af1ec4b3d842fa1d7b21eba20.jpg',
            materialType: 1,
            materialUrl:
              '//qzz-material.forwe.store/img/fight/b6b9442af1ec4b3d842fa1d7b21eba20.jpg',
            nickName: '1653015893325.jpg',
            status: 1,
            subBizType: 'fodder',
            useType: 2,
          },
          {
            appId: '2_1501760764',
            bizId: '',
            bizType: 'fight',
            corpId: 'ding614949de72a0b8a2',
            groupId: 56,
            groupName: '战报素材',
            id: 47,
            materialId: 12354,
            materialPath: 'img/fight/0256558a051c499fb4f70cb7db23fa28.jpg',
            materialType: 1,
            materialUrl:
              '//qzz-material.forwe.store/img/fight/0256558a051c499fb4f70cb7db23fa28.jpg',
            nickName: '1653013293505.jpg',
            status: 1,
            subBizType: 'fodder',
            useType: 2,
          },
        ],
        totalItem: 0,
        totalPage: 1,
      },
      message: 'success',
      ok: true,
    });
  },
};
