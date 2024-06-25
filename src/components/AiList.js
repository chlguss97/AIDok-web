import React from 'react'
import AiItem from './AiItem'

const AiList= ({data})=>{
   
    return(
        <>
            <div>
            {data
            .sort((a, b) => b.date - a.date)
            .map((item, index) => (
                <AiItem key={index} item={item} />
            ))}
            </div>
        </>
    )
}

export default AiList