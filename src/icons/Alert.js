import { mdiAlertCircle } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from "react";

const Alert = () => {
  const [iconInfo] = useState({
    path: mdiAlertCircle,
    color: "rgb(235, 55, 35)",
    size: 1,
    spin: 1,
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default Alert;
