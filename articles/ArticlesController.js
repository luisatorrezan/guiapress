const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) =>{
    res.send("rota de artigos")
});

router.get("/admin/articles/new", (req, res) =>{
    res.send("rota de artigos")
});

// Rota para formulário de nova categoria
router.get("/admin/articles/new", (req, res) => {
    res.render("admin/articles/new");
});

// Rota para salvar categoria
router.post("/articles/save", (req, res) => {
    const title = req.body.title;
    console.log("Título recebido:", title);

    if (title != undefined && title.trim() !== "") {
        Articles.create({
            title: title,
            slug: slugify(title)
        }).then(articles => {
            console.log("Artigo salvo:", category);
            res.redirect("/admin/articles");
        }).catch(err => {
            console.error("Erro ao salvar artigo:", err);
            res.redirect("/admin/articles/new");
        });
    } else {
        res.redirect("/admin/article/new");
    }
});

// Rota para listagem de categorias
router.get("/admin/articles", (req, res) => {
    Articles.findAll().then(articles => {
        console.log("Artigos encontradas:", articles);
        res.render("admin/articles/index", { articles });
    }).catch(err => {
        console.error("Erro ao buscar artigos:", err);
        res.redirect("/");
    });
});

// Rota para deletar uma categoria
router.post("/articles/delete", (req, res) => {
    const id = req.body.id;

    if (id != undefined && !isNaN(id)) {
        Articles.destroy({
            where: { id: id }
        }).then(() => {
            console.log("Artigo deletado, ID:", id);
            res.redirect("/admin/articles");
        }).catch(err => {
            console.error("Erro ao deletar artigo:", err);
            res.redirect("/admin/articles");
        });
    } else {
        res.redirect("/admin/articles");
    }
});

module.exports = router;
