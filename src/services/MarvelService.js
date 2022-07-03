import { useHTTP } from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHTTP();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2439aaeeb322108c3e550a0a4b3c575a';
    const _baseOffSetChar = 230;

    


    const getAllChar = async(offset = _baseOffSetChar) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformChar)
    }


    const getChar = async (id) => { 
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformChar(res.data.results[0])
    }

    const getAllComics = async(offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        console.log(res);
        return res.data.results.map(_transformComics)
    }

    const getComics = async(id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    
    const _transformChar = (char)=>{
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'Описание отсутствует' ,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            wiki: char.urls[1].url,
            homepage:char.urls[0].url,
            comics:char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            description: comics.description ? comics.description : 'description is absent',
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            pages: comics.pageCount !==0 ? `${comics.pageCount} p.` : 'information is absent',
            price: comics.prices.price ? comics.prices.price : 'NOT AVAILABLE',
            language: comics.textObjects.language || 'en-us'
        }
    }

    return {loading, error, getAllChar, getChar, getAllComics, getComics, clearError}
}

export default useMarvelService;