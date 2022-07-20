import { useMemo, useRef, useState } from 'react';

import ReactQuill, { Quill } from 'react-quill';

import type { Value } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Space } from 'antd';
import style from './QuillTextEditor.less';
const Delta = Quill.import('delta');

const defaultDelta = new Delta([
  { insert: 'as' },
  { attributes: { color: '#e60000' }, insert: 'daadsasd' },
  { insert: 'as' },
  { attributes: { color: '#e60000' }, insert: 'dasdfsdfsddassdf' },
  { insert: 'fsdfsdfsadsadsasddasd' },
  { attributes: { background: '#9933ff' }, insert: 'asdadddasasddasdasdfdsfs' },
  { insert: 'fsdfsdfsdf' },
  { attributes: { background: '#000000' }, insert: 'fsdf' },
  { attributes: { background: '#facccc' }, insert: 'fsdfs' },
  { attributes: { background: '#000000' }, insert: 's' },
  { insert: 'sdfsdf' },
  { attributes: { background: '#e60000' }, insert: 'fsd' },
  { insert: 'fsdfsd' },
  {
    attributes: { width: '84' },
    insert: {
      image:
        'https://img-blog.csdnimg.cn/5b37cf4bb43e441cb24b0dd4d9cb1611.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAY2hlbnl1aGFva2FpeGlu,size_20,color_FFFFFF,t_70,g_se,x_16',
    },
  },
]);

// 示例代码:https://codesandbox.io/s/quill-sandbox-forked-s0pdi5
const QuillTextEditor = () => {
  const [value, setValue] = useState<Value>('');
  const reactQuillRef = useRef<ReactQuill>(null);
  const handleInsertImage = () => {
    const { editor } = reactQuillRef.current || {};
    console.log(editor);
    const addImageRange = editor?.getSelection();
    // @ts-ignore
    const cursorPosition = 0 + (addImageRange !== null ? addImageRange?.index : 0);
    editor?.insertEmbed(
      cursorPosition,
      'image',
      'https://img-blog.csdnimg.cn/5b37cf4bb43e441cb24b0dd4d9cb1611.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAY2hlbnl1aGFva2FpeGlu,size_20,color_FFFFFF,t_70,g_se,x_16',
    ); //插入图片//react无法读本地图片！！
    // @ts-ignore
    editor?.setSelection(cursorPosition + 1); //光标位置加1
  };
  const reactQuillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
        ],
        handlers: {
          // 'image':this.selectImage.bind(this)
          image: () => {
            handleInsertImage();
          },
        },
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    [],
  );

  const getQuillContent = () => {
    const content = reactQuillRef.current?.editor?.getContents();
    console.log(JSON.stringify(content));
  };
  const setQuillContent = () => {
    reactQuillRef.current?.editor?.setContents(defaultDelta);
  };
  return (
    <div className={style.container}>
      <div className={style['left-panel']}>
        <Space style={{ margin: '10px 0' }}>
          <Button type="primary" onClick={() => setQuillContent()}>
            setQuillContent
          </Button>
          <Button type="primary" onClick={() => getQuillContent()}>
            getQuillContent
          </Button>
          <Button
            type="primary"
            onClick={() => {
              console.log({
                editor: reactQuillRef.current,
                value,
              });
            }}
          >
            getQuillInfo
          </Button>
        </Space>
        <ReactQuill
          ref={reactQuillRef}
          theme="snow"
          modules={reactQuillModules}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'background',
            'color',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'video',
            'width',
          ]}
          value={value}
          onChange={(val) => setValue(val)}
          className="ql-editor"
        />
      </div>
      <div className={style['right-panel']}>
        <h4>quill回显Html</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: value as string,
          }}
          className="ql-editor"
        />
      </div>
    </div>
  );
};
export default QuillTextEditor;
