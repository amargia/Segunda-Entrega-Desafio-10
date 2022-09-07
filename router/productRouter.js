import express from "express";
import { Router } from "express";

const products = Router();

import { productosDao } from "../contenedores/daos/index.js";

class Admin {
    static isLogin() {
    return true;
    }
}

products.get("/", (req, res) => {
    productosDao.list()
    .then((data) => {
    res.status(200).send(data);
    });
})

products.get("/:id", (req, res) => {
    productosDao.getById(req.params.id)
    .then((data) => {
    res.status(201).json(data);
    });
})

products.post("/", (req, res) => {
    if (Admin.isLogin()) {
        const { name, description, code, price, thumbnail, stock } = req.body;
        productosDao.add({ name, description, code, price, thumbnail, stock })
        .then((data) => {
        res.status(201).json(data);
    })
    } else {
    res.status(401).json({ error: -1, descripcion: "ruta /productos/ metodo POST no autorizada" });
    }
});

products.delete("/:id", (req, res) => {
    if (Admin.isLogin()) {
        let id = req.params.id;
        productosDao.deleteById(id)
        .then((data) => {
            res.status(201).json(data);
        })
    } else {
        res.status(401).json({ error: -1, descripcion: "ruta /productos/ metodo DELETE no autorizada" });
    }
});

products.put("/:id", (req, res) => {
    if (Admin.isLogin()) {
        let id = req.params.id;
        const { name, description, code, price, thumbnail, stock } = req.body;
        productosDao.changeById(id, { name, description, code, price, thumbnail, stock })
        .then((data) => {
        res.status(201).json(data);
    })
    } else {
    res.status(401).json({ error: -1, descripcion: "ruta /productos/ metodo PUT no autorizada" });
    }
});

export { products };