import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';

const CreateStoryPage = () => {

    const [story, setStory] = useState({
        title: '',
        intro: '',
        sections: []
    });

    const changeStory = (prop, value) => {
        setStory({ ...story, [prop]: value });
    }

    const checkHaveNextSection = (sectionId) => {
        if(!sectionId){
            if(story.sections.length > 0) return false;
        } else {
            const foundIndex = getSectionById(sectionId);
            if(foundIndex > -1){
                const foundSection = story.sections[foundIndex];
                if(foundSection.nextSectionId) return false;
                foundSection.options.some()
            }
        }
        return true;
    }

    const handleAddSection = (e, sectionId) => {
        e.preventDefault();
        if(!checkHaveNextSection(sectionId)) return alert('This section already had next section!');
        
        const newSection = {
            id: Math.random().toString(),
            title: '',
            content: '', 
            options: [],
            isLast: false,
            nextSectionId: null
        }
        if(sectionId != null){
            const foundIndex = getSectionById(sectionId);
            story.sections[foundIndex].nextSectionId  = newSection.id;
        }
        story.sections.push(newSection);
        setStory({ ...story });
    }

    const changeSection = (prop, value, sectionId, optionIndex) => {
        const newSections = story.sections.map(sec => {
            if(sec.id === sectionId)  return {
                ...sec, [prop]: value
            }
            return sec;
        });
        
        setStory({ ...story, sections: newSections });
    }

    const changeOptionsOfSection = (prop, value, sectionId, optionIndex) => {
        const i = getSectionById(sectionId);
        const section = story.sections[i];
        section.options.forEach((opt, index) => {
            if(index == optionIndex){
                opt[prop] = value;
            } 
        }) 
        setStory({ ...story });
    }

    const handleAddOptions = (e, sectionId) => {
        e.preventDefault();
        const newOptions = {
            id: Math.random().toString(),
            nextSectionId: null,
            content: ''
        }
        const i = getSectionById(sectionId);
        const foundSection = story.sections[i];
        foundSection.options.push(newOptions);
        setStory({ ...story });
    }

    const getSectionById = (sectionId) => {
        return story.sections.findIndex(sec => sec.id === sectionId);
    }

    const handleRemoveSection = (e, sectionId) => {
        e.preventDefault();
        if(!checkHaveNextSection(sectionId)) return alert('This section already had next section!');

        // const deleteSections = [];
        // const foundIndex = getSectionById(sectionId);
        // const foundSection = story.sections[foundIndex];

        // deleteSections.push(foundSection.id);
        
        // if(foundSection.nextSectionId){
        //     deleteSections.push(foundSection.nextSectionId);
        // } else if(foundSection.options && foundSection.options.length > 0){
        //     foundSection.options.forEach(opt => {
        //         if(opt.nextSectionId) {
        //             deleteSections.push(opt.nextSectionId);
        //         }
        //     });
        // }

        //remove the section and some sections that is the child node of this section 
        story.sections = story.sections.filter(section => section.id !== sectionId)
     
        setStory({ ...story });
    }

    const handleRemoveOption = (sectionId, index) => {
        const i = getSectionById(sectionId);
        const foundSection = story.sections[i];
        foundSection.options.splice(index, 1);
        setStory({ ...story });
    }

    return (
        <MainLayout>
            <h3 className="text-center my-4">Create Your Story</h3>
            <div className="container" style={{ paddingBottom: '130px' }}>
                <div className="card mb-5">
                    <div className="card-header">
                        <h4 className="mb-4">Story Introduction</h4>
                        <input name="title" 
                            placeholder="Story title..." 
                            value={story.title} 
                            className="form-control"
                            onChange={(e) => changeStory('title', e.target.value)} />
                    </div>
                    <div className="card-body">
                        <textarea name="content" 
                            placeholder="Story introduction content..." 
                            value={story.content} 
                            rows="4"
                            onChange={(e) => changeStory('intro', e.target.value)}
                            className="form-control"></textarea><br/>
                        
                        <Dropdown className="float-right">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu alignRight>
                                <Dropdown.Item href="#" onClick={handleAddSection}>Add sections</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <p>{ currentSection.content }</p><br/> */}
                        {/* {currentSection.options && currentSection.options.map((option, index) => (
                            <div className="form-group" key={option.content}>
                                <input 
                                    name="isSelected"
                                    id={`option${index}`}
                                    type="radio" 
                                    className="mr-3"
                                    // checked={option.isSelected}
                                    value={option.isSelected} 
                                    onChange={() => handleSelectOption(index)}/>
                                <label htmlFor={`option${index}`}>{ option.content }</label>
                            </div>
                        ))} */}
                        {/* <div>
                            {!currentSection.isLast && (
                                <button 
                                    className="btn btn-primary float-right" 
                                    onClick={handleNextSection}>Next</button>
                            )}

                            { selectedSections.length > 0 && (
                                    <button 
                                    className="btn btn-secondary float-right" 
                                    onClick={handleBackSection}>Back</button>
                            ) }
                        </div> */}
                    </div>
                </div>

                {story.sections.map((section, index) => (
                    <div className="card mb-5" key={section.id}>
                        <div className="card-header">
                            <h5 className="mb-4">Section { index + 1 }</h5>
                            <input name="title" 
                                placeholder="Section title..." 
                                value={story.title} 
                                className="form-control"
                                onChange={(e) => changeSection('title', e.target.value, section.id)} />
                        </div>

                        <div className="card-body">
                            <textarea 
                                name="content" 
                                placeholder="Section content..." 
                                value={story.content} 
                                rows="4"
                                onChange={(e) => changeSection('content', e.target.value, section.id)}
                                className="form-control mb-5"></textarea>

                            
                                {section.options.map((opt, index) => (
                                    <div className="row card card-body bg-primary mb-3" key={opt.id}>
                                        <div>
                                            <button className="btn btn-danger float-right" onClick={() => handleRemoveOption(section.id, index)}>X</button>
                                        </div>
                                        <div className="col-6">
                                            <input name="content" 
                                                placeholder="Option content..." 
                                                value={opt.content} 
                                                rows="4"
                                                onChange={(e) => changeOptionsOfSection('content', e.target.value, section.id, index)}
                                                className="form-control" />
                                        </div>
                                        <div className="col-6"> 

                                        </div>
                                    </div>
                                )) }


                                <Dropdown className="float-right">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        ...
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu alignRight>
                                        <Dropdown.Item href="#" onClick={(e) => handleAddSection(e, section.id)}>Add next sections</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={(e) => handleRemoveSection(e, section.id)}>Remove this section</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={(e) => handleAddOptions(e, section.id)}>Add options</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                ))}
               
            </div>
        </MainLayout>
    );
};


export default CreateStoryPage;
