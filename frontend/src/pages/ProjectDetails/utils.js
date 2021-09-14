import {getProject, getProjectBoxes} from "../../utils/backend";

export const getProjectDetails = async (id) => {
    const project = await getProject(id);
    const boxes = await getProjectBoxes(id);
    return { project, boxes }
}

export const getBoxesCSVData = (boxes) => {
    if (!boxes) {
        return [];
    }
    const data = [
        [
            'Тип матеріалу',
            'Ширина',
            'Довжина',
            'Кількість',
            'Площа',
            'Площа з запасом',
            'Кромка',
            'Кромка з запасом',
            'Кількість сверлінь',
        ]
    ]
    boxes.forEach(box => {
        box.outputs.forEach(output => {
            data.push([
                output.base,
                output.width || 0,
                output.length || 0,
                output.amount || 0,
                output.square || 0,
                output.square_extra || 0,
                output.edge || 0,
                output.edge_extra || 0,
                output.drilling_count || 0,
            ])
        })
    })

    return data;
}