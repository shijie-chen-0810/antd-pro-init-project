import { WarReportState } from './warReport';

export interface RootModelState extends DefaultRootState {
  warReport: WarReportState;
}
