import React, { useEffect, useState } from 'react';
// import Tree from 'react-tree-graph';
// import 'react-tree-graph/dist/style.css'


const TreeUIDemo = (props) => {

    const [chartConfig, setChartConfig] = useState({
        chart: {
            container: "#tree-simple"
        },
        nodeStructure: {}
    });

    const getSectionById = (sectionId) => {
        return props.story.sections.find(sec => sec.id === sectionId);
    }

    props.story.sections.forEach((section, index) => {
        if(section.level !== -1){
            if(section.nextSectionId){
                
            }
        }
    })

    var simple_chart_config = {
        chart: {
            container: "#tree-simple"
        },
        
        nodeStructure: {
            text: { name: "Parent node" },
            children: [
                {
                    text: { 
                        name: "First child",
                    },
                    children: [
                        { text: { name: 'grandchild 1' } },
                        { text: { name: 'grandchild 2' } }
                    ]
                },
                {
                    text: { name: "Second child" }
                }
            ]
        }
    };

    useEffect(() => {
        var chart = new window.Treant(simple_chart_config);
    }, []);

    // let data = {
    //     name: 'Parent',
    //     children: [{
    //         name: 'Child One'
    //     }, {
    //         name: 'Child Two'
    //     }]
    // };

    return (
        <div id="tree-simple" style={{ height: '300px', background: 'green' }}>
            {/* <Tree
                data={data}
                height={300}
                width={300}/> */}


        </div>
    );
};


export default TreeUIDemo;
