import { useState, useEffect, useRef } from 'react';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMess from '../errorMess/errorMess'
import './charList.scss';


const CharList = (props) => {
    
    const[chars, setChars] = useState([]);
    const[offset, setOffset] = useState(230);
    const[newItemLoading, setNewItemLoading] = useState(true);
    const[charEnded, setCharEnded] = useState(false);
    

    

    const { loading, error, getAllChar } = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
    },[])
  

    const onRequest = (offset, initial )=>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllChar(offset)
            .then(onCharLoad)
    }
    


    const onCharLoad = (newchars) =>{ 
        let ended = false;
        if (newchars.length < 9) {
            ended = true
        }
             
        setChars(chars => [...chars , ...newchars]);
        setOffset(offset => offset + 9);
        setNewItemLoading(newItemLoading => false);
        setCharEnded(charEnded => ended);

    }



    
    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('selected'));
        itemRefs.current[id].classList.add('selected');
        itemRefs.current[id].focus();
    }

       
    const renderItems = (arr)=>{  
        const items = arr.map((item, id) =>{
            let listItem = ``
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                listItem = ' NotFound'
            }


            return(
                <li className= "char__item"
                key={item.id}
                ref={el => itemRefs.current[id] = el}
                tabIndex = {0}
                onClick={() => 
                        {      
                            focusOnItem(id);                      
                            props.charSelected(item.id)  
                        }
                    }>
                    <img src= {item.thumbnail} alt="abyss" className={listItem} />
                    <div className="char__name">{item.name}</div>
                </li>
                )
            }) 
        return (
            <ul className="char__grid">
                    {items}
            </ul>
        )     
    }

           
        const loadButton = newItemLoading  ? <Spinner/> : 
            <button className="button button__main button__long" 
                onClick = {()=> onRequest(offset)}
                disabled = {newItemLoading}
                style = {{'display' : charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>;
        
        const errorMessage = error ? <ErrorMess/> : null;
        const spinner = loading && !newItemLoading  ? <Spinner/> : null;
        const items = renderItems(chars);
        


        return(
            <div className="char__list">
                {spinner}
                {errorMessage}
                {items}
                {loadButton}
            </div>
        )
    
}

export default CharList;

