import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setHistory((prev) => [...prev, location.pathname]);
  }, [location]);

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); 
      const previousPath = newHistory.pop();
      setHistory(newHistory);
      navigate(previousPath); 
    }
  };

  return { history, goBack, navigate };
};
