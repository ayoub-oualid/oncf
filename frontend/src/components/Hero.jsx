import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>application privée</h1>
          <p className='text-center mb-4'>
            Cette application est intendue pour les employés de l'ONCF pour continuer veuillez vous connecter.
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Connecter
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
