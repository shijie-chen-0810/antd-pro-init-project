/*
 * typeMap.ts
 * Created by 还有醋v on 2022/4/29.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { Node } from "./Node";
import { Circle } from "./Circle";
import { Image } from "./Image";
import { Rect } from "./Rect";
import { Text } from "./Text";
import { Group } from "./Group";
import { Figure } from "./Figure";

export function getClass(key) {
  return {
    "Node": Node,
    "Circle": Circle,
    "Group": Group,
    "Rect": Rect,
    "Image": Image,
    "Text": Text,
    "Figure": Figure,
    // "Stage": Stage,
  }[key];
}
