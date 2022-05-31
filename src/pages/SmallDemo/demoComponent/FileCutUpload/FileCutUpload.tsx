import { uploadCutFile, mergeCutFile, verifyFile } from '@/services/smallDemo';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, message, Upload } from 'antd';
import { useRef, useState } from 'react';

const SIZE = 200 * 1024;

const FileCutUpload = () => {
  const webWorkRef = useRef<Worker | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>();
  const uploadImage = async (target: File) => {
    console.log(target);
    setUploadFile(target);
  };
  const mergeRequest = async (fileName: string, fileHash: string) => {
    await mergeCutFile({ fileName, fileHash, size: SIZE });
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
  const uploadChunks = (
    fileChunkHashList: {
      chunk: Blob;
      fileHash: string;
      hash: string;
    }[],
    fileName: string,
  ) => {
    const requestList = fileChunkHashList
      .map(({ chunk, fileHash, hash }) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('fileHash', fileHash);
        formData.append('filename', fileName);
        return { formData };
      })
      .map(({ formData }) => uploadCutFile(formData));
    // 并发请求
    return Promise.all(requestList);
  };

  // 生成文件 hash（web-worker）
  const calculateHash = (
    fileChunkList: {
      file: Blob;
    }[],
  ) => {
    return new Promise((resolve) => {
      // 添加 worker 属性
      webWorkRef.current = new Worker('/hash.js');
      webWorkRef.current.postMessage({ fileChunkList });
      webWorkRef.current.onmessage = (e) => {
        const { hash } = e.data;
        if (hash) {
          resolve(hash);
        }
      };
    });
  };

  // 上传文件
  const handleUpload = async () => {
    if (!uploadFile) return;
    const fileChunkList = createFileChunk(uploadFile);
    const fileHash = (await calculateHash(fileChunkList)) as string;
    const fileChunkHashList = fileChunkList.map(({ file }, index) => ({
      fileHash,
      chunk: file,
      // 文件名 + 数组下标 为后续拼接做准备
      hash: uploadFile.name + '-' + index,
    }));
    const { result } = await verifyFile({ fileHash });
    if (result) {
      return message.success('上传成功');
    }
    await uploadChunks(fileChunkHashList, uploadFile.name);
    // 合并切片
    await mergeRequest(uploadFile.name, fileHash);
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
