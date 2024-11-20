import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app)=>{
    // Converte estruturas em .json
    app.use(express.json()); 

    // Rota para buscar todos os posts no banco de dados
    app.get("/posts", listarPosts);
};

export default routes;