import { mdiHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from "react";

const EmptyHeart = () => {
  const [iconInfo] = useState({
    path: mdiHeartOutline,
    color: "var(--font-rimary)",
    size: 1,
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default EmptyHeart;
