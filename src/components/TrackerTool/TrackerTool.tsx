import React from 'react';
import { TRACKERCLICK, TRACKERCLICK1, TRACKERDOUBLECLICK1 } from './TrackerFCName';
import type { ReactElement } from 'react';

type TrackerClickProps = {
  trackerEvents: TrackerEvent[];
  children: ReactElement | ReactElement[];
};
type TrackerEvent = {
  // 需要绑定的react的事件
  reactEvent: string;
  // 触发上述react事件后需要执行的埋点函数
  trackerEvent: string;
  // 传递给埋点函数的参数
  data?: any;
};
type TrackerFCObject = BaseObject<(params: Pick<TrackerEvent, 'data'>) => void>;

const isValidElement = (object: any) => {
  return (
    typeof object === 'object' && object !== null && object.$$typeof === Symbol.for('react.element')
  );
};

const TrackerClick: React.FC<TrackerClickProps> = (props) => {
  const { children, trackerEvents } = props;

  // 埋点逻辑函数
  const trackerHandle: TrackerFCObject = {
    [TRACKERCLICK]: (data) => {
      console.log(data, 'trackerClick');
    },
    [TRACKERCLICK1]: (data) => {
      console.log(data, 'trackerClick1');
    },
    [TRACKERDOUBLECLICK1]: (data) => {
      console.log(data, 'trackerDoubleClick');
    },
  };
  /**
   *
   * @param trackerFC 埋点函数
   * @param needAddTracker 需要添加的埋点事件数组
   * @returns 返回一个reactNode
   */
  const addTrack = (trackerFC: TrackerFCObject, needAddTracker: TrackerEvent[]) => {
    // 对每个子节点做埋点处理
    return React.Children.map(children, (child: ReactElement) => {
      const isValid = isValidElement(child);
      if (isValid) {
        const trackedObject = {};
        needAddTracker.forEach((oneTracker) => {
          trackedObject[oneTracker.reactEvent] = (e: any) => {
            // 获取子节点的原本绑定的react事件并且执行
            const originEvent = child.props[oneTracker.reactEvent];
            if (typeof originEvent === 'function') {
              originEvent.call(child, e);
            }
            // 执行埋点函数
            trackerFC[oneTracker.trackerEvent]?.(oneTracker.data);
          };
        });
        return React.cloneElement(child, {
          ...child.props,
          ...trackedObject,
        });
      }
      return child;
    });
  };
  const _children = addTrack(trackerHandle, trackerEvents);
  return <div>{_children}</div>;
};
export default TrackerClick;
