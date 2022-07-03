import { useState } from 'react';

import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import ErrorBoundary from '../errorBoundary/errorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    
    const[selectedChar , setChar] = useState(null);

    const charSelected = (id) => {
        setChar(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } 

    return(
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList charSelected = {charSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId = {selectedChar}/>
                </ErrorBoundary> 
            </div>
            <img alt = 'decoration' className="bg-decoration" src={decoration}/>
        </>
    )
}

export default MainPage;