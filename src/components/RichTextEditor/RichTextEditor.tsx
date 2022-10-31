import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import type { Range, UnprivilegedEditor } from 'react-quill';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cs from 'classnames';
import style from './RichTextEditor.less';

import type { Sources } from 'quill';
import { request } from 'umi';
import { message, Spin } from 'antd';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import ImageSpec from 'quill-blot-formatter/dist/specs/ImageSpec';
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
Quill.register('modules/blotFormatter', BlotFormatter);
import './quillRegister';
import EnclosureModal from './components/EnclosureModal';
import VideoModal from './components/VideoModal';

type RichTextEditorProps = {
  value?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  onBlur?: (previousSelection: Range, source: Sources, editor: UnprivilegedEditor) => void;
  scrollingContainer?: string | HTMLElement;
};

const RichTextEditor = (props: RichTextEditorProps, ref: any) => {
  const { value = '', placeholder, onChange, onBlur, scrollingContainer } = props;
  const reactQuillRef = useRef<ReactQuill>(null);
  const [quillValue, setQuillValue] = useState('');
  const [changeCount, setChangeCount] = useState(0);
  const [quillLoading, setQuillLoading] = useState(false);
  const [uploadFileVisible, setUploadFileVisible] = useState<boolean>(false);
  const [uploadVideoVisible, setUploadVideoVisible] = useState<boolean>(false);

  const handleInsertImage = async (file: File) => {
    if (!file) return;
    if (!/^image\/.*/.test(file.type)) {
      message.error('只能上传图片文件!');
      return;
    }
    if (file.size > 10485760) {
      message.warning('图片大小超过10M');
      return;
    }
    const formData = new FormData();
    setQuillLoading(true);
    formData.append('file', file);
    const res = await request('/system/file/uploadPic', {
      method: 'post',
      data: formData,
    });
    setQuillLoading(false);
    if (res?.code !== 200) return;

    const { editor } = reactQuillRef.current || {};
    editor?.focus();
    const addImageRange = editor?.getSelection();
    editor?.insertEmbed(addImageRange?.index || 0, 'image', res.result.originImageUrl);
  };

  const handleInsertContent = (type: string, payload: any) => {
    const { editor } = reactQuillRef.current || {};
    editor?.focus();
    const addImageRange = editor?.getSelection();
    editor?.insertEmbed(addImageRange?.index || 0, type, payload);
  };

  const uploadHandler = () => {
    setUploadFileVisible(true);
  };

  const videoHandler = () => {
    setUploadVideoVisible(true);
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      handleInsertImage(file as File);
    };
  };
  const dropAndPasteImage = async (dataUrl: string, type: string, imageData: any) => {
    const file = imageData.toFile();
    handleInsertImage(file);
  };
  const handleEditorChange = (html: string) => {
    setQuillValue(html);
    setChangeCount(changeCount + 1);
    onChange?.(html);
  };

  const enclosureCB = (value1: any) => {
    handleInsertContent('link', {
      link: value1?.file.url,
      title: value1?.fileName || value1?.file.name,
    });
  };
  const videoCB = (value1: any) => {
    handleInsertContent('video', {
      url: value1?.file.url,
    });
  };

  const [reactQuillModules] = useState({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ size: ['14px', '12px', '16px', '18px', '20px', '22px', '24px'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link', 'image', 'video', 'upload'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
        video: videoHandler,
        upload: uploadHandler,
      },
    },
    imageDropAndPaste: {
      handler: dropAndPasteImage,
    },
    clipboard: {
      matchVisual: false,
    },
    blotFormatter: {
      specs: [ImageSpec],
    },
  });

  useImperativeHandle(ref, () => ({
    editorRef: reactQuillRef.current,
  }));

  useEffect(() => {
    // 只在初始化的时候回填 quillValue ，否则会导致光标跳转
    if (changeCount > 2) return;
    setQuillValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={cs('can-select', style.container)}>
      <Spin spinning={quillLoading}>
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
            'align',
            'link',
            'image',
            'video',
            'width',
            'style',
            'data-align',
            'custom-panel',
          ]}
          placeholder={placeholder}
          value={quillValue}
          onChange={handleEditorChange}
          onBlur={onBlur}
          className="ql-editor"
          scrollingContainer={scrollingContainer}
        />
      </Spin>
      <EnclosureModal
        visible={uploadFileVisible}
        setVisible={setUploadFileVisible}
        successCB={enclosureCB}
      />
      <VideoModal
        visible={uploadVideoVisible}
        setVisible={setUploadVideoVisible}
        successCB={videoCB}
      />
    </div>
  );
};
export default forwardRef(RichTextEditor);
