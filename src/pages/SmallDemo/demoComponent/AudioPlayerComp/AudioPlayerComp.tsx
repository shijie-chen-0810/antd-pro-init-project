import useSound from '@/hooks/useSound';
import { Button, Slider } from 'antd';

const audioUrl =
  'https://notice-log-test.oss-cn-hangzhou.aliyuncs.com/hotline/20230526/30051767374_30051767375.wav';
const AudioPlayerComp = () => {
  const { play, pause, isPlaying, duration, progress, changeProgress } = useSound(audioUrl);
  return (
    <div>
      <div>当前进度{progress}</div>
      <div>{isPlaying ? `总时长:${duration}` : '暂停中'}</div>
      <Button disabled={isPlaying} onClick={play}>
        play
      </Button>
      <Button disabled={!isPlaying} onClick={pause}>
        pause
      </Button>
      <Slider
        step={duration / 100}
        value={progress}
        max={duration}
        min={0}
        onChange={(value) => {
          console.log('change');
          changeProgress(value);
        }}
      />
    </div>
  );
};
export default AudioPlayerComp;
