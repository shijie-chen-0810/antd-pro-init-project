import { useState } from 'react';
import ReactQuill from 'react-quill';
import type { Value } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const QuillTextEditor = () => {
  const [value, setValue] = useState<Value>('');
  return (
    <div>
      <ReactQuill value={value} onChange={(val) => setValue(val)} />
    </div>
  );
};
export default QuillTextEditor;
