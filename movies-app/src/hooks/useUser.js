import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser, authenticateUser } from '../authentication';

export function useUser() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {authenticaded, user} = getAuthenticatedUser();
    if (user && authenticaded) {
      setUser(user);
      setAuthenticated(authenticaded);
    } else if (user && !authenticaded) {
      authenticateUser(user).then((authenticated) => {
        if (authenticated) {
          setAuthenticated(true);
        }
      });
    } else {
    }
  }, [authenticated, navigate]);

  return { user, authenticated };
}