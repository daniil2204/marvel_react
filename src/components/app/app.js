import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/appHeader';
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages'

const App = () => {

    return(
        <div className = "app"> 
            <Router>
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicsID" element={<SingleComicPage/>}/>
                        <Route path='*' element={<Page404/>}/>
                    </Routes>
                </main>
            </Router>
        </div>
        )   
}

export default App;