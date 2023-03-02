import React from "react";

export const Alerta = ({ alerta }) => {
  return (
    <div className={`${alerta.error ? "bg-red-400" : "bg-green-400"} text-center w-full py-2 font-bold text-white`}>
      {alerta.msg}
    </div>
  );
};
