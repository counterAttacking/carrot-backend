import express from "express";
import Article from "../model/article.model";

type NewArticle = {
    title: string;
    description: string;
    image: string;
    location: string;
    price: number;
    isAdjustable: boolean;
};

const router = express.Router();

// Database에 존재하는 거래 정보 모두 불러오기
// 지역 정보를 입력한 경우 지역이 동일한 거래 정보 모두 불러오기
router.get('/articles', async (req, res) => {
    const locQuery = req.query.loc;
    // const { location } = req.query; // destructing
    if (locQuery) {
        const locArticles: Article[] = await Article.findAll({
            where: {
                location: locQuery,
            },
        });
        return res.status(200).json(locArticles);
    }
    const articles: Article[] = await Article.findAll();
    return res.status(200).json(articles);
});

// 거래 ID를 이용하여 Database에 존재하는 거래 정보 찾기
router.get('/articles/:articleId', async (req, res) => {
    const { articleId } = req.params;
    if (!articleId) {
        return res.status(400).json();
    }

    const articleIdNumer: number = parseInt(articleId, 10);
    const article: Article | null = await Article.findByPk(articleIdNumer);
    if (!article) {
        return res.status(404).json();
    }
    return res.status(200).json(article);
});

// Database에 거래 글 및 정보 생성
router.post('/articles', async (req, res) => {
    const newArticle: NewArticle = req.body as NewArticle;
    if (!newArticle) {
        return res.status(400).json();
    }

    const article = await Article.create({
        title: newArticle.title,
        description: newArticle.description,
        image: newArticle.image,
        location: newArticle.location,
        price: newArticle.price,
        isAdjustable: newArticle.isAdjustable,
    });

    return res.status(201).json({
        id: article.id,
    });
});

export default router;