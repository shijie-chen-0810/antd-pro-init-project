import { RootModelState } from '@/models/typing';
import type { Dispatch, ConnectProps } from 'umi';
import { connect } from 'umi';
import { WarReportReducers } from '@/models/warReport';
import type { MaterialInfo } from '@/models/warReport';
import ProForm, {
  ProFormDigit,
  ProFormText,
  ProFormRadio,
  ProFormColorPicker,
} from '@ant-design/pro-form';
import { Empty } from 'antd';
import { useEffect } from 'react';

interface Props extends ConnectProps {
  warReport: RootModelState['warReport'];
  dispatch: Dispatch<any>;
  blockInfo: MaterialInfo;
}

const StylePanel: React.FC<Props> = ({ warReport, blockInfo, dispatch }) => {
  const { id, blockType } = blockInfo || {};
  const [form] = ProForm.useForm();
  const { selectId } = warReport;

  const handleFormChange = (values: any) => {
    const changeInfo = { ...values };
    if (values.height) {
      Object.assign(changeInfo, {
        textStyle: { lineHeight: values.height, fontSize: values.height },
      });
    }
    dispatch({
      type: WarReportReducers.changeBlock,
      payload: { id, changeInfo },
    });
  };

  useEffect(() => {
    if (blockInfo) {
      const { blockType: type, width, height, text, textStyle, src } = blockInfo || {};
      form.setFieldValue('width', width);
      form.setFieldValue('height', height);
      if (type === 'text') {
        form.setFieldValue('text', text);
        form.setFieldValue('textStyle', textStyle);
      }
      if (type === 'img') {
        form.setFieldValue('src', src);
      }
    }
  }, [blockInfo, form]);

  return (
    <>
      {selectId ? (
        <ProForm
          form={form}
          submitter={false}
          layout="horizontal"
          style={{ padding: '12px 16px' }}
          autoFocusFirstInput={false}
          onValuesChange={handleFormChange}
        >
          <ProFormDigit label="宽" name="width" />
          <ProFormDigit label="高" name="height" />
          {/* 文本配置 */}
          {blockType === 'text' ? (
            <>
              <ProFormText label="文本" name="text" />
              <ProFormColorPicker label="颜色" name={['textStyle', 'color']} />
              <ProFormRadio.Group
                label="字体"
                radioType="button"
                name={['textStyle', 'fontStyle']}
                options={[
                  { label: '正常', value: 'normal' },
                  { label: '斜体', value: 'oblique' },
                ]}
              />
              <ProFormRadio.Group
                label="加粗"
                radioType="button"
                name={['textStyle', 'fontWeight']}
                options={[
                  { label: '正常', value: 'normal' },
                  { label: '加粗', value: 'bolder' },
                ]}
              />
              <ProFormRadio.Group
                label="对齐"
                radioType="button"
                name={['textStyle', 'textAlign']}
                options={[
                  { label: '左对齐', value: 'left' },
                  { label: '居中', value: 'center' },
                  { label: '右对齐', value: 'right' },
                ]}
              />
            </>
          ) : null}
          {/* 图片配置 */}
          {blockType === 'img' ? (
            <>
              <ProFormText label="链接" name="src" />
            </>
          ) : null}
        </ProForm>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无目标" />
      )}
    </>
  );
};
export default connect(
  ({ warReport }: RootModelState) => {
    return { warReport };
  },
  (dispatch) => {
    return { dispatch };
  },
)(StylePanel);
