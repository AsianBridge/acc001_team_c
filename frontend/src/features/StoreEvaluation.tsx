import { Box, Rating, Typography } from "@mui/material";
import { SetStoreEvaluationProps, StoreEvaluationProps } from "../types";

export const ShowStoreEvaluation = ({
  taste,
  atmosphere,
  costPerformance,
}: StoreEvaluationProps) => {
  return (
    <Box>
      <Typography component="legend">味</Typography>
      <Rating name="read-only" value={taste} max={5} />
      <Typography component="legend">お店の雰囲気</Typography>
      <Rating name="read-only" value={atmosphere} max={5} />
      <Typography component="legend">コスパ</Typography>
      <Rating name="read-only" value={costPerformance} max={5} />
    </Box>
  );
};

export const SetStoreEvaluation = ({
  taste,
  atmosphere,
  costPerformance,
  setTaste,
  setAtmosphere,
  setCostPerformance,
}: SetStoreEvaluationProps) => {
  return (
    <Box>
      <Typography component="legend">味</Typography>
      <Rating
        name="simple-controlled"
        value={taste}
        max={5}
        onChange={(event) => {
          const newValue = parseFloat((event.target as HTMLInputElement).value);
          if (!newValue) return 0;
          else setTaste(newValue);
        }}
      />
      <Typography component="legend">お店の雰囲気</Typography>
      <Rating
        name="simple-controlled"
        value={atmosphere}
        max={5}
        onChange={(event) => {
          const newValue = parseFloat((event.target as HTMLInputElement).value);
          if (!newValue) return 0;
          else setAtmosphere(newValue);
        }}
      />
      <Typography component="legend">コスパ</Typography>
      <Rating
        name="simple-controlled"
        value={costPerformance}
        max={5}
        onChange={(event) => {
          const newValue = parseFloat((event.target as HTMLInputElement).value);
          if (!newValue) return 0;
          else setCostPerformance(newValue);
        }}
      />
    </Box>
  );
};
