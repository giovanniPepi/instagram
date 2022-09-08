import { mdiMessageReplyOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from "react";

const CommentIcon = () => {
  const [iconInfo] = useState({
    path: mdiMessageReplyOutline,
    color: "var(--font-rimary)",
    size: 1,
  });

  const { path, color, size, spin } = iconInfo;

  return <Icon path={path} color={color} size={size} spin={spin} />;
};

export default CommentIcon;
