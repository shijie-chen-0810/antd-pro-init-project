import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /interface/selection/query': async (req: Request, res: Response) => {
    await waitTime(1000);
    const { selectionWithDictType } = req.query;
    if (selectionWithDictType === 'CRM-ACCOUNT-TYPE') {
      res.send({
        code: 200,
        message: '获取字典数据成功',
        result: [
          { label: '小二', value: 'SALER' },
          { label: '主管', value: 'SUPERVISOR' },
          { label: '管理员', value: 'ADMINF' },
        ],
      });
    } else if (selectionWithDictType === 'CRM-ACCESS-RANGE') {
      res.send({
        code: 200,
        message: '获取字典数据成功',
        result: [
          { label: '全部', value: 'ALL' },
          { label: '个人', value: 'PERSONAL' },
          { label: '本级以及子级', value: 'CURRENT-LEVEL' },
          { label: '自定义', value: 'CUSTOM' },
        ],
      });
    }
  },
  'POST /api/system/file/uploadPic': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: 200,
      message: '上传成功',
      result: {
        originImageUrl: 'https://img2.baidu.com/it/u=2471298806,4050026692&fm=26&fmt=auto&gp=0.jpg',
        smallImageUrl: 'https://img2.baidu.com/it/u=2471298806,4050026692&fm=26&fmt=auto&gp=0.jpg',
      },
    });
  },
};
