import React, { useState } from 'react';

function AddContactForm({ onRecordAdded }) {
    const [lover, setLover] = useState('');
    const [contactDate, setContactDate] = useState(''); // YYYY-MM-DD 形式
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

        // 入力チェック
        if (!lover || !contactDate) {
            setMessage('恋人の名前と連絡日を両方入力してください。');
            setIsError(true);
            return;
        }

        try {
            const response = await fetch('/insertContactLog', { // POST /insertContactLog エンドポイント
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lover, contactDate }), // 送信するデータ
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '連絡記録の追加に失敗しました。');
            }

            setMessage('連絡記録が正常に追加されました！');
            setIsError(false);
            setLover(''); // フォームをリセット
            setContactDate(''); // フォームをリセット

            // 親コンポーネントに通知してリストを更新させる
            if (onRecordAdded) {
                onRecordAdded();
            }

        } catch (err) {
            console.error("連絡記録の追加エラー:", err);
            setMessage(`エラー: ${err.message}`);
            setIsError(true);
        }
    };

    return (
        <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>新しい連絡記録を追加</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <label>
                    恋人の名前:
                    <input
                        type="text"
                        value={lover}
                        onChange={(e) => setLover(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </label>
                <label>
                    連絡日:
                    <input
                        type="date"
                        value={contactDate}
                        onChange={(e) => setContactDate(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </label>
                <button type="submit" style={buttonStyle}>記録を追加</button>
            </form>
            {message && (
                <p style={{ color: isError ? 'red' : 'green', marginTop: '10px' }}>
                    {message}
                </p>
            )}
        </div>
    );
}

// スタイル定義
const inputStyle = {
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: 'calc(100% - 16px)', // パディングを考慮
};

const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
};

export default AddContactForm;