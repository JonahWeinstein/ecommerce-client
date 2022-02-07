import React from 'react'
import { withRouter } from 'react-router-dom';

const BackButton = (props) => {
    const onClick = () => {
        props.history.goBack()
    }


    return (
        <button className="button cta" onClick = {onClick}>back</button>
    )
}

export default withRouter(BackButton)