import express from "express";
import routes from "./src/routes/postsRoutes.js";
const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/300"
    },
    {
        id: 2,
        descricao: "Gato brincando com um novelo de lã",
        imagem: "https://placecats.com/neo/300/300"
    },
    {
        id: 3,
        descricao: "Um gato preguiçoso tomando sol",
        imagem: "https://placecats.com/millie_neo/300/300"
    },
    {
        id: 4,
        descricao: "Gato curioso olhando pela janela",
        imagem: "https://placecats.com/neo_banana/300/300"
    },
    {
        id: 5,
        descricao: "Gatinho ronronando no colo",
        imagem: "https://placecats.com/neo_2/300/300"
    },
    {
        id: 6,
        descricao: "Gato se escondendo em uma caixa",
        imagem: "https://placecats.com/bella/300/300"
    },
    {
        id: 7,
        descricao: "Gato comendo ração",
        imagem: "https://placecats.com/millie_neo/300/300"
    },
    {
        id: 8,
        descricao: "Gato pulando para pegar um brinquedo",
        imagem: "https://placecats.com/neo_2/300/300"
    }
];

const app = express();
routes(app);

app.listen(3000, ()=>{
    console.log("Server running..");
});

// function buscarPostPorID(id){
//     return posts.findIndex((post) => {
//         return post.id === Number(id);
//     })
// }

// // app.get("/posts/:id", (req,res)=>{
// //     const index = buscarPostPorID(req.params.id);
// //     res.status(200).json(posts[index]);
// // });