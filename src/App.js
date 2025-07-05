import React from 'react';
import ConsecutiveDaysDisplay from './components/ConsecutiveDaysDisplay';
import './App.css'; // スタイルファイルもそのまま利用

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>うちらのメモリー🤝</h1>
      </header>
      <main>
        <ConsecutiveDaysDisplay />
        {/* ここに、他の連絡履歴表示や追加・編集フォームなどのコンポーネントを追加していきます */}
      </main>
    </div>
  );
}

export default App;