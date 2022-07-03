import { Component } from "react/cjs/react.production.min";

import ErrorMess from "../errorMess/errorMess";

class ErrorBoundary extends Component{
    state = {
        error : false
    }

    componentDidCatch(err , info){
        console.log(err , info);
        this.setState({error : true})
    }

    render() {
        if (this.state.error) {
            return(
                <ErrorMess/>
            )
        }

        return this.props.children;

    }

}

export default ErrorBoundary