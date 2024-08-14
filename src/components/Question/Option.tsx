import { Paper, Radio, Typography } from '@mui/material';

interface Props {
  onSelect: () => void;
  label: string;
  checked: boolean;
  disabled: boolean;
  correct?: boolean;
}

const Option: React.FC<Props> = (props) => {
  const showHover = !props.checked && !props.disabled
  return (
    <Paper
      onClick={props.onSelect}
      sx={{
        padding: 2,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: props.correct ? 'success.main' : 'transparent',
        transition: 'border-color 0.3s ease-in-out',
        '&:hover': {
          borderColor: showHover ? 'warning.main' : undefined,
        },
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
