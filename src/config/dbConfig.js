import { MongoClient } from "mongodb"; // Importa o MongoClient da biblioteca MongoDB para conectar ao banco de dados

// Função assíncrona para conectar ao banco de dados MongoDB
export default async function conectarAoBanco(stringConexao){
    let mongoClient; // Variável para armazenar a instância do MongoClient

    try{
        // Cria uma nova instância do MongoClient usando a string de conexão fornecida
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao cluster.."); // Mensagem de log indicando que a conexão está sendo iniciada
        
        // Tenta conectar ao cluster MongoDB
        await mongoClient.connect();
        console.log("Conectado ao Cluster do MongoDB!"); // Mensagem de log indicando que a conexão foi bem-sucedida
        
        // Retorna a instância do cliente Mongo conectado
        return mongoClient;
    } catch (erro){
        // Caso ocorra um erro durante a conexão, exibe a mensagem de erro no console
        console.error("Falha na conexão! ", erro);
        process.exit(); // Encerra o processo do Node.js devido à falha na conexão
    }
}
