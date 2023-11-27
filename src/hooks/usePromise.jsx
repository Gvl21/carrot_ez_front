import React, { useEffect, useState } from 'react'

function usePromise(promiseCallBack, dependancyList) {
    const [resolve, setResolve] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try {
                const resolve = await promiseCallBack();
                setResolve(resolve);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
            }; 
            process();
        }, dependancyList);
  
    

  return [resolve, error, loading];

}

export default usePromise