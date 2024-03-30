import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useSessionId() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    let id = localStorage.getItem('sessionId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('sessionId', id);
    }
    setSessionId(id);
  }, []);

  return sessionId;
}
