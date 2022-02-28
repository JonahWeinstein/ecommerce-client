import { useHistory } from "react-router-dom";

const useQuery = async (url, updates = null, method = 'GET', reduxCallback) => {
    // const history = useHistory()
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
            if (status != 'ok') {
                throw new Error('Unable to execute query')
            }
            const data = await response.json()
            reduxCallback(data)
            return data        
    }
    else {
       
            const authToken = sessionStorage.getItem('token')
            // remember to set content-type in request
            const response = await fetch(`${process.env.API_URL}` + url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                    
                },
                method: method});

                if (response.status != 200) {
                    throw new Error('Unable to execute query')
                }
                const data = await response.json()
                reduxCallback(data)
            return data

    }  
}
export default useQuery