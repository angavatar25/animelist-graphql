import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient/client';

import AnimeList from './pages/AnimeList';
import AnimeDetail from './pages/AnimeDetail';
import { ParentContainer } from './style/GeneralStyle';
import AnimeCollection from './pages/AnimeCollection';
import AnimeCollectionDetail from './pages/AnimeCollectionDetail';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ParentContainer>
        <Router>
          <Routes>
            <Route path='/' element={<AnimeList/>}/>
            <Route path='/anime-detail' element={<AnimeDetail/>}/>
            <Route path='/anime-collections' element={<AnimeCollection/>}/>
            <Route path='/anime-collection/detail' element={<AnimeCollectionDetail/>}/>
          </Routes>
        </Router>
      </ParentContainer>
    </ApolloProvider>
  );
}

export default App;
