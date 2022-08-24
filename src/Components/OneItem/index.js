import React,{ useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TagsSelect from '../CheckBox';

import './OneItem.css';

const OneItem = (items) => {
	const [currentItem, setCurrentItem] = useState(null);
	const [edit, setEdit] = useState(false);

	const [titleForm, setTitleForm] = useState(currentItem && currentItem[0]?.title);
	const [tagsForm, setTagsForm] = useState(currentItem && currentItem[0]?.tags)
	const [descriptionForm, setDescriptionForm] = useState(currentItem && currentItem[0]?.description);
	const [imageForm, setImageForm] = useState(currentItem && currentItem[0]?.imageUrl);
	const [checked, setChecked] = useState(false);


	const { itemTitle } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentItem === null) {
			setCurrentItem(
				items.items.filter((item) => item.title === itemTitle)
			);
		}
      
	}, [itemTitle]);
   
   useEffect(()=>{
      setTitleForm(currentItem && currentItem[0]?.title)
      setTagsForm(currentItem && currentItem[0]?.tags)
      setDescriptionForm(currentItem && currentItem[0]?.description)
      setImageForm(currentItem && currentItem[0]?.imageUrl)
   }  ,[currentItem])



	const editOneItem = async (e) => {
		e.preventDefault();
		setCurrentItem([{ 'title':titleForm, 'tags':tagsForm, 'description':descriptionForm, 'imageUrl':imageForm }])
		setEdit(false);
	};

	const toggleEdit = () => {
		setEdit((current) => !current);
	};
   
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

	let deleteItem = (e,itemTitle) => {
		e.preventDefault();
		items = items.items.filter(item => item.title !== itemTitle);
		navigate('/HomePage')
	}

	let goHome = (e) => {
		e.preventDefault();
		navigate('/HomePage')
	}
   

	return (
		<>
        	<div className='itemInfo'>
				<div>
				<img
					src={currentItem && currentItem[0]?.imageUrl}
					alt=''
				/>
				<div>
					<button
						className='oneItemButton'
						onClick={(e) => {goHome(e)}}
						>				
						Home
					</button>
				</div>
				<h1>{currentItem && currentItem[0]?.title}</h1>
				<h3 className='oneItemTages'>
					{ currentItem &&
						currentItem[0]?.tags.map((tag,indx) => <li key={indx}>{tag}</li>)}
				</h3>
				<h3>description:</h3>
				<div>{currentItem && currentItem[0]?.description}</div>
			</div>
        </div>
			<div>
				<button onClick={toggleEdit}>{edit ? 'Cancel' : 'Edit'}</button>
				<button onClick={(e) => {deleteItem(e,itemTitle)}}>Delete</button>
			</div>
			<div className='itemForm'>
				{edit ? (
					<form>
						<div className='topContainer'>
							<div className='innerTopContainer'>
								New Image Url
								<input
									type='text'
									placeholder='Imagr Url'
									onChange={(e) =>
										setImageForm(e.target.value)
									}></input>
							</div>
							<div className='innerTopContainer'>
								New Title
								<input
									type='text'
									placeholder='Title'
									onChange={(e) =>
										setTitleForm(e.target.value)
									}></input>
							</div>
							<div className='innerTopContainer'>
								New Description
								<input
									type='text'
									placeholder='Description'
									onChange={(e) =>
									setDescriptionForm(e.target.value)
									}></input>
							</div>
						</div>
						<TagsSelect tagsForm={tagsForm} setTagsForm={setTagsForm} tagsDiv={tagsDiv} checked={checked} setChecked={setChecked}/>
						<button className='oneItemButton' onClick={editOneItem}>
							Save
						</button>
					</form>
				) : null}
			</div>
		</>
	);
};

export default OneItem;
