import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import '@/components/CustomFormItem/RichTextEditor/quillRegister';
import './index.less';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ size: ['14px', '12px', '16px', '18px', '20px', '22px', '24px'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

// formats 用于控制允许的输入格式，与 toolbar 是独立的
const formats = [
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
];

interface RichTextViewerProps {
  htmlContent: string;
}

const RichTextViewer: React.FC<RichTextViewerProps> = (props) => {
  const { htmlContent } = props;

  return (
    <div className="editor-container rich-text-viewer">
      <ReactQuill
        theme="bubble"
        modules={modules}
        formats={formats}
        defaultValue={htmlContent}
        readOnly
        className="ql-editor"
      />
    </div>
  );
};

export default RichTextViewer;
