import express from "express"; // Importa o framework Express para criar o servidor
import multer from "multer"; // Importa o multer para lidar com upload de arquivos

// Importa funções do controlador que lida com posts
import { listarPosts, criarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configuração do armazenamento de arquivos para o multer
const storage = multer.diskStorage({
    // Define o destino onde os arquivos enviados serão armazenados
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define a pasta "uploads/" como destino
    },
    // Define o nome do arquivo a ser armazenado
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usa o nome original do arquivo
    }
});

// Configura o multer para utilizar o armazenamento definido e o destino padrão
const upload = multer({ dest: "./uploads", storage });
// Comentário para Linux ou macOS, onde o `storage` pode ser removido
// const upload = multer({ dest: "./uploads" })

// Função para definir as rotas da aplicação
const routes = (app) => {
    // Middleware para converter estruturas de dados recebidas para JSON
    app.use(express.json());

    // Rota GET para buscar todos os posts no banco de dados
    app.get("/posts", listarPosts);

    // Rota POST para criar um novo post no banco de dados
    app.post("/posts", criarNovoPost);

    // Rota POST para o upload de imagem, usando o middleware do multer para lidar com o arquivo enviado
    app.post("/upload", upload.single("imagem"), uploadImagem);
};

// Exporta as rotas para serem usadas em outras partes da aplicação
export default routes;
