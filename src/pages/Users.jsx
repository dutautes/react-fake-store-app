import { useState, useEffect } from 'react';
import { Spinner } from "flowbite-react";
import { Card } from "flowbite-react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getUsers() {
        const url = "https://api.escuelajs.co/api/v1/users/1";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
    
          const result = await response.json();
          setUsers(result);
          setLoading(false);
        } catch (error) {
           console.error(error.message);
        }
      }
    
      useEffect(() => {
        getUsers();
      }, []);

      if(loading) {
          return (
            <div className="flex justify-center mx-auto">
              <Spinner aria-label="Default status example" />
              Sedang mengambil data...
            </div>
          )
        }
      
    return (
        <Card className="max-w-sm m-auto mt-3" imgSrc={users.avatar} horizontal>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {users.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                Email : {users.email}
                <br/>
                Role : {users.role}
            </p>
        </Card>
    )
}