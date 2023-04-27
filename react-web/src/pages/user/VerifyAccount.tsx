import React from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/misc/LoadingSpinner.tsx";

const VerifyAccountPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("c");


  return (
    <div>
      <h1>Verificar cuenta</h1>
      <p>Valor del parámetro "c": {code}</p>

      <LoadingSpinner />
    </div>
  );
};

export default VerifyAccountPage;
