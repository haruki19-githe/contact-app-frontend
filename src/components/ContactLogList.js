import React, { useState, useEffect } from 'react';

// onEditRecord propを追加
function ContactLogList({ onEditRecord }) {
    const [contactLogs, setContactLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // APIからデータを取得する関数を独立させる
    const fetchContactLogs = async () => {
        try {
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

    useEffect(() => {
        fetchContactLogs();
    }, []);

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
                        <th style={tableHeaderStyle}>操作</th> {/* この行を追加 */}
                    </tr>
                </thead>
                <tbody>
                    {contactLogs.map((log) => (
                        <tr key={log.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={tableCellStyle}>{log.id}</td>
                            <td style={tableCellStyle}>{log.lover}</td>
                            <td style={tableCellStyle}>{log.contactDate}</td>
                            <td style={tableCellStyle}>{log.createdAt}</td>
                            <td style={tableCellStyle}>{log.updatedAt}</td>
                            <td style={tableCellStyle}>
                                {/* 編集ボタンを追加 */}
                                <button
                                    onClick={() => onEditRecord(log)} // ボタンクリックでonEditRecordを呼び出す
                                    style={editButtonStyle}
                                >
                                    編集
                                </button>
                            </td> {/* この行を追加 */}
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

const editButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#ffc107', // 黄色系の色
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
};

export default ContactLogList;