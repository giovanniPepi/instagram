import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from "react";

const BackIcon = () => {
  const [iconInfo] = useState({
    path: mdiArrowLeft,
    color: "var(--font-primary)",
    size: 1,
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default BackIcon;
