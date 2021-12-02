import type { Request, Response } from 'express';
import Mock from 'mockjs';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  // 核查管理列表数据
  'GET /customer/inspect/manage/list': async (req: Request, res: Response) => {
    await waitTime(100);
    const data = Mock.mock({
      [`list|${req.query.pageSize}`]: [
        {
          corpNo: '@word(3,8)',
          'id|1-100000': 1,
          firstKpTime: '@datetime',
          customerName: '@cword(3,8)有限公司',
        },
      ],
    });
    res.send({
      code: 200,
      message: '获取客户列表成功',
      result: {
        pageSize: req.query.pageSize,
        pageNo: Number(req.query.current),
        totals: 72,
        ...data,
      },
    });
  },
  //查询核查小二
  'GET /internal/customer/inspect/user/list': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: 200,
      message: '添加回执成功',
      result: [
        {
          userId: '123',
          name: 'csj',
        },
      ],
    });
  },
};
