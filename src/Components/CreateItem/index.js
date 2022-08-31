import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import TagsSelect from '../CheckBox';

import './CreateItem.css';


const CreateItem = (items) => {

  const [titleForm, setTitleForm] = useState();
	const [tagsForm, setTagsForm] = useState([]);
	const [descriptionForm, setDescriptionForm] = useState();
	const [imageForm, setImageForm] = useState();
	const [checked, setChecked] = useState(false);

  let newItem = {}

  useEffect(() => {
      newItem = { 'title':titleForm, 'tags':tagsForm, 'description':descriptionForm, 'imageUrl':imageForm }

  }  ,[titleForm,tagsForm,descriptionForm,imageForm])
    
  let navigate = useNavigate();

  let AddOneItem = (e,items) => {
      e.preventDefault();
      console.log(items)
      items.items.push(newItem);
      navigate('/')
      console.log(newItem)
      console.log(items.items[items.items.length - 1]);
  }

  let allTags = (items) => {
		let tags = [];
		items.items.forEach((item) => {
			item.tags.forEach((tag) => {
				if (!tags.includes(tag)) {
					tags.push(tag);
				}
			});
		});
		return tags;
	};

	let tagsobj = allTags(items);
	let tagsDiv = Object.values(tagsobj);


    return (
        <div>
            <form className='newForm'>
                <div className='topContainer'>
                    <div className='innerTopContainer'>
                        Image Url
                        <input
                            type='text'
                            placeholder='Imagr Url'
                            onChange={(e) =>
                            setImageForm(e.target.value)
                            }>
                        
                        </input>
                    </div>
                    <div className='innerTopContainer'>
                        Item Title
                        <input
                            type='text'
                            placeholder='Title'
                            onChange={(e) =>
                            setTitleForm(e.target.value)
                            }>
                        </input>
                    </div>
                    <div className='innerTopContainer'>
                        Item Description
                        <input
                            type='text'
                            placeholder='Description'
                            onChange={(e) =>
                            setDescriptionForm(e.target.value)
                            }>
                        </input>
                    </div>
                </div>
                <TagsSelect tagsForm={tagsForm} setTagsForm={setTagsForm} tagsDiv={tagsDiv} checked={checked} setChecked={setChecked}/>
                <button 
                    className='oneItemButton' 
                    onClick={(e)=> {AddOneItem(e,items)}}
                    >
                    Create
                </button>
                <button
                     className='oneItemButton'
                     onClick={() => {navigate(`/`);
                     }}>
                     Cancel
                  </button>
            </form>
        </div>
    );
}

export default CreateItem;