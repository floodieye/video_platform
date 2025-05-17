import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function UploadVideo() {
  // Состояния компонента
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Получаем токен из контекста аутентификации
  const { token } = useContext(AuthContext);
  const history = useHistory();

  // Обработчики изменений в полях формы
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Проверка и установка видеофайла
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setError('');
    } else {
      setError('Пожалуйста, выберите видео файл (MP4, MOV, AVI и т.д.)');
      setVideoFile(null);
    }
  };

  // Проверка и установка изображения превью
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
    } else {
      setThumbnailFile(null);
    }
  };

  // Отправка данных на сервер
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    if (!title.trim()) {
      setError('Введите название видео');
      return;
    }
    
    if (!videoFile) {
      setError('Выберите видео для загрузки');
      return;
    }

    // Подготовка данных для отправки
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);
    
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }

    try {
      // Начало загрузки
      setIsUploading(true);
      setError('');
      setSuccess('');
      setUploadProgress(0);

      // Отправка на сервер
      const response = await axios.post('/api/videos', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        // Отслеживание прогресса загрузки
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        }
      });

      // Успешная загрузка
      setSuccess('Видео успешно загружено!');
      
      // Перенаправление на страницу просмотра через 2 секунды
      setTimeout(() => {
        history.push(`/videos/${response.data.id}`);
      }, 2000);

    } catch (err) {
      // Обработка ошибок
      console.error('Ошибка загрузки видео:', err);
      setError(err.response?.data?.message || 'Произошла ошибка при загрузке видео');
    } finally {
      setIsUploading(false);
    }
  };

  // Рендер компонента
  return (
    <div className="upload-container">
      <h2>Загрузить новое видео</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название видео *</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Введите название видео"
            required
          />
        </div>

        <div className="form-group">
          <label>Описание</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Добавьте описание видео"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Видео файл *</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
          <small>Поддерживаемые форматы: MP4, MOV, AVI</small>
        </div>

        <div className="form-group">
          <label>Превью (изображение)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          <small>Рекомендуемый размер: 1280x720px</small>
        </div>

        {isUploading && (
          <div className="progress-bar">
            <div style={{ width: `${uploadProgress}%` }}></div>
            <span>{uploadProgress}%</span>
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isUploading}
        >
          {isUploading ? 'Загрузка...' : 'Загрузить видео'}
        </button>
      </form>
    </div>
  );
}

export default UploadVideo;