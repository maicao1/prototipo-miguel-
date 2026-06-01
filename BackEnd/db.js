const mysql = require("mysql2/promise");


// conexão
async function connect() {
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;

    const connection = await mysql.createConnection(
        "mysql://root:02Aluno02#@localhost:3306/EduNet"
    );

    console.log("Conectado ao MySQL!");
    global.connection = connection;
    return connection;
}

// fim do script de conexão

// READ (Ler todos)
async function selectProdutos() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM Produtos;");
    return rows;
}

// CREATE (Inserir)
async function insertProdutos(prod) {
    const conn = await connect();
    const sql = "INSERT INTO Produtos(codigoProduto, descricao, quantidade) VALUES (?,?,?);";
    const values = [prod.codigoProduto, prod.descricao, prod.quantidade];
    return await conn.query(sql, values);
}

// UPDATE (Atualizar)
async function updateProduto(codigo, prod) {
    const conn = await connect();
    const sql = "UPDATE Produtos SET descricao=?, quantidade=? WHERE codigoProduto=?";
    const values = [prod.descricao, prod.quantidade, codigo];
    return await conn.query(sql, values);
}

// DELETE (Remover)
async function deleteProduto(codigo) {
    const conn = await connect();
    return await conn.query("DELETE FROM Produtos WHERE codigoProduto=?;", [codigo]);
}

module.exports = { selectProdutos, insertProdutos, updateProduto, deleteProduto };
