import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao){
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao cluster..");
        await mongoClient.connect();
        console.log("Conectado ao Cluster do MongoDB!");
        
        return mongoClient
    } catch (erro){
        console.error("Falha na conexão! ", erro);
        process.exit();
    }
}