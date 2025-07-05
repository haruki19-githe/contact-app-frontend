import React from 'react';
import ConsecutiveDaysDisplay from './components/ConsecutiveDaysDisplay';
import ContactLogList from './components/ContactLogList'; // この行を追加
import './App.css'; // スタイルファイルもそのまま利用

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>うちらのメモリー🤝</h1>
      </header>
      <main>
        <ConsecutiveDaysDisplay />
        <hr style={{ margin: '30px 0' }} /> {/* 区切り線を追加 */}
                <ContactLogList /> {/* この行を追加 */}
      </main>
    </div>
  );
}

export default App;