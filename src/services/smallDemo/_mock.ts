import type { Request, Response } from 'express';
import Mock from 'mockjs';

const getRandomNum = (max: number = 1000) => {
  return Math.floor(Math.random() * max);
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  // 客户多维度图表数据
  'GET /api/analysis/customer/dimension': async (req: Request, res: Response) => {
    await waitTime(1000);
    const bizType = req.query.dimension;
    const resultData: any = [];
    const industryEnum = [
      '制造业',
      '建筑业',
      '互联网/信息技术',
      '贸易',
      '服务业',
      '房地产业',
      '医疗医药',
      '运输',
      '农林牧渔',
      '问题娱乐',
      '金融业',
      '教育行业',
      '科研服务',
      '商业服务',
      '开采业',
      '政府',
      '公共环境',
      '电热',
      '其他',
    ];
    const cityLevelEnum = [
      '一线城市',
      '新一线城市',
      '二线城市',
      '三线城市',
      '四线城市',
      '五线城市',
      '海外',
    ];
    const customerSizeEnum = [
      '1-19人',
      '20-49人',
      '50-99人',
      '100-199人',
      '200-499人',
      '500-999人',
      '1000人以上',
    ];
    const instanceSourceEnum = [
      '钉钉打榜例子',
      '钉钉自有例子',
      '钉钉商务例子',
      '钉钉学院例子',
      '钉钉端口审批例子',
      '钉钉线索例子',
      '鑫官网',
      '子拓例子',
      '信息流投放广告例子',
      '布署拉新例子',
      '渠道例子',
      '众鑫例子',
      '转介绍例子',
      'ZX业务销售',
      '双节棍例子',
    ];
    if (bizType === 'industry') {
      industryEnum.forEach((item) => {
        resultData.push({
          traded: getRandomNum(),
          notTraded: getRandomNum(),
          text: item,
        });
      });
    }
    if (bizType === 'cityLevel') {
      cityLevelEnum.forEach((item) => {
        resultData.push({
          traded: getRandomNum(),
          notTraded: getRandomNum(),
          text: item,
        });
      });
    }
    if (bizType === 'scale') {
      customerSizeEnum.forEach((item) => {
        resultData.push({
          traded: getRandomNum(),
          notTraded: getRandomNum(),
          text: item,
        });
      });
    }
    if (bizType === 'source') {
      instanceSourceEnum.forEach((item) => {
        resultData.push({
          traded: getRandomNum(),
          notTraded: getRandomNum(),
          text: item,
        });
      });
    }
    res.send({
      code: 200,
      message: '操作成功',
      result: resultData,
    });
  },
  'GET /api/formatResultService': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: 200,
      message: 'success',
      result: {
        info: {
          status: true,
        },
      },
    });
  },
  'GET /api/getDataBoardData': async (req: Request, res: Response) => {
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
        pageNo: Number(req.query.pageNo),
        totals: 72,
        ...data,
      },
    });
  },
};
