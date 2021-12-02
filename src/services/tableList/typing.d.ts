declare namespace API {
  /** 核查管理列表item */
  type InspectManageListItem = {
    /** 企业名称 */
    customerName: string;
    /** 客户ID */
    id: number;
    /** 首次布署kp时间 */
    firstKpTime: string;
  };

  type InspectUser = {
    userId: string;
    name: string;
  };
}
