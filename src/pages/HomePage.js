import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const HomePage = () => {

    const tempStory = {
        title: 'A day life of peter',
        intro: 'Peter is a boy living in Los Angeles city in America, he is a student of Eduonix school',
        sections: [
            {
                id: 1,
                title: 'Wake up in the morning',
                content: `Peter wake up in the morning of the year's first day. He consider doing something for
                in the morning that help him a lot to make the meaningful day`,
                options: [
                    {
                        content: 'Go to the girl friend house',
                        nextSectionId: 2,
                    },
                    {
                        content: 'Play soccer with friends',
                        nextSectionId: 3
                    },
                    {
                        content: 'Help his parent with their household chore',
                        nextSectionId: 4
                    },
                ],
                nextSectionId: null,
                isLast: false
            },
            {
                id: 2,
                title: 'Go to the girl friend house',
                content: `he ride winnerX to go to his girl friend house. However his bike's wheel 
                is run out of air on the way near the destination`,
                options: [
                    {
                        content: 'Go to the fixing-bike store',
                        nextSectionId: 8
                    },
                    {
                        content: `Leave the bike at another friend's house`,
                        nextSectionId: 9
                    },
                ],
                isLast: false,
                nextSectionId: null
            },
            {
                id: 3,
                title: 'Play soccer with friends',
                content: `He go to Thong Nhat stadium with his friends and join the soccer game.`,
                isLast: false,
                nextSectionId: 5
            },
            {
                id: 4,
                title: 'Help his parent with their household chore',
                content: `He help mother to decorate house, help father fix the light bulb. His parent was very happy 
                and proud of him. His parent decide to buy him something for his help during the morning.`,
                options: [
                    {
                        content: 'Buy him a new badminton racket',
                        nextSectionId: 6
                    },
                    {
                        content: `Get him to the theater to see movie`,
                        nextSectionId: 7
                    },
                ],
                isLast: false,
                nextSectionId: null
            },
            {
                id: 5,
                title: 'After playing soccer',
                content: `Winning the match with ratio 2 -1.`,
                isLast: true,
                nextSectionId: null
            },
            {
                id: 6,
                title: 'Buy him a new badminton racket',
                content: `With his new badminton racket, he was very happy and continue to go to play badminton 
                with friends to finish his morning`,
                isLast: true,
                nextSectionId: null
            },
            {
                id: 7,
                title: 'Get him to the theater to see movie',
                content: `He and his parent go to the theater to see movie avenger end game. After that, they go to restaurant 
                to have a dinner and complete a happy morning.`,
                isLast: true,
                nextSectionId: null
            },
            {
                id: 8,
                title: 'Go to the fixing-bike store',
                content: `He paid 150.000 vnd for the store's owner. therefore he did not have enough money to
                 pay for his girl friend, so he go home`,
                isLast: true,
                nextSectionId: null
            },  
            {
                id: 9,
                title: `Leave the bike at another friend's house`,
                content: `He go to girl friend house and take bus with her to go to the zoo. He complete the morning with the kiss 
                with the girl`,
                isLast: true,
                nextSectionId: null
            },
        ]
    }

    const [story, setStory] = useState(tempStory);
    const [currentSection, setCurrentSection] = useState({ title: tempStory.title, content: tempStory.intro });
    const [selectedSections, setSelectedSections] = useState([]);


    const getSectionById = (sectionId) => {
        return tempStory.sections.find(sec => sec.id === sectionId);
    }

    const formatSection = (section) => {
        if(section.options) {
            section.options.map(opt => ({ ...opt, isSelected: false, id: Math.random().toString() }));
        }
        return section;
    }

    const handleNextSection = () => {
        let nextSection;
        if(currentSection.options && currentSection.options.length > 0){
            const selectedOption = currentSection.options.find(opt => opt.isSelected);
            if(!selectedOption) return alert('You have to choose option');

            nextSection = getSectionById(selectedOption.nextSectionId);
            
            nextSection = formatSection(nextSection)

            selectedSections.push(nextSection.id);
        } else if(currentSection.nextSectionId) {
            nextSection = getSectionById(currentSection.nextSectionId);
            selectedSections.push(currentSection.nextSectionId);
        } else {
            nextSection = tempStory.sections[0];
            selectedSections.push(tempStory.sections[0].id);
        }
        setCurrentSection(JSON.parse(JSON.stringify(nextSection)));
        setSelectedSections([...selectedSections]);
    }

    const handleBackSection = () => {
        const length = selectedSections.length;
        selectedSections.pop();
        let prevSection;

        if(length >= 2){
            const id = selectedSections[length - 2];
            prevSection = getSectionById(id);
            
            prevSection = formatSection(prevSection)
        } else {
            prevSection = { title: tempStory.title, content: tempStory.intro };
        }

        setCurrentSection(JSON.parse(JSON.stringify(prevSection)));
        setSelectedSections([...selectedSections]);
    }

    const handleSelectOption = (index) => {
        currentSection.options.forEach(opt => opt.isSelected  = false);
        currentSection.options[index].isSelected = true;
        setCurrentSection({ ...currentSection });
    }
 
    return (        
        <MainLayout>
            <h3 className="text-center my-4">{ story.title }</h3>
            <div className="container">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            
                            <h5>{ currentSection.title }</h5>
                        </div>
                        <div className="card-body">
                            <p>{ currentSection.content }</p><br/>
                            {currentSection.options && currentSection.options.map((option, index) => (
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
                            ))}
                            <div>
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
                            </div>
                        </div>
                    </div>
               
                </div>
            </div>
        </MainLayout>
    );
};


export default HomePage;
