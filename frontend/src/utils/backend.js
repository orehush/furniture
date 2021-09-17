import { isEmpty } from 'lodash';

const notEmpty = (value, defaultValue) => {
    return isEmpty(value) ? defaultValue : value;
}

const request = async (method, path, queryParams, data, headers) => {
    const queryString = Object.entries(notEmpty(queryParams, {})).map(([key, value]) => `${key}=${value}`).join('&')
    const response = await fetch(`/api${path}?${queryString}`, {
        method: method.toUpperCase(),
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            ...(notEmpty(headers, {}))
        },
        body: isEmpty(data) ? null : JSON.stringify(data)
    });
    return await response.json();
}

export const getProjects = (page = 1) => {
    return request('GET', '/projects', { page });
}

export const getProject = (id) => {
    return request('GET', `/projects/${id}`);
}

export const createProject = ({ city, street, name }) => {
    return request('POST', `/projects`, null, { city, street, name });
}

export const getProjectBoxes = (pk) => {
    return request('GET', `/projects/${pk}/nightstands`);
}

export const getBoxTemplates = () => {
    return request('GET', `/nightstand_templates`);
}

export const createBox = (template, project, inputs) => {
    return request('POST', '/nightstands', null, { template, project, inputs })
}

export const deleteBox = (pk) => {
    return request('DELETE', '/nightstands')
}
