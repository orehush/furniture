import './styles.css';
import { useParams } from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {getBoxesCSVData, getProjectDetails} from "./utils";
import {ExportCSV} from "./components/ExportCSV";
import Button from "reactstrap/lib/Button";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import ModalWrapper from "../../components/ModalWrapper";
import NewBoxForm from "./components/NewBoxForm";
import {deleteBox} from "../../utils/backend";
import EditBoxForm from "./components/EditBoxForm";


export default function ProjectDetails() {
    const { id } = useParams();
    const history = useHistory();
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editBox, setEditBox] = useState(null);

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
            <div className="mb-2">
                <div className="mb-2">
                    {project && boxes && <ExportCSV csvData={getBoxesCSVData(boxes)} fileName={project.name} />}
                </div>
                <div>
                    {project && <Button color='primary' onClick={() => setShowForm(true)}>Add new box</Button>}
                </div>
            </div>
            <h4>Список тумб</h4>
            <ListGroup className="mb-4">
                {boxes && boxes.map(box => {
                    return <ListGroupItem>
                        <div className="m-1 fw-bold">{box.short_name}</div>
                        <Button color="primary" className="mr-4" onClick={() => setEditBox(box)}>
                            Редагувати
                        </Button>
                        <Button color="danger" onClick={async () => {
                            await deleteBox(box.id);
                            queryClient.invalidateQueries(`project-detail-${id}`);
                        }}>
                            Видалити
                        </Button>
                    </ListGroupItem>
                })}
            </ListGroup>
            <h4>Список деталей</h4>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Тумба</th>
                        <th>Назва елементу</th>
                        <th>Тип матеріалу</th>
                        <th>Ширина</th>
                        <th>Довжина</th>
                        <th>Кількість</th>
                        <th>Площа</th>
                        <th>Площа з запасом</th>
                        <th>Кромка</th>
                        <th>Кромка з запасом</th>
                        <th>Кількість сверлінь</th>
                        <th>Обертання</th>
                    </tr>
                </thead>
                <tbody>
                    {boxes && boxes.map(box => {
                        return box.outputs.map(output => {
                            return <tr>
                                <td>{box.short_name}</td>
                                <td>{output.name}</td>
                                <td>{output.base}</td>
                                <td>{output.width || 0}</td>
                                <td>{output.length || 0}</td>
                                <td>{output.amount || 0}</td>
                                <td>{output.square || 0}</td>
                                <td>{output.square_extra || 0}</td>
                                <td>{output.edge || 0}</td>
                                <td>{output.edge_extra || 0}</td>
                                <td>{output.drilling_count || 0}</td>
                                <td>{output.rotation || 0}</td>
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
        <ModalWrapper show={!!editBox} onClose={() => setEditBox(null)}>
            <EditBoxForm
                onFinish={() => {
                    setEditBox(null);
                    queryClient.invalidateQueries(`project-detail-${id}`);
                }}
                box={editBox}
            />
        </ModalWrapper>
    </div>
}
