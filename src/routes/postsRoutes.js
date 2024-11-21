import express from "express";
import { listarPosts, criarNovoPost} from "../controllers/postsController.js";

const routes = (app)=>{
    // Converte estruturas em .json
    app.use(express.json()); 

    // Rota GET para buscar todos os posts no banco de dados
    app.get("/posts", listarPosts); 

    // Rota POST para criar um post no banco de dados
    app.post("/posts", criarNovoPost);

    
};

export default routes;