const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Configuração do cliente MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://db:27017';
const client = new MongoClient(mongoUrl);

// Tenta conectar ao banco de dados assim que a aplicação inicia
// O servidor web continuará funcionando mesmo que a conexão inicial falhe
client.connect()
  .then(() => console.log('✅ Conexão com MongoDB pronta.'))
  .catch(err => console.error('⚠️ Falha na conexão inicial com MongoDB:', err.message));

// Rota principal
app.get('/', async (req, res) => {
  try {
    // Ping para verificar se a conexão está ativa
    await client.db('admin').command({ ping: 1 });
    res.send('Servidor Node.js está rodando. O banco de dados (db) também está up!');
  } catch (error) {
    res.status(500).send('Servidor Node.js está rodando, mas não foi possível conectar ao banco de dados.');
  }
});

// Inicia o servidor Express
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
