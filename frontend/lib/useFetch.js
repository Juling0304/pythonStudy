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

export async function asyncFetchData(url, headers) {
    return await fetch(url,headers)
}

export function fetchData(url, headers) {
    return fetch(url,headers)
}