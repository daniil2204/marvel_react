import error from '../../resources/gif/error.gif'
const ErrorMess = () =>{
    return(
        <img alt='ErrorMessage' src={error} style={{ display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "0 auto"}}/>
    )
}

export default ErrorMess;