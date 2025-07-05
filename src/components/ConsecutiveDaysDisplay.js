import React, { useState, useEffect } from 'react';

function ConsecutiveDaysDisplay() {
    const [consecutiveDays, setConsecutiveDays] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsecutiveDays = async () => {
            try {
                const response = await fetch('/consecutive-days'); // プロキシ設定により http://localhost:8080/consecutive-days にアクセスします
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
                    {/* ここを強調するスタイルに変更します */}
                    <p style={{
                        fontSize: '2.5em',       // フォントサイズを大きく
                        fontWeight: 'bolder',    // さらに太字に
                        color: '#FF4500',        // 鮮やかなオレンジ色に
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)', // テキストシャドウを追加
                        animation: 'pulse 1.5s infinite', // アニメーションを追加（後でCSSを定義）
                        // 必要に応じて、背景色やボーダーも追加できます
                        // backgroundColor: '#ffe0b2', // 柔らかいオレンジの背景
                        // padding: '10px',
                        // borderRadius: '8px',
                    }}>
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