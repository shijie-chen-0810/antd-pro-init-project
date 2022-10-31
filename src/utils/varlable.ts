import img2 from '@/assets/imgs/2.jpg';
import img3 from '@/assets/imgs/3.jpg';
import img4 from '@/assets/imgs/4.jpg';

export const imgList = [
  {
    id: 1,
    url: 'https://notice-log-test.oss-cn-hangzhou.aliyuncs.com/pangu/battle-dev/image/ding76745342e411bc8dbc961a6cb783455b/202108/16288272973111628827297069.jpeg',
  },
  { id: 2, url: img2 },
  { id: 3, url: img3 },
  { id: 4, url: img4 },
];
/** 质检列表tab key */
export const INSPECT_TAB_KEY = {
  /** 全部客户 */
  all: '1',
  /** 核查中 */
  inspecting: '2',
  /** 核查完毕 */
  completed: '3',
};
