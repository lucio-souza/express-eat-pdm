import { Router } from "express"
import ItemController from "../controller/ItemController";
import upload from "../middlewares/configMulter";
import express from 'express';
import path from 'path';

const itemRouter = Router();

itemRouter.get('/',ItemController.listAll)
itemRouter.post('/',ItemController.createItem)
itemRouter.put("/:id",ItemController.updateItem)
itemRouter.delete('/:id',ItemController.deleteItem)
itemRouter.delete('/all/:id',ItemController.deleteAllItens)
itemRouter.get('/search/:id',ItemController.getItemById)
itemRouter.post('/:id', upload.single('image'), ItemController.uploadImage)

itemRouter.use('/images', express.static(path.join(__dirname, '../../uploads')));

// Rota para visualizar a imagem pelo nome do arquivo
itemRouter.get('/image/uploads/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads', filename);
    res.sendFile(filePath);
});

export default itemRouter;