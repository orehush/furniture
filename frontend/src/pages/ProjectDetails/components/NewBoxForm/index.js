import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState, useEffect} from "react";
import {createBox, getBoxTemplates} from "../../../../utils/backend";
import {useQuery} from "react-query";

const Field = ({ template, onChange }) => {
    const [value, setValue] = useState(template?.default_value);
    useEffect(() => {
        if (template.default_value) {
            setValue(template.default_value);
        }
    }, [template]);
    useEffect(() => {
        onChange(+value);
    }, [value]);

    if (template.type === 4) {
        return (
            <FormGroup tag="fieldset">
                <legend>{template.name}</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" value={1} onChange={e => setValue(e.target.value)}/>{' '}
                        Yes
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" value={0} onChange={e => setValue(e.target.value)}/>{' '}
                        No
                    </Label>
                </FormGroup>
            </FormGroup>
        )
    }

    return (
        <FormGroup>
            <Label for="name">{template.name}</Label>
            <Input type="number" name="name" placeholder={template.name} value={value} onChange={(e) => setValue(e.target.value)} />
        </FormGroup>
    )
}

export default function NewBoxForm({ onFinish, project }) {
    const [inputs, setInputs] = useState([]);
    const [template, setTemplate] = useState(null);
    const { data: templates } = useQuery('templates', () => getBoxTemplates())
    useEffect(() => {
        if (template && template.inputs) {
            setInputs(
                template.inputs.filter(i => i.default_value).map(i => ({ template: i.id, value: i.default_value }))
            )
        }
    }, [template]);

    return (
        <Form className="m-5">
            <h3>Create New Box</h3>
            {templates && templates.map(t => {
                return (
                    <div
                        key={t.id}
                        style={{ width: '150px', height: '150px', border: '1px solid #000', cursor: 'pointer' }}
                        className={`p-2 d-flex justify-content-center align-items-center ${t.id === template?.id && 'border-info border-2'}`}
                        onClick={() => setTemplate(t)}
                    >
                        <h4>{t.name}</h4>
                    </div>
                )
            })}
            {template && template.inputs && template.inputs.map(input => {
                return (
                    <Field template={input} onChange={(value) => {
                        setInputs(
                            [
                                ...inputs.filter(i => i.template !== input.id),
                                { template: input.id, value: value }
                            ]
                        )
                    }}/>
                )
            })}
            <Button
                onClick={async () => {
                    await createBox(template.id, project.id, inputs);
                    onFinish && onFinish();
                }}
                disabled={!template}
            >
                Submit
            </Button>
        </Form>
    );
}
