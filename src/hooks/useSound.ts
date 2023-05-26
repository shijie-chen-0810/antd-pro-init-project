import { useEffect, useRef, useState } from 'react';

const useSound = (url: string) => {
  const [audioEle, setAudioEle] = useState<HTMLAudioElement>();
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timer>();
  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioEle) {
        if (audioEle.ended) {
          setIsPlaying(false);
          setProgress(0);
          clearInterval(intervalRef.current);
        } else {
          setProgress(audioEle.currentTime);
        }
      }
    }, 1000);
  };

  const play = () => {
    setIsPlaying(true);
    audioEle?.play();
    startTimer();
  };
  const pause = () => {
    setIsPlaying(false);
    audioEle?.pause();
    clearInterval(intervalRef.current);
  };

  const changeProgress = (_value: number) => {
    let value: number = _value;
    if (_value > duration) {
      value = duration;
    }
    if (_value < 0) {
      value = 0;
    }
    // Clear any timers already running
    clearInterval(intervalRef.current);
    if (audioEle) {
      audioEle.currentTime = value;
      setProgress(value);
      if (!isPlaying) {
        play();
      } else {
        startTimer();
      }
    }
  };

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = false;
    const audioLoaded = () => {
      setAudioEle(audio);
      setDuration(audio.duration);
    };
    audio.addEventListener('loadeddata', audioLoaded);
    return () => {
      audio.removeEventListener('loadeddata', audioLoaded);
      clearInterval(intervalRef.current);
    };
  }, [url]);

  return { play, pause, isPlaying, duration, progress, changeProgress };
};
export default useSound;
