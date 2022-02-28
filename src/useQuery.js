import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useQuery = ( {url, updates=null, method='GET', action = null, reduxCallback} ) => {
    
    const history = useHistory();
    const [apiData, setApiData] = useState();
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (action == 'Add') {
            setLoaded(true)
            return {loaded, setLoaded}
        } 
        const logic = async () => {
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
            if (response.status >= 400) {
                history.replace(history.location.pathname, { 
                    errorStatusCode: response.status 
            });
            } else {

            const data = await response.json()
            
            
            dispatch(reduxCallback(data))
            setApiData(data)
           
            setLoaded(true)
        }
        
        }
    else {
        const authToken = sessionStorage.getItem('token')
        // remember to set content-type in request
        const response = await fetch(`${process.env.API_URL}` + url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
                
            },
            method: method});
        console.log("status: ", response.status)
        if (response.status >= 400) {
          history.replace(history.location.pathname, { 
            errorStatusCode: response.status 
          });
        } else {
            const data = await response.json()
            dispatch(reduxCallback(data))
            setApiData(data)
           
            setLoaded(true)
            
        }
        
}  
        }
        logic()
    }, [url])
   
    return {data: apiData, loaded, setLoaded}
}
export default useQuery