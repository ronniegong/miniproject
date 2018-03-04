const url = 'https://plgaia-staging.herokuapp.com/api/v1/post_get_active/4Wa0y74X1mAKKIo2qgiWii';
const header={
    'Accept' : 'application/json,text/plain,*/*;',
    'Content-Type' : 'application/json;charset=UTF-8',
    'Authorization':'Token token=ZVKgYbjoOxoM9fvuhDvQOAtt'
}

export const getActivesFromUrl=function (){
    var cfg = {
        headers: header,
        method: 'GET',
    };
    return new Promise((resolve,reject)=> {
        fetch(url, cfg).then(resp => {
            return resp.json()
        }).then(resp => {
            console.log(resp)
            resolve(resp)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}
