import { useEffect, useState } from 'preact/hooks';

const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  if (parts.length > 2) {
    return parts[0];
  }
  return null;
};

export function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const subdomain = getSubdomain();

  async function getUser() {
    try {
      const response = await fetch("https://api.slipe.fun/v2/user/" + (subdomain || "slipe"));
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error.message || String(error));
    }
  }


  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      {user && (
        <>
          <img src={`https://cdn.slipe.fun/avatars/${user?.avatar}`} width={100} height={100} />
          <h1>{user?.nickname || user?.username}</h1>
          <h2>{user?.description || "No description"}</h2>
        </>
      )}
      {error && (
        {error}
      )}
    </>
  )
}
