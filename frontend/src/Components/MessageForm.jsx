import { useState } from 'react';

const MessageForm = ({ activeChannelId, onSend }) => {
  const [message, setMessage] = useState('');

  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите новое сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value={message}
            onSubmit={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-group-vertical" disabled>
            <i className="bi bi-arrow-return-left" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
