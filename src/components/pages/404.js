import ErrorMess from "../errorMess/errorMess"
import { Link } from "react-router-dom"

const Page404 = () => {
    return(
        <div>
            <ErrorMess/>
            <p style={{'textAlign' : "center", 'fontWeight' : 'bold', 'fontSize' : '24px'}}>Страница не найдена</p>
            <Link style={{'display' : 'block','textAlign' : 'center' , 'fontWeight' : 'bold' , 'fontSize' : '24px' , 'marginTop' : '30px'}} to="/">На главную страницу</Link>
        </div>
    )
}

export default Page404