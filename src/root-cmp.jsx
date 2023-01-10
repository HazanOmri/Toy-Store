import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';

import About from './pages/about.jsx';
import HomePage from './pages/home-page.jsx';
import { ToyIndex } from './pages/toy-index.jsx';
import { AppHeader } from './cmps/app-header.jsx';
import { ToyDetails } from './cmps/toy-details.jsx';
import { ToyEdit } from './cmps/toy-edit.jsx';

import './assets/main.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section>
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={< About />} path="/about" />
              <Route element={< ToyIndex />} path="/toy" />
              <Route element={< ToyDetails />} path="/toy/:toyId" />
              <Route element={< ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={< ToyEdit />} path="/toy/edit" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

export default App;
