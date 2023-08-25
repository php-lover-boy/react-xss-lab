import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const getEmail = localStorage.getItem("cookie");


  useEffect(() => {
    if (!getEmail) {
      navigate("/welcome");
    }
  }, [getEmail, navigate]);

  return children;
}
