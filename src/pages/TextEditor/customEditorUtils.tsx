import { Boot } from '@wangeditor/editor';
import { DomEditor, t } from '@wangeditor/core';
import type { IButtonMenu, IDomEditor } from '@wangeditor/core';
import { Modal, Upload, Button, Space } from 'antd';

const QUOTE_SVG = `<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>`;

let modal: any = null;

const CustomUpload = ({ editor }: { editor: IDomEditor }) => {
  const upload = () => {
    modal.destroy();
    editor.insertNode({
      type: 'video',
      // @ts-ignore
      src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      children: [{ text: '' }],
    });
  };
  return (
    <>
      <Upload>
        <Button>上传</Button>
      </Upload>
      <Space>
        <Button onClick={() => modal.destroy()}>取消</Button>
        <Button type="primary" onClick={upload}>
          插入
        </Button>
      </Space>
    </>
  );
};

// 定义菜单 class
class MyButtonMenu implements IButtonMenu {
  // 菜单配置，参考“引用”菜单源码
  readonly title = t('插入视频');
  readonly iconSvg = QUOTE_SVG;
  readonly tag = 'button';

  getValue(): string | boolean {
    // 用不到 getValue
    return '';
  }

  isActive(editor: IDomEditor): boolean {
    const node = DomEditor.getSelectedNodeByType(editor, 'blockquote');
    return !!node;
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) return false;
    // 未匹配到，则禁用
    return false;
  }

  /**
   * 执行命令
   * @param editor editor
   * @param value node.type
   */
  exec(editor: IDomEditor) {
    modal = Modal.confirm({
      okButtonProps: {
        style: { display: 'none' },
      },
      cancelButtonProps: {
        style: { display: 'none' },
      },
      centered: true,
      content: <CustomUpload editor={editor} />,
    });
    // return <CustomUpload editor={editor} />;
    // 执行命令
  }
}

// 定义菜单配置
export const menuConf = {
  key: 'customVideo', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new MyButtonMenu();
  },
};

// 注册到 wangEditor
Boot.registerMenu(menuConf);
