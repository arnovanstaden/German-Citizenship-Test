import { Box, Container, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { Home } from '@mui/icons-material';
import { useQuiz } from '../../hooks/quiz';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { quizSettings, quizEnded, exitQuiz } = useQuiz();
  const [showContinueQuizModal, setShowContinueQuizModal] = useState(false);

  const handleHomeClick = () => {
    const quizInProgress = quizSettings.quizStarted && quizEnded === false;

    if (quizInProgress) {
      setShowContinueQuizModal(true);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header className={styles.Header}>
        <Container maxWidth="lg" className={styles.content}>
          <Box className={styles.logo}>
            <Typography variant="h5" fontWeight={600} onClick={handleHomeClick}>
              <span>🇩🇪 {' '}</span>
              Einbürgerungstest
            </Typography>
          </Box>
          {location.pathname !== '/' && (
            <IconButton
              disableRipple
              onClick={handleHomeClick}
            >
              <Home />
            </IconButton>
          )}
        </Container>

      </header>
      <ConfirmationModal
        title='Quiz beenden'
        description='Willst du dein aktuelles Quiz beenden? Alle Fortschritte gehen verloren.'
        open={showContinueQuizModal}
        onClose={() => setShowContinueQuizModal(false)}
        continueButton={{
          label: 'Quiz beenden',
          onClick: () => {
            setShowContinueQuizModal(false);
            exitQuiz('/');
          },
          colour: 'error',
        }}
      />
    </>

  );
};

export default Header;
