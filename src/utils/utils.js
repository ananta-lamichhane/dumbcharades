async function fetchMovie(url){
    const response = await fetch(url, {headers: {
      'x-api-key': 'xISumFnoBJ3cvS3ltGb0k2K8ESsVy34C3hIYCrzl'
    }})
    const respJSON = response.json()
    return respJSON
  
  }

export {fetchMovie}