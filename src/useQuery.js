

const useQuery = async (url, updates = null, method = 'GET') => {
    
    if (updates) {
            const authToken = sessionStorage.getItem('token')
            // remember to set content-type in request
            const response = await fetch(`${process.env.API_URL}` + url, {
                body: JSON.stringify(updates),
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                method: method});
           
            const status = response.status
            const data = await response.json()
            
            return {data, status}        
    }
    else {
       
            const authToken = sessionStorage.getItem('token')
            // remember to set content-type in request
            const response = await fetch(`${process.env.API_URL}` + url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                    
                },
                method: method});
            const status = response.status
            const data = await response.json()
            console.log("response: ", {data, status})
            return {data, status}

    }  
}
export default useQuery