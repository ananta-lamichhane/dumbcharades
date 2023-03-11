async function fetchMovie(url){
    const response = await fetch(url, {headers: {
      'x-api-key': 'xISumFnoBJ3cvS3ltGb0k2K8ESsVy34C3hIYCrzl'
    }})
    const respJSON = response.json()
    return respJSON
  
  }



function JSONPruner(JSONdata){
    console.log(JSONdata)
    let outputArr = []
    for(let i=0; i<JSONdata.length; i++){
      let currObj = JSONdata[i]
      let title = currObj.title
      outputArr.push(title)
    }

    console.log(outputArr)

  
}
export {fetchMovie, JSONPruner}