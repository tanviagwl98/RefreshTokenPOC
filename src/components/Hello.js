import React, {useState, useEffect} from 'react';

export default function Hello() {
    const [data, setData] = useState('');
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async() => {
        try{
            const res= await fetch('http://localhost:3000/');
            const data = await res.text();
            console.log(data);
            setData(data);
        }
        catch(err){
            console.error('Error!', err);
        }
    }
    
    return(
        <div>
            <h1>{data}, I am Tanvi</h1>
        </div>
    )
}