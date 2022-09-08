import { mdiHeart } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from "react";

const Heart = () => {
  const [iconInfo] = useState({
    path: mdiHeart,
    color: "#ED4956",
    size: 1,
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default Heart;
