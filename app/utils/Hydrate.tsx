'use client'
import {ReactNode, useEffect, useState} from 'react';
import { Inter, Poppins, Libre_Franklin } from 'next/font/google'



const poppins  = Libre_Franklin({weight: ['400', '500', '700'], subsets:['latin']})




export default function Hydrate({children}: {children: ReactNode}){
    const [isHydrated, setisHydrated] = useState(false)

    useEffect(() => {
      setisHydrated(true)

    }, [])
    
    return(
    <>
      {
      isHydrated ? 
      <body
        className={`${poppins.className} flex flex-col min-h-screen relative`}>
             
         
            {children} 
           
          </body> : 
          <body > 
         <h1 className={`${poppins.className} h-screen w-screen text-center font-black text-3xl pt-[30vh] align-middle`}> Loading...</h1>
          </body>
      }
    </>
    )
}