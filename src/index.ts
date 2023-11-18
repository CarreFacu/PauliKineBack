// index.ts
import { app } from './app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));