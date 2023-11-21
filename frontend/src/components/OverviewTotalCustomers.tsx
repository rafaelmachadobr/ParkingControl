import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { FaArrowDown, FaArrowUp, FaUsers } from "react-icons/fa";

interface OverviewTotalCustomersProps {
  difference?: number;
  positive?: boolean;
  sx?: object;
  value: string;
}

export const OverviewTotalCustomers = (props: OverviewTotalCustomersProps) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total de Clientes
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <FaUsers />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <FaArrowUp /> : <FaArrowDown />}
              </SvgIcon>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Desde o último mês
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
