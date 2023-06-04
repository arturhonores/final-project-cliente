import { ResponsivePie } from '@nivo/pie'

const Data = [
    {
        "id": "c",
        "label": "c",
        "value": 393,
        "color": "hsl(321, 70%, 50%)"
    },
    {
        "id": "make",
        "label": "make",
        "value": 166,
        "color": "hsl(20, 70%, 50%)"
    },
    {
        "id": "rust",
        "label": "rust",
        "value": 394,
        "color": "hsl(94, 70%, 50%)"
    },
    {
        "id": "erlang",
        "label": "erlang",
        "value": 141,
        "color": "hsl(134, 70%, 50%)"
    },
    {
        "id": "scala",
        "label": "scala",
        "value": 367,
        "color": "hsl(140, 70%, 50%)"
    }
]

const PieGraphic = ({ data = Data }) => {

    return (
        < ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }
            }
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={
                [
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
            fill={
                [
                    {
                        match: {
                            id: 'ruby'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
            legends={
                [
                    // {
                    //     anchor: 'right',
                    //     direction: 'column',
                    //     justify: false,
                    //     translateX: 0,
                    //     translateY: 56,
                    //     itemsSpacing: 0,
                    //     itemWidth: 100,
                    //     itemHeight: 18,
                    //     itemTextColor: '#999',
                    //     itemDirection: 'left-to-right',
                    //     itemOpacity: 1,
                    //     symbolSize: 18,
                    //     symbolShape: 'circle',
                    //     effects: [
                    //         {
                    //             on: 'hover',
                    //             style: {
                    //                 itemTextColor: '#000'
                    //             }
                    //         }
                    //     ]
                    // }
                ]}
        />
    );
}

export default PieGraphic