import { Box, Paper, Radio, Typography } from '@mui/material';

interface Props {
  onSelect: () => void;
  label: string;
  image?: boolean
  checked: boolean;
  disabled: boolean;
  correct?: boolean;
}

const Option: React.FC<Props> = (props) => {
  const showHover = !props.checked && !props.disabled;
  const isIncorrect = props.correct === false && props.checked === true;

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
        borderColor: props.correct ? 'success.main' : isIncorrect ? 'error.main' : 'transparent',
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
      {props.image
        ? (
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              margin: '16px 0',
              width: '100%',
            }}
          >
            <img
              src={props.label}
              style={{
                width: '40%',
                height: 'auto',
                maxWidth: '200px',
                maxHeight: '200px',
              }}
            />
          </Box>
        )
        : (
          <Typography>
            {props.label}
          </Typography>
        )}
    </Paper>
  );
};

export default Option;
