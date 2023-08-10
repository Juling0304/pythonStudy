'use client'

import React from "react"

function JoinError(props) {
    if(props.error !== null){
        return (
            <div>
                <p>{props.error}</p>
            </div>
        )
    }

}

export default JoinError