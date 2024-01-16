import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = process.env.RAPID_API_ARTICLE_KEY

// const options = {
//     method: 'GET',
//     url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//     params: {
//       url: 'https://time.com/6266679/musk-ai-open-letter/',
//       length: '3'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'd42233effcmsh0d700bd41da8cc4p1e3f38jsn3cf5e5c05caa',
//       'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
//     }
//   };

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key','d42233effcmsh0d700bd41da8cc4p1e3f38jsn3cf5e5c05caa',);
            headers.set('X-RapidAPI-Host','article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints:(builder)=> ({
        getSummary:builder.query({
            query:(params)=> `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
})

export const {  useLazyGetSummaryQuery } = articleApi;
