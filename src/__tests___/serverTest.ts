import app from './appTest';

const port = 8000;

app.listen(port, () => {
  console.log('O servidor está rodando em http://localhost:' + port);
});