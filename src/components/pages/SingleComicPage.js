import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMess from '../errorMess/errorMess';
import Spinner from '../spinner/spinner';


import './singleComicPage.scss';



const SingleComicPage = ()=>{

    const { loading, error, getComics, clearError } = useMarvelService();
    const{comicsID} = useParams();
    const[comic,setComic] = useState(null)

    useEffect(() => {
        updateComic();
    },[comicsID])
    

    const updateComic = () =>{
        clearError();
        getComics(comicsID)
            .then(onComicLoad)               
    }

    const onComicLoad = (comic) =>{   
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMess/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) && comic ? <View comic={comic}/> : null;

    return(
        <>
        {spinner}
        {errorMessage}
        {content}
        </>
    )

    
}

const View = ({comic}) => {

    const{ name, description, pages, price, thumbnail, language } = comic;

    return(
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div> 
    )
}

export default SingleComicPage;