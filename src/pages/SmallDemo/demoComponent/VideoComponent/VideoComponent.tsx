import { Button, Space } from 'antd';
import React, { useRef } from 'react';

const VideoComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let mediaStreamTrack: MediaStream;
  const start = () => {
    const video = videoRef.current as HTMLVideoElement;
    navigator.mediaDevices.getUserMedia({ video: { width: 200 } }).then((stream: MediaStream) => {
      video.srcObject = stream;
      video?.play();
      mediaStreamTrack = stream;
    });
  };
  const close = () => {
    mediaStreamTrack.getTracks()?.[0].stop();
  };
  return (
    <div>
      <Space>
        <Button onClick={start}>开启</Button>
        <Button onClick={close}>关闭</Button>
      </Space>
      <video ref={videoRef} style={{ opacity: 0.1 }} />
    </div>
  );
};

export default VideoComponent;
