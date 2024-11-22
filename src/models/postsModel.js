import 'dotenv/config'; // Garantir o uso do .env via cloud
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função para conectar ao banco de dados a partir do arquivo de configuração

// Estabelece a conexão com o banco de dados usando a string de conexão armazenada na variável de ambiente MONGO_CONEXAO
const conexao = await conectarAoBanco(process.env.MONGO_CONEXAO);

// Função para obter todos os posts
export async function getTodosPosts(){
    // Acessa o banco de dados chamado "gemini"
    const db = conexao.db("gemini");
    // Acessa a coleção chamada "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    
    // Retorna todos os documentos encontrados na coleção "posts" como um array
    return colecao.find().toArray();
}

// Função para inserir um novo post
export async function insertPost(novoPost){
    // Acessa o banco de dados chamado "gemini"
    const db = conexao.db("gemini");
    // Acessa a coleção chamada "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    
    // Insere o novo post na coleção "posts" e retorna o resultado da operação
    return colecao.insertOne(novoPost);
}

// Função para atualizar um post
export async function atualizarPost(id, postAtualizado){
    const db = conexao.db("gemini");
    const colecao = db.collection("posts");
    
    const objID = ObjectId.createFromHexString(id)

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:postAtualizado});
}

