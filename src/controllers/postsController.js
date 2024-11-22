import {getTodosPosts, insertPost, atualizarPost} from "../models/postsModel.js"; // Importa funções para obter e inserir posts do modelo de dados
import fs from "fs"; // Importa o módulo de sistema de arquivos do Node.js
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts
export async function listarPosts(req, res){
    // Chama a função que busca todos os posts do banco de dados
    const result = await getTodosPosts();
    // Retorna os posts como uma resposta JSON com status 200 (sucesso)
    res.status(200).json(result);
}

// Função para criar um novo post
export async function criarNovoPost(req, res){
    // Obtém o conteúdo do novo post do corpo da requisição
    const novoPost = req.body;
    try{
        // Tenta inserir o novo post no banco de dados
        const postCriado = await insertPost(novoPost);
        // Se bem-sucedido, responde com o post criado como JSON com status 200
        res.status(200).json(postCriado);
    } catch(erro){
        // Em caso de erro, exibe a mensagem de erro no console
        console.error(erro.message);
        // Retorna uma resposta de erro 500 com uma mensagem JSON
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}

// Função para fazer upload de uma imagem e criar um novo post com ela
export async function uploadImagem(req, res){
    // Cria um novo post com uma imagem, utilizando o nome do arquivo enviado
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname, // Atribui o nome do arquivo enviado à propriedade imgUrl
        alt: ""
    };
    try{
        // Insere o novo post no banco de dados
        const postCriado = await insertPost(novoPost);
        // Define o caminho de onde a imagem deve ser armazenada, com base no ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia/move o arquivo da imagem enviada para o novo caminho
        fs.renameSync(req.file.path, imagemAtualizada);

        // Responde com o post criado como JSON com status 200
        res.status(200).json(postCriado);
    } catch(erro){
        // Em caso de erro, exibe a mensagem de erro no console
        console.error(erro.message);
        // Retorna uma resposta de erro 500 com uma mensagem JSON
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}

export async function atualizarNovoPost(req, res){
    // Obtém o conteúdo do novo post do corpo da requisição
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricaoGemini = await gerarDescricaoComGemini(imgBuffer);

        const postAtualizado = {
            descricao: descricaoGemini,
            imgUrl: urlImagem,
            alt: req.body.alt,
        }

        const postCriado = await atualizarPost(id, postAtualizado);

        res.status(200).json(postCriado);
    } catch(erro){
        // Em caso de erro, exibe a mensagem de erro no console
        console.error(erro.message);
        // Retorna uma resposta de erro 500 com uma mensagem JSON
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}