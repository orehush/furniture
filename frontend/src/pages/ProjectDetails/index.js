import './styles.css';
import { useParams } from "react-router-dom";
import {useQuery} from "react-query";
import {getProject} from "../../utils/backend";

export default function ProjectDetails() {
    let { id } = useParams();
    const { data: project, isLoading } = useQuery(`project-detail-${id}`, () => getProject(id));

    return <div>
        <h1>Project Details</h1>
        {isLoading && <div>Loading...</div>}
        <div>{project?.name}</div>
        <div>{project?.city}</div>
        <div>{project?.address}</div>
    </div>
}
