import React from 'react'
import { useEffect, useState } from 'react'
import { useLazyGetSummaryQuery } from '../services/article'
import '../index.css'
import { copyWithStructuralSharing } from '@reduxjs/toolkit/query'

const Demo = () => {

    const [article, setArticle] = useState({
        url:'',
        summary:'',
    })

    const [allArticles ,setAllAritcles] = useState([]);
    const [copied,setCopied] = useState("");

    const [getSummary,{error,isFetching }]  = useLazyGetSummaryQuery();

    useEffect(()=>{
        const articlesFromLocalStorgae = JSON.parse(
        localStorage.getItem('articles')
        )

        if(articlesFromLocalStorgae){
            setAllAritcles(articlesFromLocalStorgae)
        }
    },[])

    const handlesubmit = async(e)=>{
        e.preventDefault();
        const { data } = await getSummary({articleUrl:article.url});

        if(data?.summary){
            const newArticle  ={...article , summary:data.summary};
            const updatedAllArticles = [newArticle, ...allArticles];    

            setArticle(newArticle);
            setAllAritcles(updatedAllArticles);
            
            localStorage.setItem('artices',JSON.stringify(updatedAllArticles));
        }
    }

    const handleCopy =(copyUrl)=>{
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(()=> setCopied(false),3000);
    }
    return (
        <section className='mt-16 w-full max-w-xl'>
            <div className='flex flex-col w-full gap-2'>
         
                <form className='relative flex justify-center items-center' onSubmit={handlesubmit}>
                    <p className='absolute left-0 my-2 ml-3 w-5'><i class="ri-link"></i></p>
                    <input type='url' placeholder='Enter a URL' value={article.url} onChange={(e) => setArticle({...article,url:e.target.value})} required className='url_input peer' />

                    <button type='submit ' className='submit_btn'>
                        Submit
                    </button>

                </form>
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.map((item,index)=>(
                        <div
                        key= {`link-${index}`}
                        onClick={()=>setArticle(item)}
                        className='link_card'
                        >
                            <div className='copy_btn' onClick={()=>{handleCopy(item.url)}}>
                                <p>{copied === item.url ? (<i class="ri-check-line"></i>): <><i class="ri-file-copy-line"></i></>}</p>
                            </div>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='my-10 max-w-full flex justify-center items-center'>
                {isFetching?(
                   <div class="text-center">
                   <div class="spinner-border" role="status">
                     <span class="visually-hidden">Loading...</span>
                   </div>
                   </div>
                ):error?(
                    <p className='font-inter font-bold text-black text-center'>
                        Well , that wasn't supposed to happen...
                        <br/>
                        <span className='font-satoshi font-normal text-gray-700'>
                            {error?.data?.error}
                        </span>
                    </p>
                ):(
                    article.summary&&(
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                Article <span className='blue_gradient'>
                                    Summary
                                </span>
                            </h2>
                            <div className='summary_box'>
                                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default Demo