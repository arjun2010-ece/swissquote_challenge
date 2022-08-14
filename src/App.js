import { useState, useEffect, useCallback } from "react";
import axios from "axios"
import './App.css';
import ListItem from "./components/ListItem"
import Search from "./components/Search"

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
    <ListItem key={el.title} title={el.title} />
  ))

  const filteredPostList = filteredPosts && filteredPosts.map(el => (
    <ListItem key={el.title} title={el.title} />
  ))

  return (
    <div className="App">
      <Search searchText={searchText} handleChange={handleChange} handleClick={handleClick} />
      {searchText === "" ? postList : filteredPostList}
    </div>
  );
}

export default App;
