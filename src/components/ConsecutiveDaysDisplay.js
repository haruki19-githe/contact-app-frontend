import React, { useState, useEffect } from 'react';

function ConsecutiveDaysDisplay() {
    const [consecutiveDays, setConsecutiveDays] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsecutiveDays = async () => {
            try {
                // プロキシ設定により http://localhost:8080/consecutive-days にアクセスします
                const response = await fetch('/consecutive-days');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || '連続日数の取得に失敗しました');
                }
                const data = await response.json();
                setConsecutiveDays(data.consecutiveDays);
                setMessage(data.message);
            } catch (err) {
                console.error("連続日数の取得エラー:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConsecutiveDays();
    }, []);

    if (loading) {
        return <p>読み込み中...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>エラー: {error}</p>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>現在の連続連絡日数</h1>
            {consecutiveDays !== null ? (
                <div>
                    <p style={{ fontSize: '3em', fontWeight: 'bold', color: '#4CAF50' }}>
                        {consecutiveDays} 日
                    </p>
                    <p style={{ fontSize: '1.2em', color: '#555' }}>
                        {message}
                    </p>
                </div>
            ) : (
                <p>連続日数を取得できませんでした。</p>
            )}
        </div>
    );
}

export default ConsecutiveDaysDisplay;