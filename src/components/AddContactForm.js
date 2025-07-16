import React, { useState, useEffect } from 'react'; // useEffect を追加

// onRecordAdded と initialContact prop を受け取る
function AddContactForm({ onRecordAdded, initialContact }) {
    const [id, setId] = useState(null); // 編集対象のIDを保持
    const [lover, setLover] = useState('');
    const [contactDate, setContactDate] = useState(''); // YYYY-MM-DD 形式
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_test || 'http://localhost:8080'; // ローカル開発用にフォールバック

    // initialContact が変更されたときにフォームの値を更新する
    useEffect(() => {
        if (initialContact) {
            setId(initialContact.id);
            setLover(initialContact.lover);
            // LocalDateはそのままYYY-MM-DD形式で来ることを想定
            setContactDate(initialContact.contactDate);
            setMessage('');
            setIsError(false);
        } else {
            // 新規追加モードに戻る場合
            setId(null);
            setLover('');
            setContactDate('');
            setMessage('');
            setIsError(false);
        }
    }, [initialContact]); // initialContact が変更されたときにこの効果が再実行される

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!lover || !contactDate) {
            setMessage('恋人の名前と連絡日を両方入力してください。');
            setIsError(true);
            return;
        }

        try {
            const url = id ? `${API_BASE_URL}/updateContactLog/id/${id}` : '/insertContactLog'; // 更新か追加か
            const method = id ? 'PUT' : 'POST'; // 更新はPUT、追加はPOST

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, lover, contactDate }), // IDも送信（更新の場合）
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || (id ? '連絡記録の更新に失敗しました。' : '連絡記録の追加に失敗しました。'));
            }

            setMessage(id ? '連絡記録が正常に更新されました！' : '連絡記録が正常に追加されました！');
            setIsError(false);
            setLover('');
            setContactDate('');
            setId(null); // フォームを新規追加モードにリセット

            if (onRecordAdded) {
                onRecordAdded(); // リストの更新をトリガー
            }

        } catch (err) {
            console.error(id ? "連絡記録の更新エラー:" : "連絡記録の追加エラー:", err);
            setMessage(`エラー: ${err.message}`);
            setIsError(true);
        }
    };

    return (
        <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>{id ? '連絡記録を編集' : '新しい連絡記録を追加'}</h2> {/* タイトルを動的に変更 */}
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
                <button type="submit" style={buttonStyle}>{id ? '更新' : '記録を追加'}</button> {/* ボタンテキストを動的に変更 */}
                {id && ( // 編集モードの時だけキャンセルボタンを表示
                    <button type="button" onClick={() => setId(null)} style={cancelButtonStyle}>
                        キャンセル
                    </button>
                )}
            </form>
            {message && (
                <p style={{ color: isError ? 'red' : 'green', marginTop: '10px' }}>
                    {message}
                </p>
            )}
        </div>
    );
}

// スタイル定義（変更なし）
const inputStyle = {
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: 'calc(100% - 16px)',
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

const cancelButtonStyle = {
    padding: '10px 15px',
    backgroundColor: '#6c757d', // 灰色系の色
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '5px',
};

export default AddContactForm;