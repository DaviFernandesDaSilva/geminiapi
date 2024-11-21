import {getTodosPosts, insertPost} from "../models/postsModel.js";



export async function listarPosts(req, res){
    // Chama a função que busca todos os posts
    const result = await getTodosPosts();
    res.status(200).json(result);
}

export async function criarNovoPost(req, res){
    const novoPost = req.body;
    try{
        const postCriado = await insertPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na Requisição"})
    }
}