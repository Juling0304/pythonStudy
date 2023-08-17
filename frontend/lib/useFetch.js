export function forGetMethod(){
    return {        
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "same-origin",
        headers:{
            'Content-Type': 'application/json'
        }
    }
}

export function forGetMethodWithJWT(){
    const accessToken = sessionStorage.getItem('access')

    return {        
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "same-origin",
        headers:{
            'Authorization': 'Bearer ' + accessToken
        }
    }
}

export function forPostMethod(body=null){
    return {        
        method: 'Post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "same-origin",
        headers:{
            // 'Content-Type': 'application/json'
            'Accept': '*/*'
        },
        body: body
    }
}

export function forPostMethodWithJWT(body=null){

    const accessToken = sessionStorage.getItem('access')

    return {        
        method: 'Post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "same-origin",
        headers:{
            'Accept': '*/*',
            'Authorization': 'Bearer ' + accessToken
        },
        body: body
    }
}

export function forJWT(action){
    const formData = new FormData()

    if(action === 'verify'){
        const token = sessionStorage.getItem('access')
        formData.append('token',token)
    } else if(action === 'refresh'){
        const token = sessionStorage.getItem('refresh')
        formData.append('refresh',token)
    } else {
        return false
    }

    return {        
        method: 'Post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "same-origin",
        headers:{
            // 'Content-Type': 'application/json'
            'Accept': '*/*'
        },
        body: formData
    }

}

export async function asyncFetchData(url, headers) {
    return await fetch(url,headers)
}

export function fetchData(url, headers) {
    return fetch(url,headers)
}