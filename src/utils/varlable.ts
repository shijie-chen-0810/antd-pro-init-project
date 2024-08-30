import img2 from '@/assets/imgs/2.jpg';

import img3 from '@/assets/imgs/3.jpg';
import img4 from '@/assets/imgs/4.jpg';
import img5 from '@/assets/imgs/战报.png';

export const imgList = [
  {
    id: 1,
    url: 'https://pangu-rest.oss-cn-hangzhou.aliyuncs.com/battles/xfw/20240116/1705387726313.jpg',
  },
  { id: 2, url: img2 },
  { id: 3, url: img3 },
  { id: 4, url: img4 },
  {
    id: 5,
    url: img5,
  },
  {
    id: 6,
    url: 'https://notice-log-test.oss-cn-hangzhou.aliyuncs.com/battle/battle-dev/image/ding76745342e411bc8dbc961a6cb783455b/202104/1619338053946temp.png',
  },
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
