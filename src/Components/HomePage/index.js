

import  React, { useEffect, useState } from 'react';
import { NavLink,useNavigate } from "react-router-dom";

import './HomePage.css'

const HomePage = ({items}) => {


    const [searchTilte,setSearchTilte] = useState('')
    const [searchTags,setSearchTags] = useState('')
    const [titleResult,settitleResult] = useState([])
    const [tagsResult,setTagesResult] = useState([])

    const [sortByTitle,setSortByTitle] = useState(false)
    const [sortByTag,setSortByTag] = useState(false)

    const navigate = useNavigate();


    useEffect(()=>{
        settitleResult(items.filter(item =>
            item.title.toLowerCase().includes(searchTilte.toLowerCase())))
        setTagesResult(items.filter(item=>
            item.tags.includes(searchTags.toLowerCase())))
    },[searchTilte,searchTags])

    const toggleSortByItem = () => {
      setSortByTitle(current => !current);
    };

    const sortByTitleItems = () => {
      if(sortByTitle){
        items = items.sort((a,b)=> {
          let ia = a.title.toLowerCase()
          let ib = b.title.toLowerCase()
          if(ia < ib) {
            return -1
          }
          if(ia > ib) {
            return 1
          }
          return 0
        })
      }
    }
    sortByTitleItems()

    const toggleSortByTag = () => {
      setSortByTag(current => !current);
    };

    const sortByTagItems = () => {
      if(sortByTag) {
       items = items.sort((a,b)=> b.tags.length - a.tags.length)
      }
    }
    sortByTagItems()


    return (
        <div>
            <div className='topDiv'>
                <div>
                    <div className='searchBar' >
                        <input
                        className='searchinput'
                        type='text'
                        name='search'
                        value={searchTilte}
                        onChange={(e) => setSearchTilte(e.target.value)}
                        placeholder='Search By Title...'>
                        </input>
                    </div>

                    <div className='searchBar' >
                        <input
                        className='searchinput'
                        type='text'
                        name='search'
                        value={searchTags}
                        onChange={(e) => setSearchTags(e.target.value)}
                        placeholder='Search By full tag name ...'>
                        </input>
                    </div>
                </div>
                <div className='buttonsDiv'>
                    <button
                        onClick={toggleSortByItem}
                    >
                        { !sortByTitle?
                        <div>
                          Sort By Title
                        </div> 
                        :
                        <div>
                          Sorted By Title
                        </div>
                        }
                    </button>
                    <button
                        onClick={toggleSortByTag}
                    >
                      { !sortByTag?
                        <div>
                          Sort By # of Tags
                        </div> 
                        :
                        <div>
                          Sorted By # of Tags
                        </div>
                        }
                    </button>
                    <button
                        onClick={() => navigate('/create')}
                    >
                      Add Item
                    </button>
                </div>
            </div>

            <div>
                {!searchTilte && !searchTags   ? 
                items.map((item,indx) =>(
                    <div className='itemDiv' key={item.imageUrl}>
                      <NavLink
                        to={`/${item.title}`}
                        className={'itemLink'}
                      >
                        <div className='innerDiv'>
                            <img className='itemImg' src={item.imageUrl} alt=""/>
                            {item.title}
                        </div>
                      </NavLink>
                        <div className='tagsDiv'>Tags :
                            {item.tags.map(tag=>(
                            <li key={tag}>
                                {tag}
                            </li>
                            ))}
                        </div>
                    </div>
                ))
                :
                searchTilte && !searchTags  ?
                titleResult.map(item =>(
                    <div className='itemDiv' key={item.imageUrl}>
                      <NavLink
                        to={`/${item.title}`}
                        className={'itemLink'}
                      >                        
                          <div className='innerDiv'>
                              <img className='itemImg' src={item.imageUrl} alt=""/>
                              {item.title}
                          </div>
                      </NavLink>
                        <div className='tagsDiv'>Tags :
                            {item.tags.map(tag=>(
                            <li>
                                {tag}
                            </li>
                            ))}
                        </div>
                    </div>
                ))
                :
                !searchTilte && searchTags  ?
                tagsResult.map(item =>(
                      <div className='itemDiv' key={item.imageUrl}>
                        <NavLink
                          to={`/${item.title}`}
                          className={'itemLink'}
                        >                        
                          <div className='innerDiv'>
                            <img className='itemImg' src={item.imageUrl} alt=""/>
                            {item.title}
                          </div>
                        </NavLink>
                        <div className='tagsDiv'>Tags :
                            {item.tags.map(tag=>(
                            <li>
                                {tag}
                            </li>
                            ))}
                        </div>
                    </div>
                ))
                :
                null
                }
            </div>


        </div>
    )
}

export default HomePage

