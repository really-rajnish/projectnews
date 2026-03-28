import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import './index.css';

const Home = lazy(() => import('./pages/Home'));
const CategoryView = lazy(() => import('./pages/CategoryView'));
const ArticleReader = lazy(() => import('./pages/ArticleReader'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<Loader message="Loading page..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<CategoryView />} />
              <Route path="/article/:articleId" element={<ArticleReader />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;