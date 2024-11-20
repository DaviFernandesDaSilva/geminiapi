import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.MONGO_CONEXAO);

export default async function getTodosPosts(){
    const db = conexao.db("gemini");
    const colecao = db.collection("posts");
    
    return colecao.find().toArray();
}