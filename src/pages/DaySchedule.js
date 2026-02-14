import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './DaySchedule.css';

const HOTELS = {
  '20260606': 'Tambuli Seaside Resort and Spa',
  '20260607': 'Tambuli Seaside Resort and Spa / Sheraton Cebu Mactan Resort',
  '20260608': 'Sheraton Cebu Mactan Resort',
  '20260609': 'Sheraton Cebu Mactan Resort'
};

const DAY_LABELS = {
  '20260606': '6月6日 (木)',
  '20260607': '6月7日 (金)',
  '20260608': '6月8日 (土)',
  '20260609': '6月9日 (日)'
};

function DaySchedule() {
  const { day } = useParams();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (day) {
      fetchSchedules(day);
    }
  }, [day]);

  const fetchSchedules = async (dayParam) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/schedules/${dayParam}`);
      setSchedules(response.data.items || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching schedules:', err);
      setError('スケジュールの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    if (time.length === 4) {
      return `${time.substring(0, 2)}:${time.substring(2, 4)}`;
    }
    return time;
  };

  if (loading) {
    return <div className="loading">読み込み中...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const sortedSchedules = [...schedules].sort((a, b) => {
    const timeA = a.startDate || '0000';
    const timeB = b.startDate || '0000';
    return timeA.localeCompare(timeB);
  });

  return (
    <div className="container">
      <header>
        <h1>🌴 {DAY_LABELS[day] || day} の日程</h1>
        <div className="trip-info">
          <Link to="/" className="back-link">← ホームに戻る</Link>
        </div>
      </header>

      <main>
        <div className="day-detail-card">
          <div className="day-header">
            <h2>{DAY_LABELS[day] || day}</h2>
            <Link to={`/edit/${day}`} className="btn btn-edit">編集</Link>
          </div>
          <div className="hotel-badge">
            {HOTELS[day] || 'ホテル情報なし'}
          </div>
          <div className="schedule">
            {sortedSchedules.length === 0 ? (
              <p className="no-schedule">この日のスケジュールはまだ登録されていません。</p>
            ) : (
              sortedSchedules.map((schedule, index) => (
                <div key={schedule.id || index} className="schedule-item">
                  <span className="time">
                    {formatTime(schedule.startDate)} - {formatTime(schedule.endDate)}
                  </span>
                  <div className="activity">
                    <strong>{schedule.内容 || '内容なし'}</strong>
                    {schedule.備考 && <p className="note">{schedule.備考}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer>
        <p>Have a wonderful trip! 🌴✨</p>
      </footer>
    </div>
  );
}

export default DaySchedule;
