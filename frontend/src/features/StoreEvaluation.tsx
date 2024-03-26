import { Box, Rating, Typography } from "@mui/material";
import { StoreEvaluationProps } from "../types";

export const StoreEvaluation = ({
  taste,
  atmosphere,
  costPerformance,
}: StoreEvaluationProps) => {
  return (
    <Box>
      <Typography component="legend">味</Typography>
      <Rating name="read-only" value={taste} readOnly />
      <Typography component="legend">お店の雰囲気</Typography>
      <Rating name="read-only" value={atmosphere} />
      <Typography component="legend">コスパ</Typography>
      <Rating name="read-only" value={costPerformance} />
    </Box>
  );
};
