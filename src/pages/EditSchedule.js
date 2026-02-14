import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditSchedule.css';

function EditSchedule() {
  const { id, day } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    day: day || '',
    startDate: '',
    endDate: '',
    内容: '',
    備考: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(!!id && !!day);

  useEffect(() => {
    if (day && !id) {
      setFormData(prev => ({ ...prev, day }));
    }
  }, [day, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        id: id || undefined
      };

      if (isEditMode) {
        await axios.put('/api/schedules', payload);
      } else {
        await axios.post('/api/schedules', payload);
      }

      navigate('/');
    } catch (err) {
      console.error('Error saving schedule:', err);
      setError('スケジュールの保存に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !day) {
      setError('削除するにはIDと日付が必要です');
      return;
    }

    if (!window.confirm('このスケジュールを削除しますか？')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`/api/schedules/${id}/${day}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting schedule:', err);
      setError('スケジュールの削除に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🌴 {isEditMode ? '日程を編集' : '新しい日程を追加'}</h1>
        <div className="trip-info">
          <button onClick={() => navigate(-1)} className="back-link">← 戻る</button>
        </div>
      </header>

      <main>
        <div className="edit-form-container">
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="day">日付 *</label>
              <input
                type="text"
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                placeholder="例: 20260606"
                required
                disabled={isEditMode}
              />
              <small>形式: YYYYMMDD (例: 20260606)</small>
            </div>

            <div className="form-group">
              <label htmlFor="startDate">開始時刻 *</label>
              <input
                type="text"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="例: 0800"
                required
              />
              <small>形式: HHMM (例: 0800 = 8:00)</small>
            </div>

            <div className="form-group">
              <label htmlFor="endDate">終了時刻 *</label>
              <input
                type="text"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="例: 1000"
                required
              />
              <small>形式: HHMM (例: 1000 = 10:00)</small>
            </div>

            <div className="form-group">
              <label htmlFor="内容">内容 *</label>
              <input
                type="text"
                id="内容"
                name="内容"
                value={formData.内容}
                onChange={handleChange}
                placeholder="例: リゾートで泳ぐ"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="備考">備考</label>
              <textarea
                id="備考"
                name="備考"
                value={formData.備考}
                onChange={handleChange}
                placeholder="例: この日程は省略可能"
                rows="3"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '保存中...' : '保存'}
              </button>
              {isEditMode && (
                <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={loading}>
                  削除
                </button>
              )}
              <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer>
        <p>Have a wonderful trip! 🌴✨</p>
      </footer>
    </div>
  );
}

export default EditSchedule;
