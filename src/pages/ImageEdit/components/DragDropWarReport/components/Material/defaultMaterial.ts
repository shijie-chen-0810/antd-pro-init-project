import type { MaterialInfo } from '@/models/warReport';
import occupationImg from '@/assets/imgs/occupation.png';

export const defaultMaterialList: MaterialInfo[] = [
  {
    id: '',
    blockType: 'text',
    width: 100,
    height: 24,
    position: { x: 0, y: 0 },
    text: '文本',
    textStyle: {
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: 'normal',
      textAlign: 'center',
    },
    materialConfig: {
      isForm: false,
      label: '',
      isRequired: false,
      canDelete: true,
    },
  },
  {
    id: '',
    blockType: 'img',
    width: 100,
    height: 100,
    position: { x: 0, y: 0 },
    src: occupationImg,
    materialConfig: {
      isForm: false,
      label: '',
      isRequired: false,
      canDelete: true,
    },
  },
];
