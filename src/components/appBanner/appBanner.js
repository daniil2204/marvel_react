import './appBanner.scss';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';


const AppBanner = ()=>{
    return(
        <div className="app__banner">
                <img className='app__banner-img1' src={avengers} alt="Avengers"/>
                <div className="app__banner-text">
                    New comics every week!<br/>
                    Stay tuned!
                </div>
                <img className='app__banner-img2' src={avengersLogo} alt="Avengers logo"/>
        </div>
    )
}

export default AppBanner;