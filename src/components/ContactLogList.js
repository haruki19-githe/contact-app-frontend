import React, { useState, useEffect } from 'react';

// onEditRecord に加えて onDeleteRecord prop を追加
function ContactLogList({ onEditRecord, onDeleteRecord }) {
    const [contactLogs, setContactLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // APIからデータを取得する関数を独立させる
    // この関数は、データが追加/更新/削除された後に再実行されるようにします
    const fetchContactLogs = async () => {
        try {
            const response = await fetch('${API_BASE_URL}/ContactLogList');
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

    // コンポーネントがマウントされた時、または onRecordAddedOrDeleted のトリガーでリストを更新
    useEffect(() => {
        fetchContactLogs();
    }, [onDeleteRecord]); // onDeleteRecord が変更された時にも再フェッチする（App.jsからのトリガー用）

    // 削除処理のハンドラ
    const handleDelete = async (id) => {
        if (window.confirm('この連絡記録を本当に削除しますか？')) { // 確認ダイアログ
            try {
                const response = await fetch(`${API_BASE_URL}/deleteContactLog/id/${id}`, { // DELETE /deleteContactLog/id/{id} エンドポイント
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || '連絡記録の削除に失敗しました。');
                }

                // 削除成功後、リストを再取得して表示を更新
                // onRecordAddedOrDeleted を親に通知してもよいが、今回は内部で再フェッチ
                fetchContactLogs();
                if (onDeleteRecord) { // App.js に通知 (今回は使用しないが汎用的に残す)
                    onDeleteRecord();
                }

            } catch (err) {
                console.error("連絡記録の削除エラー:", err);
                alert(`削除エラー: ${err.message}`); // ユーザーにエラーを通知
            }
        }
    };


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
                        <th style={tableHeaderStyle}>操作</th>
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
                                <button
                                    onClick={() => onEditRecord(log)}
                                    style={editButtonStyle}
                                >
                                    編集
                                </button>
                                <button
                                    onClick={() => handleDelete(log.id)} // 削除ボタンを追加
                                    style={deleteButtonStyle}
                                >
                                    削除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// スタイル定義（deleteButtonStyle を追加）
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
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
};

const deleteButtonStyle = { // 新しいスタイル
    padding: '5px 10px',
    backgroundColor: '#dc3545', // 赤系の色
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default ContactLogList;