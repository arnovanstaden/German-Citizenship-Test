import { Grid } from '@mui/material';
import RootCard from '../components/RootCard/RootCard';
import { usePageMeta } from '../hooks/pageTitle';

const IndexRoute: React.FC = () => {
  usePageMeta({
    title: 'Einbürgerungstest',
    description: 'Bereite dich auf den deutschen Einbürgerungstest vor. Übe mit über 300 Fragen, nimm an Quizzen teil und lerne die Bundesländer kennen.',
  });

  return (
    <Grid container maxWidth="xl" spacing={4}>
      <Grid item xs={12} md={6}>
        <RootCard
          href='/all'
          title='Alle Fragen'
          description='Hier findest du alle 300 Fragen, die in der Prüfung vorkommen können.'
          image='/static/images/indexCards/1.webp'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RootCard
          href='/quiz'
          title='Quiz'
          description='Hier kannst du ein Quiz mit zufälligen Fragen starten.'
          image='/static/images/indexCards/2.webp'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RootCard
          href='/answers'
          title='Antworten ansehen'
          description='Übung mit ausgewählten Antworten'
          image='/static/images/indexCards/5.webp'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RootCard
          href='/states'
          title='Bundesländer'
          description='Beantworte spezifische Fragen zu deinem Bundesland'
          image='/static/images/indexCards/6.webp'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RootCard
          href='/bookmarked'
          title='Lesezeichen Fragen'
          description='Hier findest du alle Fragen, die du mit einem Lesezeichen versehen hast.'
          image='/static/images/indexCards/3.webp'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RootCard
          href='/wrong'
          title='Zuletzt Falsch Beantwortet'
          description='Hier findest du alle Fragen, die du zuletzt falsch beantwortet hast.'
          image='/static/images/indexCards/4.webp'
        />
      </Grid>
    </Grid>
  );
};

export default IndexRoute;
