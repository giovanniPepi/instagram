import { mdiPlusBox } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from "react";

const PlusIcon = () => {
  const [iconInfo] = useState({
    path: mdiPlusBox,
    color: "var(--primary-text)",
    size: 1.4,
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default PlusIcon;
