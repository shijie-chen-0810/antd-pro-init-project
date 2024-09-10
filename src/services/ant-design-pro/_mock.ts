import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
let curStageData = {};

export default {
  'POST /api/insertStageData': async (req: Request, res: Response) => {
    await waitTime(1000);
    curStageData = req.body;
    res.send({
      code: 200,
      message: '获取字典数据成功',
      result: true,
    });
  },
  'GET /api/getStageData': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: 200,
      message: '获取字典数据成功',
      result: curStageData,
    });
  },
};
