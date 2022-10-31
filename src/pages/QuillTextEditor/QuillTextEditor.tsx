import { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import type { Value } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Button, Space } from 'antd';
import style from './QuillTextEditor.less';
// 注册时 ImageResize 首字母需要大写
// import ImageResize from 'quill-image-resize-module';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
// @ts-ignore
import ImageSpec from 'quill-blot-formatter/dist/specs/ImageSpec';
// Quill.register('modules/ImageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);
const fontSizeStyle = Quill.import('attributors/style/size'); //引入这个后会把样式写在style上
fontSizeStyle.whitelist = ['14px', '12px', '16px', '18px'];
Quill.register(fontSizeStyle, true);

const ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];

const BaseImageFormat = Quill.import('formats/image');
class ImageFormat extends BaseImageFormat {
  static formats(domNode: any) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name: any, value: any) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);

const Delta = Quill.import('delta');
const defaultDelta = new Delta([
  {
    attributes: { height: '76.37602459016394', width: '56' },
    insert: {
      image:
        'https://img-blog.csdnimg.cn/5b37cf4bb43e441cb24b0dd4d9cb1611.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAY2hlbnl1aGFva2FpeGlu,size_20,color_FFFFFF,t_70,g_se,x_16',
    },
  },
  {
    insert:
      '阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发斯蒂asd芬阿斯顿发斯蒂芬阿斯顿发斯蒂芬asdasdadsasd\n',
  },
]);
const aa = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ size: ['14px', '12px', '16px', '18px'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
  ],
  blotFormatter: {
    specs: [ImageSpec],
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
// 示例代码:https://codesandbox.io/s/quill-sandbox-forked-s0pdi5
const QuillTextEditor = () => {
  const [value, setValue] = useState<Value>('');
  const reactQuillRef = useRef<ReactQuill>(null);
  const handleInsertImage = () => {
    const { editor } = reactQuillRef.current || {};
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
          [{ header: [1, 2, 3, false] }],
          [{ size: ['14px', '12px', '16px', '18px'] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
        ],
        handlers: {
          image: () => {
            handleInsertImage();
          },
          video: () => {
            console.log('insert video');
          },
        },
      },
      // imageDropAndPaste: {
      //   handler: () => {},
      // },
      blotFormatter: {
        specs: [ImageSpec],
      },
      clipboard: {
        matchVisual: false,
      },
      // imageResize: {
      //   modules: ['Resize', 'DisplaySize'],
      // },
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
    <div
      id="quill"
      onSelect={(e) => {
        e.preventDefault();
        console.log('onSelect');
      }}
      className={style.container}
    >
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
              });
              console.log(value, 'value');
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
            'style',
            'data-align',
          ]}
          value={value}
          onChange={(val) => setValue(val)}
          // 让空格生效
          className="ql-editor"
        />
      </div>
      <div className={style['right-panel']}>
        <h4>quill回显Html</h4>
        <ReactQuill
          theme="bubble"
          modules={aa}
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
            'style',
          ]}
          value={value}
          readOnly
          // 让空格生效
          className="ql-editor"
        />
      </div>
    </div>
  );
};
export default QuillTextEditor;
