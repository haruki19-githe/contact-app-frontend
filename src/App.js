import React, { useState } from 'react'; // useState を追加
import ConsecutiveDaysDisplay from './components/ConsecutiveDaysDisplay';
import ContactLogList from './components/ContactLogList';
import AddContactForm from './components/AddContactForm'; // この行を追加
import './App.css';

function App() {
  const [listKey, setListKey] = useState(0); // リスト更新用のstate

  // 連絡記録が追加されたときにリストを更新するためのハンドラ
  const handleRecordAdded = () => {
    setListKey(prevKey => prevKey + 1); // key を変更して ContactLogList を再レンダリング
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>うちらのメモリー🤝</h1>
      </header>
      <main>
        <ConsecutiveDaysDisplay />
        <hr style={{ margin: '30px 0' }} />

        <AddContactForm onRecordAdded={handleRecordAdded} /> {/* この行を追加し、ハンドラを渡す */}
        <hr style={{ margin: '30px 0' }} />

        <ContactLogList key={listKey} /> {/* key を渡す */}
      </main>
    </div>
  );
}

export default App;