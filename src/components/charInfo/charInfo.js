import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMess from '../errorMess/errorMess'
import Skeleton from '../skeleton/skeleton'

import './charInfo.scss';


const CharInfo = (props) => {

    const[char, setChar] = useState(null);
    


    const { loading, error, getChar, clearError } = useMarvelService();


    useEffect(() => {
        updateChar();
    },[props.charId])
    

    const updateChar = () =>{
        clearError();
        const {charId} = props;
        if (!charId) {
            return;
        }

        getChar(charId)
            .then(onCharLoad)               
    }

    const onCharLoad = (char) =>{   
        if (char.description.length > 100) {
            char.description = char.description.slice(0,100) + "..."
        }
        setChar(char);
        console.log(char)
    }



        
    const skeleton = char || loading || error ? null : <Skeleton/>;

    const errorMessage = error ? <ErrorMess/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) && char ? <View char={char}/> : null;
        

    return(
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) =>{
    const{name , description , thumbnail , homepage , wiki , comics} = char;
    
    
    let listItem = ''
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        listItem = ' NotFound'
    }
    
    
    return(
        <>
            <div className="char__basics">
                        <img src={thumbnail} alt={name} className={listItem}/>
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {description}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comics.length > 1 ? null : 'Отсутствуют комиксы'}
                        {
                            comics.map((item , i) => {
                                // eslint-disable-next-line
                                if (i > 9) {
                                    return;     
                                }
                                let itemID = item.resourceURI.slice(43)
                                return(
                                    <Link key={itemID} to={`/comics/${itemID}`} className="char__comics-link"> 
                                        <li className="char__comics-item">
                                            {item.name}
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
        </>
    )
}

export default CharInfo;