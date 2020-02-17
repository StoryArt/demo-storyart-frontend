import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import TreeUIDemo from '../components/TreeUIDemo';

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
            if(story.sections.length > 0) return true;
        } else {
            const foundIndex = getSectionById(sectionId);
            if(foundIndex > -1){
                const foundSection = story.sections[foundIndex];
                if(foundSection.nextSectionId) return true;
                if(foundSection.options.some(opt => getSectionById(opt.nextSectionId) > -1)) return true;
            }
        }
        return false;
    }

    const handleAddNextSection = (e, sectionId) => {
        e.preventDefault();
        if(checkHaveNextSection(sectionId)) return alert('This section already had next section!');
        
        const newSection = {
            id: Math.random().toString(),
            title: '',
            content: '', 
            options: [],
            isLast: false,
            nextSectionId: null,
            level: 0
        }

        if(sectionId != null){
            const foundIndex = getSectionById(sectionId);
            if(story.sections[foundIndex].level === -1) return alert('This section is not a node in story tree');

            story.sections[foundIndex].nextSectionId = newSection.id;
            newSection.level = story.sections[foundIndex].level + 1;
        }
        story.sections.push(newSection);
        setStory({ ...story });
    }

    const handleAddSection = () => {
        const newSection = {
            id: Math.random().toString(),
            title: '',
            content: '', 
            options: [],
            isLast: false,
            nextSectionId: null,
            level: -1
        };
        story.sections.push(newSection);
        setStory({ ...story });
    }

    const changeSection = (prop, value, sectionId) => {
        const newSections = story.sections.map(sec => {
            if(sec.id === sectionId) return {
                ...sec, [prop]: value
            }
            return sec;
        });
        
        setStory({ ...story, sections: newSections });
    }

    const changeOptionsOfSection = (prop, value, sectionId, optionIndex) => {
        console.log('change');
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

        
        const i = getSectionById(sectionId);
        const foundSection = story.sections[i];

        // if(foundSection.level === -1) return alert('This section is not a node in the story tree!');

        if(foundSection.nextSectionId) {
            const index = getSectionById(foundSection.nextSectionId);
            return alert('This section already had a reference to section ' + (index + 1));
        }

        const newOptions = {
            id: Math.random().toString(),
            nextSectionId: null,
            content: ''
        }
        
        foundSection.options.push(newOptions);
        setStory({ ...story });
    }

    const getSectionById = (sectionId) => {
        return story.sections.findIndex(sec => sec.id === sectionId);
    }

    const handleRemoveSection = (e, sectionId) => {
        e.preventDefault();
        if(checkHaveNextSection(sectionId)) return alert('This section already had next section!');

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
        story.sections = story.sections.filter(section => {
            if(section.nextSectionId === sectionId) section.nextSectionId = null;
            if(section.options.forEach(opt => opt.nextSectionId === sectionId ? opt.nextSectionId = null : ''));
            return section.id !== sectionId;
        });
     
        setStory({ ...story });
    }

    const handleRemoveOption = (sectionId, index) => {
        const i = getSectionById(sectionId);
        const foundSection = story.sections[i];
        foundSection.options.splice(index, 1);
        setStory({ ...story });
    } 

    const saveStory = () =>  {
        console.log(story);
    }

    const getRandomSections = () => {
        return story.sections.filter((section, index) => {
            if(section.level === -1) {
                section.index = index;
                return true;
            }
            return false;
        });
    }

    const randomSections = getRandomSections();

    return (
        <MainLayout>
            <h3 className="text-center my-4">Create Your Story</h3>
            <div className="container" style={{ paddingBottom: '130px' }}>
                <div className="row">
                    <div className="col-8 mx-auto">
                        {/* Story Introduction */}
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
                                        <Dropdown.Item href="#" onClick={handleAddNextSection}>Add sections</Dropdown.Item>
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

                        {/* Story Sections */}
                        {story.sections.map((section, index) => (
                            <div className="card mb-5" key={section.id}>
                                <div className="card-header">
                                    <h5 className="mb-4">Section { index + 1 }</h5>
                                    <input name="title" 
                                        placeholder="Section title..." 
                                        value={section.title} 
                                        className="form-control"
                                        onChange={(e) => changeSection('title', e.target.value, section.id)} />
                                </div>

                                <div className="card-body">
                                    <textarea 
                                        name="content" 
                                        placeholder="Section content..." 
                                        value={section.content} 
                                        rows="4"
                                        onChange={(e) => changeSection('content', e.target.value, section.id)}
                                        className="form-control mb-5"></textarea>

                                    
                                        {section.options.map((opt, index) => (
                                            <div className="row bg-primary mb-3 py-2" key={opt.id}>
                                            
                                                <div className="col-5">
                                                    <input name="content" 
                                                        placeholder="Option content..." 
                                                        value={opt.content} 
                                                        rows="4"
                                                        onChange={(e) => changeOptionsOfSection('content', e.target.value, section.id, index)}
                                                        className="form-control" />
                                                </div>
                                                <div className="col-5"> 
                                                    <select 
                                                        onChange={(e) => changeOptionsOfSection('nextSectionId', e.target.value, section.id, index)}
                                                        placeholder="Choose which section to go next"
                                                        className="form-control">
                                                            <option value="" disabled>Choose linked section</option>
                                                            {randomSections.map(sec => (
                                                                <option 
                                                                    key={sec.id} 
                                                                    value={sec.id}>Section { sec.index + 1 }</option>
                                                            ))}
                                                        </select>
                                                </div>
                                                <div className="col-2 text-right">
                                                    <button className="btn btn-danger float-right" onClick={() => handleRemoveOption(section.id, index)}>X</button>
                                                </div>
                                            </div>
                                        )) }


                                        <Dropdown className="float-right">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                ...
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu alignRight>
                                                <Dropdown.Item href="#" onClick={(e) => handleAddNextSection(e, section.id)}>Add next sections</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={(e) => handleRemoveSection(e, section.id)}>Remove this section</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={(e) => handleAddOptions(e, section.id)}>Add options</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                        ))}

                        {/* Add random sections */}
                        { story.sections.length > 0 && (
                            <button 
                                className="btn btn-primary float-right ml-3" 
                                onClick={handleAddSection}>Add more section</button>
                        ) }

                         {/* Save story */}
                        <button 
                            className="btn btn-success float-right" 
                            onClick={saveStory}>Save</button>
                    </div>
                
                    {/* <div className="col-4">
                        <TreeUIDemo />
                    </div> */}
                </div>
            </div>
        </MainLayout>
    );
};


export default CreateStoryPage;
