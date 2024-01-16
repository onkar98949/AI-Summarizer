import React from 'react'


const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
         <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <h1 className='font-satoshi orange_gradient font-bold text-2xl'>Summarize</h1>
            <button className='black_btn'>
              Github
            </button>
         </nav>

         <h1 className='head_text'>
          Summarize Articles with <br className='max-md:hidden'/>
          <span className='orange_gradient'>
            OpenAI GPT-4
          </span>
         </h1>

         <h2 className='desc'>
          Simplify your reading with OpenAI summarize , an open source article summarizer that tranforms lengthy articles into clear and concise summaries.
         </h2>
    </header>
  )
}

export default Hero