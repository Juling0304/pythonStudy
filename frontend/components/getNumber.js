import React from "react"
import PropTypes from 'prop-types';

function GetNumber(props) {
    if(props.count > 3) {
        return <h1>over three</h1>
    } else {
        return <h1>under four</h1>
    }
}

GetNumber.propTypes = {
    count: PropTypes.number.isRequired,
}

export default GetNumber