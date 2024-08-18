import { Box, Paper, Radio, Typography } from '@mui/material';

interface Props {
  onSelect: () => void;
  label: string;
  image?: boolean
  checked: boolean;
  disabled: boolean;
  correct?: boolean;
  state?: string;
}

const Option: React.FC<Props> = (props) => {
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
              height: '100%'
            }}
          >
            <img
              src={props.label}
              loading='lazy'
              style={{
                maxWidth: '180px',
                maxHeight: '180px',
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
