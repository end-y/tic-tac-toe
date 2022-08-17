import { createRef } from "react"

function Modal({text, modalFunc}){
    const startRef = createRef()
    return(
        <div ref={startRef} className='modal'>
            <h1 style={{fontSize:45}}>{text}</h1>
            <div style={{display:"flex", flexDirection:"column"}}>
                <button style={{marginBottom:5}} onClick={() => modalFunc[0](startRef)} className='button'>Oyuna Başla</button>
                <button onClick={() => modalFunc[1](startRef)} className='button'>Bilgisayara karşı oyna</button>
            </div>

        </div>
    )
}

export default Modal