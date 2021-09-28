import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState, useEffect} from "react";
import {updateInput} from "../../../../utils/backend";

const Field = ({ template_type, template_name, default_value, onChange }) => {
    const [value, setValue] = useState(default_value);
    useEffect(() => {
        onChange(+value);
    }, [value]);

    if (template_type === 4) {
        return (
            <FormGroup tag="fieldset">
                <legend>{template_name}</legend>
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
            <Label for="name">{template_name}</Label>
            <Input type="number" name="name" placeholder={template_name} value={value} onChange={(e) => setValue(e.target.value)} />
        </FormGroup>
    )
}

export default function EditBoxForm({ onFinish, box }) {
    const [inputs, setInputs] = useState(box?.inputs || []);

    if (!box) {
        return null;
    }

    return (
        <Form className="m-5">
            <h3>Update Box - {box.short_name}</h3>
            {box.inputs && box.inputs.map(input => {
                return (
                    <Field onChange={(value) => {
                        setInputs(
                            [
                                ...inputs.filter(i => i.id !== input.id),
                                {
                                    id: input.id,
                                    value: value
                                }
                            ]
                        )
                    }} default_value={input.value} {...input} />
                )
            })}
            <Button
                onClick={async () => {
                    for (let input of inputs) {
                        console.log(input);
                        await updateInput(input.id, input.value)
                    }
                    onFinish && onFinish();
                }}
            >
                Update
            </Button>
        </Form>
    );
}
