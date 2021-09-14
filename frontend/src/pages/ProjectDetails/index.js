import './styles.css';
import { useParams } from "react-router-dom";
import {useQuery} from "react-query";
import {getBoxesCSVData, getProjectDetails} from "./utils";
import {ExportCSV} from "./components/ExportCSV";

export default function ProjectDetails() {
    let { id } = useParams();
    const { data: { project, boxes }, isLoading } = useQuery(
        `project-detail-${id}`,
        () => getProjectDetails(id),
        {
            initialData: {}
        }
    );

    return <div className="m-4">
        <h1>Project Details</h1>
        {isLoading && <div>Loading...</div>}
        <div>{project?.name}</div>
        <div>{project?.city}</div>
        <div>{project?.address}</div>
        <div className="mt-3">
            <div className="mb-2">
                {project && boxes && <ExportCSV csvData={getBoxesCSVData(boxes)} fileName={project.name} />}
            </div>
            <table className="table table-bordered table-striped w-50">
                <thead>
                    <tr>
                        <th>Тип матеріалу</th>
                        <th>Ширина</th>
                        <th>Довжина</th>
                        <th>Кількість</th>
                        <th>Площа</th>
                        <th>Площа з запасом</th>
                        <th>Кромка</th>
                        <th>Кромка з запасом</th>
                        <th>Кількість сверлінь</th>
                    </tr>
                </thead>
                <tbody>
                    {boxes && boxes.map(box => {
                        return box.outputs.map(output => {
                            return <tr>
                                <td>{output.base}</td>
                                <td>{output.width || 0}</td>
                                <td>{output.length || 0}</td>
                                <td>{output.amount || 0}</td>
                                <td>{output.square || 0}</td>
                                <td>{output.square_extra || 0}</td>
                                <td>{output.edge || 0}</td>
                                <td>{output.edge_extra || 0}</td>
                                <td>{output.drilling_count || 0}</td>
                            </tr>
                        })
                    })}
                </tbody>
            </table>
        </div>
    </div>
}
