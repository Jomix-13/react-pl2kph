import React from 'react';

const TagsSelect = (props) => {

    const setTagsForm = props.setTagsForm
    const tagsForm = props.tagsForm
    const tagsDiv = props.tagsDiv
    const setChecked = props.setChecked
    const checked = props.checked


    let addRemoveTag = (tag) => {
        if(checked === false){
            setTagsForm([...tagsForm, tag]);
            setChecked(true);
        }else{
            setTagsForm(tagsForm.filter(item => item !== tag))
            setChecked(false);
        }
        console.log(tagsForm,tag,checked)
        return tagsForm
    }



	return (
        <div>
            Tags:
            <div className='tagsContainer'>
                {tagsDiv?.map((tag, indx) => (
                <div className='tagsInner' key={indx}>
                    <input 
                        type='checkbox'
                        checked={tagsForm.includes(tag) ? true : false}
                        onChange={()=>{addRemoveTag(tag)}}>
                    </input>
                    {tag}
                </div>
                    ))}
            </div>
        </div>
	);
};

export default TagsSelect;
