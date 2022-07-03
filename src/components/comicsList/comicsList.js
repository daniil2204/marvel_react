import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMess from '../errorMess/errorMess'
import './comicsList.scss';




const ComicsList = () => {

    const[comics, setComics] = useState([]);
    const[offset, setOffSet] = useState(0);
    const[newItemLoading, setNewItemLoading] = useState();
    const[comicsEnded, setComicsEnded] = useState(false);

    const{ loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    },[])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoad)
    }

    const onComicsLoad = (newcomics) => {
        let ended = false
        if (newcomics.lenght < 8) {
            ended = true
        }

        setComics([...comics , ...newcomics]);
        setNewItemLoading(newItemLoading => false);
        setOffSet(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    const renderComics = (arr) => {
        const comics = arr.map((comics,id) => {
            return(
                <li className='comics__item' 
                    key={comics.id}
                    tabIndex = {0}>
                    <Link to={`/comics/${comics.id}`}>
                        <img className='comics__item-img' src={comics.thumbnail} alt={comics.name}/>
                        <div className='comics__item-name'>{comics.name}</div>
                        <div className='comics__item-price'>{comics.price}</div>
                    </Link>
                </li>
            )
        })

        return(
            <ul className='comics__grid'>
                {comics}
            </ul>
        )
    }

    const content = renderComics(comics);
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMess/> : null;

    const loadButton = newItemLoading  ? <Spinner/> : 
        <button className="button button__main button__long" 
            onClick = {()=> onRequest(offset)}
            disabled = {newItemLoading}
            style = {{'display' : comicsEnded ? 'none' : 'block'}}>
            <div className="inner">load more</div>
        </button>;

    return(       
        <div className='comics__list'>
            <div className='center'>
                {spinner}
                {errorMessage}
            </div>
            {content}
            <div className='center'>
                {loadButton}
            </div>
        </div>
    )

}

export default ComicsList;