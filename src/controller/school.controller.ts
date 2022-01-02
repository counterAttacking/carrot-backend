import express from "express";
import SchoolModel from "../model/school.model";

export type School = {
    name: string;
};

const router = express.Router();

// Database에 존재하는 학교 정보 모두 불러오기
router.get('/', async (req, res) => {
    const schools: SchoolModel[] = await SchoolModel.findAll();
    return res.status(200).json(schools);
});

// 학교 ID를 이용하여 Database에 존재하는 학교 찾기
router.get('/:schoolId', async (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(400).json();
    }

    const schoolIdNumer: number = parseInt(schoolId, 10);
    const school: SchoolModel | null = await SchoolModel.findByPk(schoolIdNumer);
    if (!school) {
        return res.status(404).json();
    }
    return res.status(200).json(school);
});

router.post('/', (req, res) => {
    const school: School = req.body as School;
    if (!school) {
        return res.status(400).json();
    }

    SchoolModel.create({
        name: school.name,
    });

    return res.status(201).json();
})

export default router;