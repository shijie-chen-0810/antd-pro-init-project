import { uploadCutFile, mergeCutFile } from '@/services/smallDemo';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Upload } from 'antd';
import { useState } from 'react';

const SIZE = 2 * 1024 * 1024;

const FileCutUpload = () => {
  const [uploadFile, setUploadFile] = useState<File | null>();
  const uploadImage = async (target: File) => {
    console.log(target);
    setUploadFile(target);
  };
  const mergeRequest = async (fileName: string) => {
    await mergeCutFile({ fileName, size: SIZE });
  };

  // 生成文件切片
  const createFileChunk = (file: File, size = SIZE) => {
    const fileChunkList = [];
    let cur = 0;
    while (cur < file.size) {
      fileChunkList.push({ file: file.slice(cur, cur + size) });
      cur += size;
    }
    return fileChunkList;
  };

  // 上传切片
  const uploadChunks = async (
    fileChunkHashList: {
      chunk: Blob;
      hash: string;
    }[],
    fileName: string,
  ) => {
    const requestList = fileChunkHashList
      .map(({ chunk, hash }) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('filename', fileName);
        return { formData };
      })
      .map(({ formData }) => uploadCutFile(formData));
    // 并发请求
    console.time('cut');
    await Promise.all(requestList);
    console.timeEnd('cut');
    // 合并切片
    await mergeRequest(fileName);
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    const fileChunkList = createFileChunk(uploadFile);
    const fileChunkHashList = fileChunkList.map(({ file }, index) => ({
      chunk: file,
      // 文件名 + 数组下标 为后续拼接做准备
      hash: uploadFile.name + '-' + index,
    }));
    await uploadChunks(fileChunkHashList, uploadFile.name);
  };

  return (
    <Card
      title="文件切片上传"
      bordered={false}
      extra={
        <Button icon={<UploadOutlined />} onClick={handleUpload}>
          上传文件
        </Button>
      }
    >
      <Upload beforeUpload={uploadImage} onRemove={() => setUploadFile(null)} multiple={false}>
        <Button disabled={!!uploadFile} icon={<UploadOutlined />}>
          选择文件
        </Button>
      </Upload>
    </Card>
  );
};
export default FileCutUpload;
