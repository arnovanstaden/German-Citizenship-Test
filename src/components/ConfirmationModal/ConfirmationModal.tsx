import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import styles from './styles.module.scss';

interface ConfirmationModalProps {
  onClose: () => void;
  title: string;
  description: string;
  open: boolean;
  continueButton: {
    label: string;
    colour: 'warning' | 'error' | 'success',
    onClick: () => void;
  },
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Box
        className={styles.ConfirmationModal}
        sx={{
          backgroundColor: 'grey.900'
        }}
      >
        <Typography variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {props.description}
        </Typography>
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          gap={2}
          marginTop={4}
        >
          <Button
            color="warning"
            variant="outlined"
            onClick={props.onClose}
          >
            Abbrechen
          </Button>
          <Button
            color={props.continueButton.colour}
            variant="contained"
            onClick={props.continueButton.onClick}
          >
            {props.continueButton.label}
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
