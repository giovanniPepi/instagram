import { mdiInstagram } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from "react";

const InstagramIcon = () => {
  const [iconInfo] = useState({
    path: mdiInstagram,
    color: "#FF3041",
    size: 1.5,
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default InstagramIcon;
