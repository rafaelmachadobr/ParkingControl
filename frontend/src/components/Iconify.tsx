import { Icon } from "@iconify/react";
import { forwardRef } from "react";

import Box from "@mui/material/Box";

interface IconifyProps {
  icon: string;
  sx?: object;
  width?: number;
}

const Iconify = forwardRef(
  ({ icon, width = 20, sx, ...other }: IconifyProps, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default Iconify;
