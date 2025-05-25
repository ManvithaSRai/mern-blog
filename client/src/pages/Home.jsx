import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getPosts')
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  },[])

  return (
    <div>
     <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className="text-3xl font-bold lg:text-6xl">
         Welcome to <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-400 rounded-lg text-white'>
          Manvitha's</span> Blog
       </h1>
       <p className="text-gray-500 text-lg">— a space where curiosity meets clarity. Here, we explore the wonders of Science & Environment,
         unravel the future through Tech & Innovation, and learn from the diverse narratives and values within Culture & Society.<br/>
        <i>“Curiosity sparked is wisdom earned — explore more, think deeper.”</i><br/>
        </p>
        <Link to={'/search'} className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">View all posts</Link>
     </div>
     <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
       {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post)=>(
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={'/search'} className="text-lg text-teal-500 hover:underline text-center">View all Posts</Link>
          </div>
        )}

      </div>
    </div>
  )
}
