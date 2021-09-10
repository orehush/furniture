import './styles.css';
import {useQuery, useQueryClient} from "react-query";
import {getProjects} from "../../utils/backend";
import {Link} from "react-router-dom";
import ModalWrapper from "../../components/ModalWrapper";
import ProjectForm from "./components/ProjectForm";
import {useState} from "react";
import {Button} from "reactstrap";

export default function ProjectsList() {
    const { data, isLoading } = useQuery('project-list', () => getProjects());
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);

    return <div>
        <h1>Projects list</h1>
        {isLoading && <div>Loading...</div>}
        <ul>
            {data && data.results.map(project => (<li key={project.id}>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </li>))}
        </ul>
        <Button onClick={() => {setShowForm(true)}}>Add new project</Button>
        <ModalWrapper show={showForm} onClose={() => setShowForm(false)}>
            <ProjectForm onFinish={() => {
                queryClient.invalidateQueries('project-list');
                setShowForm(false);
            }}/>
        </ModalWrapper>
    </div>
}
