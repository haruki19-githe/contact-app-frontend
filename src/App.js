import React, { useState } from 'react';
import ConsecutiveDaysDisplay from './components/ConsecutiveDaysDisplay';
import ContactLogList from './components/ContactLogList';
import AddContactForm from './components/AddContactForm';
import './App.css';

function App() {
  const [listKey, setListKey] = useState(0); // リスト更新用のstate
  const [editingContact, setEditingContact] = useState(null); // 編集中の連絡記録を保持するstate
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080'; // ローカル開発用にフォールバック


// API_BASE_URL を使用してバックエンドにリクエストを送信
  // 連絡記録が追加/更新されたときにリストを更新するためのハンドラ
  const handleRecordAddedOrUpdated = () => {
    setListKey(prevKey => prevKey + 1); // key を変更して ContactLogList を再レンダリング
    setEditingContact(null); // フォームを新規追加モードに戻す
  };

  // 連絡記録を編集するためのハンドラ
  const handleEditContact = (contact) => {
    setEditingContact(contact); // 編集対象の連絡記録をセット
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>うちらのメモリー🤝</h1>
      </header>
      <main>
        <ConsecutiveDaysDisplay />
        <hr style={{ margin: '30px 0' }} />

        {/* onRecordAdded を onRecordAddedOrUpdated に変更し、initialContact を渡す */}
        <AddContactForm
            onRecordAdded={handleRecordAddedOrUpdated}
            initialContact={editingContact}
        />
        {/* 編集モードをキャンセルするためのボタン（フォームの外に置く場合）
        {editingContact && (
            <button onClick={() => setEditingContact(null)} style={{margin: '10px 20px'}}>
                編集キャンセル
            </button>
        )}
        */}
        <hr style={{ margin: '30px 0' }} />

        {/* onEditRecord を追加 */}
        <ContactLogList
            key={listKey}
            onEditRecord={handleEditContact}
        />
      </main>
    </div>
  );
}

export default App;