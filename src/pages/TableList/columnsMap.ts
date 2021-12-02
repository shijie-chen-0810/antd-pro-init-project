import { INSPECT_TAB_KEY as tabs } from '@/utils/varlable';
import { createTimeColumn } from '@/utils/utils';

export const columnsMap = {
  [tabs.all]: ['corpNo'],
  [tabs.inspecting]: ['customerName'],
  [tabs.completed]: [
    'corpNo',
    'customerName',
    ...createTimeColumn('首次布署到KP时间', 'firstKpTime'),
  ],
};
