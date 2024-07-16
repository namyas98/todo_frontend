const API_ENDPOINT_URL = "http://localhost:4000/tasks"

export const getTasks = async () => {
    const data = await fetch(API_ENDPOINT_URL, {method: "GET"});
    const response = await data.json();
    return response;
}

export const createTask = async (task) => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    const data = await fetch(
        API_ENDPOINT_URL, 
        
        {
            method: "POST",
            body: JSON.stringify(task),
            headers: myHeaders,
        }
    );
    const response = await data.json()
    return response;
}

export const updateTask = async (task) => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const data = await fetch(
        API_ENDPOINT_URL, 
        {
            method: "PATCH",
            body: JSON.stringify(task),
            headers: myHeaders,
        }
    );
    const response = await data.json()
    return response;
}

export const deleteTask = async(id_parameter) => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    console.log(JSON.stringify(id_parameter))
    const data = await fetch(
        API_ENDPOINT_URL,
        {
            method: "DELETE",
            body: JSON.stringify(id_parameter),
            headers: myHeaders
        }
    )
    const response = await data.json();
    console.log(response)
    return response;
}
