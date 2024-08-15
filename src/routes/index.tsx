import { Grid } from '@mui/material';
import RootCard from '../components/RootCard/RootCard';

const IndexRoute: React.FC = () => {
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
