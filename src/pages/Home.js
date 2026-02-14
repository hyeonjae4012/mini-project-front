import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

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

function Home() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/schedules');
      setSchedules(response.data.items || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching schedules:', err);
      setError('スケジュールの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const groupSchedulesByDay = (schedules) => {
    const grouped = {};
    schedules.forEach(schedule => {
      const day = schedule.day;
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(schedule);
    });
    // 日付順にソート
    return Object.keys(grouped).sort().reduce((acc, key) => {
      acc[key] = grouped[key].sort((a, b) => {
        const timeA = a.startDate || '0000';
        const timeB = b.startDate || '0000';
        return timeA.localeCompare(timeB);
      });
      return acc;
    }, {});
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

  const groupedSchedules = groupSchedulesByDay(schedules);
  const days = Object.keys(groupedSchedules).sort();

  return (
    <div className="container">
      <header>
        <h1>🌴 セブ島旅行計画</h1>
        <div className="trip-info">
          <span className="date-range">2026年6月6日 〜 6月9日</span>
          <span className="location">📍 セブ島, フィリピン</span>
        </div>
      </header>

      <main>
        <div className="days-container">
          {days.map(day => (
            <div key={day} className="day-card">
              <div className="day-header">
                <h2>{DAY_LABELS[day] || day}</h2>
                <div className="day-actions">
                  <Link to={`/day/${day}`} className="btn btn-view">詳細を見る</Link>
                  <Link to={`/edit/${day}`} className="btn btn-edit">編集</Link>
                </div>
              </div>
              <div className="hotel-badge">
                {HOTELS[day] || 'ホテル情報なし'}
              </div>
              <div className="schedule">
                {groupedSchedules[day].map((schedule, index) => (
                  <div key={schedule.id || index} className="schedule-item">
                    <span className="time">
                      {formatTime(schedule.startDate)} - {formatTime(schedule.endDate)}
                    </span>
                    <div className="activity">
                      <strong>{schedule.内容 || '内容なし'}</strong>
                      {schedule.備考 && <p className="note">{schedule.備考}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hotels-section">
          <h2>宿泊ホテル情報</h2>
          <div className="hotels-grid">
            <div className="hotel-card">
              <h3>Tambuli Seaside Resort and Spa</h3>
              <p className="hotel-dates">6月6日 〜 6月7日</p>
              <p className="hotel-address">Buyong Road, Maribago, Lapu-lapu City, Cebu, Philippines</p>
              <a href="https://tambuliseasideresortandspa.com/" target="_blank" rel="noopener noreferrer" className="hotel-link">ホテルサイト →</a>
            </div>
            <div className="hotel-card">
              <h3>Sheraton Cebu Mactan Resort</h3>
              <p className="hotel-dates">6月7日 〜 6月9日</p>
              <p className="hotel-address">Punta Engaño Road, Mactan Island, Cebu, Philippines</p>
              <a href="https://www.marriott.com/en-us/hotels/cebsi-sheraton-cebu-mactan-resort/overview/" target="_blank" rel="noopener noreferrer" className="hotel-link">ホテルサイト →</a>
            </div>
          </div>
        </div>

        <div className="add-schedule-section">
          <Link to="/edit" className="btn btn-primary">新しい日程を追加</Link>
        </div>
      </main>

      <footer>
        <p>Have a wonderful trip! 🌴✨</p>
      </footer>
    </div>
  );
}

export default Home;
