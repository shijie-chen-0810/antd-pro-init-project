import useSound from '@/hooks/useSound';
import { Button, Slider } from 'antd';

const audioUrl = 'https://samplelib.com/lib/preview/wav/sample-15s.wav';
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
