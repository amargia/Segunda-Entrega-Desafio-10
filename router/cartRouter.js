import express from "express";
import { Router } from "express";

const cart = Router();

import { carritoDao } from "../contenedores/daos/index.js";

cart.get("/", (req, res) => {
    carritoDao.list()
    .then((data) => {
    res.status(200).send(data);
    });
})

cart.get("/:id/productos", (req, res) => {
    carritoDao.getById(req.params.id)
    .then((data) => {
    res.status(201).json(data);
    });
})

cart.post("/", (req, res) => {
    const { id, timestamp, productos } = req.body;
    carritoDao.add({ id, timestamp, productos })
    .then((data) => {
    res.status(201).json(data);
    });
});

cart.delete("/:id", (req, res) => {
    let id = req.params.id;
    carritoDao.deleteById(id)
    .then((data) => {
        res.status(201).json(data);
    })
});

cart.post("/:id/productos/", (req, res) => {
    let idCart = req.params.id;
    const { name, description, code, price, thumbnail, stock } = req.body;
    carritoDao.addProduct(idCart, { name, description, code, price, thumbnail, stock })
    .then((data) => {
        res.status(201).json(data);
    })
});

export { cart };