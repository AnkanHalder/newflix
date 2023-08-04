import React from 'react'
import Image from 'next/image'

const LoadingPage = () => {
  return (
    <div className='' style={{position:"absolute",left:"0",top:"0",zIndex:"1111",backgroundColor:"black",display:"flex",flexDirection:"column",width:"100vw",height:"100vh",justifyContent:"center",alignContent:"center",flexWrap:"wrap"}}>
        <img src={"https://media1.giphy.com/media/xBpEWE1hv06PF1jINR/giphy.gif?cid=ecf05e47zzyushevkv8d31dteam2ar7wni5plxtjsintudlv&ep=v1_stickers_search&rid=giphy.gif&ct=s"} height={200} width={200} />
    <h1 style={{color:"white",fontSize:"2.5rem",textAlign:"center"}}>LOADING</h1>
    </div>
  )
}

export default LoadingPage