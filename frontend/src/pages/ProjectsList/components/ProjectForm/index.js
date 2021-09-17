import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState} from "react";
import {createProject} from "../../../../utils/backend";

export default function ProjectForm({ onFinish }) {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');

    return (
        <Form className="m-5">
            <h3>Create New Project</h3>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="project name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="city">City</Label>
                <Input type="text" name="city" id="city" placeholder="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="street">Street</Label>
                <Input type="text" name="street" id="street" placeholder="street" value={street} onChange={(e) => setStreet(e.target.value)} />
            </FormGroup>
            <Button
                onClick={async () => {
                    await createProject({ name, city, street });
                    onFinish && onFinish();
                }}
                disabled={!name || !city}
            >
                Submit
            </Button>
        </Form>
    );
}
