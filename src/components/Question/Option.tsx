import { Paper, Radio, Typography } from '@mui/material';

interface Props {
  onSelect: () => void;
  label: string;
  checked: boolean;
  disabled: boolean;
  correct?: boolean;
}

const Option: React.FC<Props> = (props) => {
  return (
    <Paper
      onClick={props.onSelect}
      sx={{
        padding: 2,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <Radio
        checked={props.checked}
        disabled={props.disabled}
        color={props.correct ? 'success' : 'error'}
      />
      <Typography>
        {props.label}
      </Typography>
    </Paper>
  );
};

export default Option;
