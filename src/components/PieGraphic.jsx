import { ResponsivePie } from '@nivo/pie'

const PieGraphic = ({ data }) => {

    return (
        < ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }
            }
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'greens' }}
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
            //modificación
            arcLinkLabelsStraightLength={5}
            arcLinkLabelsTextOffset={3}
            //
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
            // Personalizar las etiquetas de arco
            arcLabel={d => `€ ${d.value}`}
            theme={{
                fontSize: 14
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
                ]}
            fill={[
                {
                    match: '*',
                    id: 'dots',
                }
            ]}
            legends={[]}
        />
    );
}

export default PieGraphic