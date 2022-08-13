import { useState, useEffect, useCallback } from "react";
import axios from "axios"
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchText, setSearchText] = useState("")
  
  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setPosts(data)
    }

    getPosts();

  }, [])

  const handleChange = useCallback((e) => {
    let text = e.target.value;
    const filteredPosts = posts.filter(el => {
      if(el?.title?.includes(text)){
        return !!el;
      }
      return false;
    })
    if(text !== ""){
      setFilteredPosts(filteredPosts)
    }
    setSearchText(e.target.value)
  }, [posts])

  const handleClick = useCallback(() => {
    setSearchText("")
  }, [])

  const postList = posts && posts.map(el => (
    <div key={el.title} className="posts">
      <p>{el.title}</p>
    </div>
  ))

  const filteredPostList = filteredPosts && filteredPosts.map(el => (
    <div key={el.title} className="posts">
      <p>{el.title}</p>
    </div>
  ))

  return (
    <div className="App">
      <div>
        <input type="text" name="search" value={searchText}
        onChange={handleChange}
        />
        <button onClick={handleClick}>Clear</button>
      </div>
      {searchText === "" ? postList : filteredPostList}
    </div>
  );
}

export default App;
