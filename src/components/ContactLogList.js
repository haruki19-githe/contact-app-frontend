import React, { useState, useEffect } from 'react';

function ContactLogList() {
    const [contactLogs, setContactLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContactLogs = async () => {
            try {
                // GET /ContactLogList エンドポイントからデータを取得
                const response = await fetch('/ContactLogList');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setContactLogs(data);
            } catch (err) {
                console.error("連絡記録の取得エラー:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContactLogs();
    }, []); // 空の依存配列は、コンポーネントがマウントされた時に一度だけ実行されることを意味します

    if (loading) {
        return <p>連絡記録を読み込み中...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>エラー: {error}</p>;
    }

    if (contactLogs.length === 0) {
        return <p>まだ連絡記録がありません。</p>;
    }

    return (
        <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>連絡記録一覧</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={tableHeaderStyle}>ID</th>
                        <th style={tableHeaderStyle}>恋人の名前</th>
                        <th style={tableHeaderStyle}>連絡日</th>
                        <th style={tableHeaderStyle}>作成日時</th>
                        <th style={tableHeaderStyle}>更新日時</th>
                    </tr>
                </thead>
                <tbody>
                    {contactLogs.map((log) => (
                        <tr key={log.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={tableCellStyle}>{log.id}</td>
                            <td style={tableCellStyle}>{log.lover}</td> {/* */}
                            <td style={tableCellStyle}>{log.contactDate}</td> {/* */}
                            <td style={tableCellStyle}>{log.createdAt}</td> {/* */}
                            <td style={tableCellStyle}>{log.updatedAt}</td> {/* */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// スタイル定義
const tableHeaderStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

const tableCellStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

export default ContactLogList;