'use client'
import React, { Key } from 'react'
import Image from 'next/image';
import Matemasie from 'next/font/local'
import Link from 'next/link';
import { useRef } from 'react';
import { toPng, toJpeg, toSvg } from 'html-to-image';

type Props = {}

const Mate = Matemasie({src: '../../fonts/Matemasie-Regular.ttf'})

interface Params {
    id: string
  }
  
  interface SearchParams{
    name: string;
    alt_description: string;
    urls: any;
    id:  string;
    key: Number | string;
    
  }
  
  interface SearchParamTypes{
    Params: Params,
    searchParams: SearchParams
  
  
  }

  

const page =  ({searchParams}: SearchParamTypes) => {

  const ref = useRef<HTMLDivElement>(null)

  const HandleDownload = async(format:string) => {
    if (ref.current === null) {
      return
    }

    try{
      let dataUrl: string
      let extension: string

      switch(format){
        case 'png':
          dataUrl = await toPng(ref.current)
          extension = 'png'
          break
        case 'jpeg':
          dataUrl = await toJpeg(ref.current)
          extension = 'jpeg'
          break;
        case 'svg':
          dataUrl = await toSvg(ref.current)
          extension ='svg'
          break;
        default:
          dataUrl = await toPng(ref.current)
          extension = 'png'

      }

      //create downloadable link
      const link = document.createElement('a')
      link.href = dataUrl;
      link.download = `my-image.${extension}`
      link.click()

    } catch(err){
      console.log('Failed to convert')
    }
  } 



  return (
    <div>
      <div className='my-5 ml-4 underline'><Link href={'/'}><h3>Go Back</h3></Link></div>
      <div className='w-screen flex justify-center mt-[20vh]'>
        <div>
          <div className='w-screen flex justify-center '>
      <div className='w-[12rem] h-[15rem]' ref={ref}>
      <Image className={`h-[15rem] w-[12rem] rounded-md `}  src={searchParams.urls} alt={searchParams.alt_description} height={500} width={400}/>
      <h1 className={` ${Mate.className} relative bottom-[30vh] ml-4 text-white text-2xl text-center`}>Thank You</h1>

      <h1 className={` ${Mate.className} relative bottom-14 text-center text-white`}>{searchParams.name}</h1>

      </div>
      </div>

      <div className='flex gap-4 justify-center relative  my-20 flex-col lg:flex-row'>
        <button className='btn' onClick={()=> HandleDownload('png')}>Download As PNG</button>
        <button className='btn' onClick={()=> HandleDownload('jpeg')}>Download as JPEG</button>
        <button className='btn' onClick={()=> HandleDownload('svg')}>Download as SVG</button>
      </div>

      </div>

     
      </div>
    

    </div>
  )
}

export default page