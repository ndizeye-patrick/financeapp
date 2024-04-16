import LogoutButton from "components/LogoutButton";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/companyUser', {
            credentials: 'include' // Include credentials to send cookies
          });
    
          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
          } else {
            // Redirect to the login page if the access token is invalid or expired
            window.location.href = '/'
          }
        } catch (error) {
          console.error('Error fetching user information:', error);
          window.location.href = '/'
        }
      };
    
      fetchUserInfo();
    }, []);
    
  
    if (!userInfo) {
      return <div>Loading...</div>;
    }
  
    const { name } = userInfo;

    return (
        <div className="relative pt-[18%] md:pt-[50%] m-10 m">
            <h1 className="text-xl text-blue-800 text-center">WELCOME {name}</h1>
            <LogoutButton/>
        </div>
    );
}
