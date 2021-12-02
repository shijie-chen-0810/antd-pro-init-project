import { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import style from './TextEditor.less';

import '@wangeditor/editor/dist/css/style.css';
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  SlateDescendant,
} from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import './customEditorUtils';
// import { SlateTransforms } from '@wangeditor/editor';

const TextEditor = () => {
  // 存储 editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 存储 editor 的最新内容（json 格式）
  const [curContent, setCurContent] = useState<SlateDescendant[]>([]);

  const [previewContent, setPreviewContent] = useState<string>('');
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    /* 工具栏配置 */
    excludeKeys: ['insertVideo', 'bulletedList', 'numberedList', 'fullScreen'],
    insertKeys: {
      index: 22, // 插入的位置，基于当前的 toolbarKeys
      keys: ['customVideo'],
    },
  };

  // editor 配置
  const editorConfig: Partial<IEditorConfig> = {
    onCreated: (editor1: IDomEditor) => {
      console.log(editor1.getAllMenuKeys());
      // const node = {
      //   type: 'video',
      //   src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      //   children: [{ text: '' }],
      // };
      // editor1.insertNode(node);
      setEditor(editor1);
      // setTimeout(() => {
      //   const imgList = document.querySelectorAll('.editor-img');
      //   imgList.forEach((imgEle) => {
      //     imgEle.onclick = (e) => {
      //       console.log(e.target.src);
      //     };
      //   });
      // }, 2000);
    },
    onChange: (editor1: IDomEditor) => {
      setCurContent(editor1.children);
      const _html = editor1.getHtml();
      setPreviewContent(
        _html
          .split('<table')
          .join(`<table border="1"`)
          .split('<img')
          .join(`<img class="editor-img"`),
      );
    },
  };

  // 及时销毁 editor ，重要！！！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <Space style={{ marginBottom: '10px' }}>
        <Button onClick={() => console.log(curContent)}>打印数据</Button>
        <Button onClick={() => console.log(editor?.getHtml())}>打印html</Button>
      </Space>
      <div className={style.editor}>
        {/* 渲染 toolbar */}
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />

        {/* 渲染 editor */}
        <Editor
          defaultConfig={editorConfig}
          defaultContent={[
            {
              type: 'paragraph',
              children: [
                { text: 'asddasdssssssss' },
                {
                  type: 'image',
                  src: 'https://avatars.githubusercontent.com/u/66555410?s=40&v=4',
                  href: '',
                  alt: 'asd',
                  style: {},
                  children: [{ text: '' }],
                },
                { text: '' },
              ],
            },
            {
              type: 'table',
              children: [
                {
                  type: 'table-row',
                  children: [
                    { type: 'table-cell', children: [{ text: 'sdfsdfsdf' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: 'dsfsdfsss' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: 'dsfsd' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: 'sdfsdf' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: 'sfdfsdfsss' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: 'fsdfsdf' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: 'sdfsdf' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: '' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: '' }], isHeader: true },
                    { type: 'table-cell', children: [{ text: '' }], isHeader: true },
                  ],
                },
                {
                  type: 'table-row',
                  children: [
                    { type: 'table-cell', children: [{ text: 'sfdsdf' }] },
                    { type: 'table-cell', children: [{ text: 'fsdfffffsdf' }] },
                    { type: 'table-cell', children: [{ text: 'fsdf' }] },
                    { type: 'table-cell', children: [{ text: 'fsdf' }] },
                    { type: 'table-cell', children: [{ text: 'fsdf' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                  ],
                },
                {
                  type: 'table-row',
                  children: [
                    { type: 'table-cell', children: [{ text: 'sfsdf' }] },
                    { type: 'table-cell', children: [{ text: 'fs' }] },
                    { type: 'table-cell', children: [{ text: 'sdfsd' }] },
                    { type: 'table-cell', children: [{ text: 'sdfsd' }] },
                    { type: 'table-cell', children: [{ text: 'fsdfsdf' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                  ],
                },
                {
                  type: 'table-row',
                  children: [
                    { type: 'table-cell', children: [{ text: 'fdsfsds' }] },
                    { type: 'table-cell', children: [{ text: 'fff' }] },
                    { type: 'table-cell', children: [{ text: 'sdf' }] },
                    { type: 'table-cell', children: [{ text: 'sfdf' }] },
                    { type: 'table-cell', children: [{ text: 'fsdsdf' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                  ],
                },
                {
                  type: 'table-row',
                  children: [
                    { type: 'table-cell', children: [{ text: 'fsdf' }] },
                    { type: 'table-cell', children: [{ text: 'fsdf' }] },
                    { type: 'table-cell', children: [{ text: 'fsdf' }] },
                    { type: 'table-cell', children: [{ text: 'fsdf' }] },
                    { type: 'table-cell', children: [{ text: 'sfdf' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                  ],
                },
                {
                  type: 'table-row',
                  children: [
                    { type: 'table-cell', children: [{ text: 'sfd' }] },
                    { type: 'table-cell', children: [{ text: 'fsd' }] },
                    { type: 'table-cell', children: [{ text: 'fsdfs' }] },
                    { type: 'table-cell', children: [{ text: 'fssfsdf' }] },
                    { type: 'table-cell', children: [{ text: 'sdfsd' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                    { type: 'table-cell', children: [{ text: '' }] },
                  ],
                },
              ],
            },
            { type: 'paragraph', children: [{ text: '' }] },
          ]}
          mode="default"
          style={{ height: '300px' }}
        />
        <div dangerouslySetInnerHTML={{ __html: previewContent }} />
      </div>
    </>
  );
};

export default TextEditor;
