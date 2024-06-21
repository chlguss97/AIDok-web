import React from 'react'
import AiItem from './AiItem'

const AiList= ({data})=>{
   
    return(
        <>
            <div>
            {Object.keys(data)
            .sort((a, b) => data[b].date - data[a].date)
            .map(docId => (
                <AiItem key={docId} item={data[docId]} />
                
            ))}
            </div>
        </>
    )
}

export default AiList