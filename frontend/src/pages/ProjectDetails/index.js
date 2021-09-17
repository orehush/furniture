import './styles.css';
import { useParams } from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {getBoxesCSVData, getProjectDetails} from "./utils";
import {ExportCSV} from "./components/ExportCSV";
import Button from "reactstrap/lib/Button";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import ModalWrapper from "../../components/ModalWrapper";
import NewBoxForm from "./components/NewBoxForm";


export default function ProjectDetails() {
    const { id } = useParams();
    const history = useHistory();
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);

    const { data: { project, boxes }, isLoading } = useQuery(
        `project-detail-${id}`,
        () => getProjectDetails(id),
        {
            initialData: {}
        }
    );

    return <div className="m-5">
        <h1>Project Details</h1>
        <Button onClick={() => history.push('/')}>Go Back</Button>
        {isLoading && <div>Loading...</div>}
        <div>{project?.name}</div>
        <div>{project?.city}</div>
        <div>{project?.address}</div>
        <div className="mt-3">
            <div className="mb-2 w-50 d-flex justify-content-between">
                {project && boxes && <ExportCSV csvData={getBoxesCSVData(boxes)} fileName={project.name} />}
                {project && <Button color='primary' onClick={() => setShowForm(true)}>Add new box</Button>}
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
        <ModalWrapper show={showForm} onClose={() => setShowForm(false)}>
            <NewBoxForm
                onFinish={() => {
                    queryClient.invalidateQueries(`project-detail-${id}`);
                    setShowForm(false);
                }}
                project={project}
            />
        </ModalWrapper>
    </div>
}
