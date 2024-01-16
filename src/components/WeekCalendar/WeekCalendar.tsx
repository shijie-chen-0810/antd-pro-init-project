import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import style from './WeekCalendar.less';
import type { Moment } from 'moment';
import moment from 'moment';
import cs from 'classnames';
import React, { useState } from 'react';

const weekToChinese = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
};

const getPreWeeks: (pre: number, lastDay: Moment) => Moment[] = (pre = 0, lastDay) => {
  return Array.from({ length: 7 }, (_, index) => {
    // 需要复制一份不然subtract会修改原数据
    const date = moment(lastDay);
    return date.subtract(pre * 7 + index, 'days');
  }).reverse();
};

type Props = {
  lastDay: Moment;
  onChange?: (date: Moment) => void;
};

const WeekCalendar: React.FC<Props> = ({ lastDay, onChange }) => {
  const [preWeekNum, setPreWeekNum] = useState<number>(0);
  const [selectDate, setSelectDate] = useState<Moment>(lastDay);
  const curWeeks = getPreWeeks(preWeekNum, lastDay);
  const disableNextBtn = curWeeks.at(-1)?.isSame(lastDay, 'day');
  const hideNowBtn = curWeeks.find((item) => item.isSame(lastDay, 'day'));
  const handleMonthChange = (type: 'pre' | 'next') => {
    if (type === 'pre') {
      setPreWeekNum(preWeekNum + 4);
    }
    if (type === 'next') {
      const num = preWeekNum - 4;
      setPreWeekNum(num < 0 ? 0 : num);
    }
  };
  const handleSelectChange = (date: Moment) => {
    setSelectDate(date);
    onChange?.(date);
  };
  const comeToToday = () => {
    handleSelectChange(lastDay);
    setPreWeekNum(0);
  };
  return (
    <div className={style['calendar-container']}>
      <div className={style['month-contianer']}>
        <div className={style['month-contianer-btn']}>
          <LeftOutlined onClick={() => handleMonthChange('pre')} />
        </div>
        <div>{curWeeks.at(3)?.format('YYYY-MM')}</div>
        <div className={style['month-contianer-btn']}>
          <RightOutlined
            style={{
              color: disableNextBtn ? '#d1d1d1' : '',
              cursor: disableNextBtn ? 'not-allowed' : 'pointer',
            }}
            onClick={() => !disableNextBtn && handleMonthChange('next')}
          />
        </div>
      </div>
      <div className={style['week-contianer']}>
        <div className={style['week-contianer-btn']}>
          <span onClick={() => setPreWeekNum(preWeekNum + 1)}>
            <LeftOutlined />
            上一周
          </span>
        </div>
        <div className={style['week-content']}>
          {curWeeks.map((item) => (
            <div className={style['week-item']} key={item.format('YYYY-MM-DD')}>
              <div className={style['item-week']}>{weekToChinese[item.isoWeekday()]}</div>
              <div
                onClick={() => handleSelectChange(item)}
                className={cs({
                  [style['item-date']]: true,
                  [style['item-select']]: selectDate.isSame(item, 'day'),
                })}
                style={{ color: curWeeks.at(3)?.month() === item.month() ? '' : '#d1d1d1' }}
              >
                {lastDay.isSame(item, 'day') ? '今' : item.format('D')}
              </div>
            </div>
          ))}
        </div>
        <div className={style['week-contianer-btn']}>
          <span
            style={{
              color: disableNextBtn ? '#d1d1d1' : '',
              cursor: disableNextBtn ? 'not-allowed' : 'pointer',
            }}
            onClick={() => !disableNextBtn && setPreWeekNum(preWeekNum - 1)}
          >
            下一周
            <RightOutlined />
          </span>
        </div>
      </div>
      {hideNowBtn ? null : (
        <div className={style['calendar-now']} onClick={comeToToday}>
          回到今日
        </div>
      )}
      <div className={style['calendar-show-now']}>
        已选择:<span>{selectDate.format('YYYY-MM-DD')}</span>
      </div>
    </div>
  );
};
export default WeekCalendar;
