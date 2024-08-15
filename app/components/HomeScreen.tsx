'use client'
import React, { useEffect, useState } from 'react'
import getPhotos from '../utils/fetchPhotos'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ImageType } from '../types/imagetypes'
import Link from 'next/link'


type Props = {}

const HomeScreen = () => {
    const [randomPhotos, setrandomPhotos] = useState<any>()
    const [activeItem, setactiveItem] = useState<ImageType>()
    const [name, setname] = useState<string>()
    const [showInput, setshowInput] = useState<boolean>(false)
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await getPhotos(),
        queryKey: ["photos"], //Array according to Documentation
      });
    
     !isError &&  console.log(data)

      // function to open modal 
    const openModal = ()=> {
        const modal:any = document.getElementById('my_modal_5');
  if (modal) {
    modal.showModal();
    setactiveItem(undefined)
    setname(undefined)

  }
    }


      //function to close random modal  
     const closeModal = () => {
        const modal:any = document.getElementById('my_modal_5');
        if (modal) {
          modal.close();
      
        }
        setactiveItem(undefined)
      }


     //function to pick 4 random photos
     const get4RandomPhotos = (array:[]) => {

        openModal()
        //shuffle Array
        array.sort(() =>  Math.random() - 0.5)

        //select first 4
        console.log(array.slice(0,4))
       setrandomPhotos(array.slice(0,4))
        return array.slice(0,4)

     }


     //handle name input 
    const handleName = (item:ImageType)=> {
        setactiveItem(item)
        if (activeItem){
            setshowInput(true)
        }
        
     }


   



  return (
    <div>
        <h1 className='font-black text-3xl text-center pt-12'>Revivar</h1>


        <div className='flex justify-center pt-[25vh]'>
        <button className='btn' onClick={()=>  get4RandomPhotos(data)}>Get Photos</button>

        <dialog id="my_modal_5" className="rounded-lg overflow-x-scroll  w-[90vw] h-[60vh] lg:h-[80vh]">

  <div className=" ">
  <div className='overflow-x-scroll'>
  <div className='py-4'> <p className='underline text-right mx-2 cursor-pointer' onClick={closeModal}>Close</p></div>
  {!activeItem && <div><h3 className='text-center text-2xl font-bold py-4'>Please Pick A Photo</h3></div>}
  <div className=''>
    <div className='flex gap-1 lg:gap-3 w-full justify-center overflow-x-scroll'>

    {randomPhotos && randomPhotos.map((photo:ImageType) => (
      


        <div key={photo.id} className='h-[10rem] w-[8rem] lg:h-[25rem] lg:w-[20rem]' >
        <span onClick={()=>handleName(photo)} className='cursor-pointer  w-[20rem]' >
            {isLoading && <><h1 className='font-bold'>Loading Photos...</h1></>}
            {isError && <><h1 className='font-bold'>Unable To Fetch Photos, try again</h1></>}
        
            <Image className={`h-[10rem] w-[8rem] lg:h-[25rem] lg:w-[20rem] ${ activeItem && activeItem.id === photo.id && 'border-[0.2rem] border-blue-800 rounded-md' }`}  src={photo.urls.regular} alt={photo.alt_description} height={500} width={400}/>
           
            </span>
        </div>
    ))}
    </div>
    </div>
    <div className='flex justify-center my-8'>
    {activeItem && <input className='border rounded-md w-[60vw] lg:w-[20vw] p-2' placeholder='Enter Nick Name 😊' value={name} onChange={(e:any) => setname(e.target.value)} autoFocus/>}
    </div>

    <div className='flex justify-center'>
    {name && <Link href={{ pathname: `download/${activeItem && activeItem.id}`, query: {name:name, urls: activeItem?.urls.regular, alt_description:activeItem?.alt_description, id:activeItem?.id}}}  ><button className='btn'>Generate Image</button></Link>}
    </div>
  </div>
  </div>

</dialog>
        </div>

    </div>
  )
}

export default HomeScreen