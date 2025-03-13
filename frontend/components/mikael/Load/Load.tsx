import { ActivityIndicator } from 'react-native';
import { Container, Spinner } from './style';

export function Load(){
  return (
    <Container>
      <Spinner 
        color='#5636d3'
        size="large"
      />
    </Container>
  );
}