import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import { ArticlesProvider } from './context/ArticlesContext';

const App = () => (
  <ArticlesProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  </ArticlesProvider>
);

export default App;
