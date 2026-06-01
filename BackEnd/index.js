const db = require("./db");
const readline = require("readline");

// Configuração para ler dados do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função auxiliar para transformar a pergunta do terminal em uma Promise (permite usar await)
const pergunta = (texto) => new Promise((resolve) => rl.question(texto, resolve));

async function iniciarMenu() {
    console.log("\n--- MENU CRUD PRODUTOS ---");
    console.log("[C] - Inserir (Create)");
    console.log("[R] - Listar (Read)");
    console.log("[U] - Atualizar (Update)");
    console.log("[D] - Deletar (Delete)");
    console.log("[S] - Sair");

    const opcao = (await pergunta("Escolha uma opção: ")).toUpperCase();

    try {
        switch (opcao) {
            case "C":
                console.log("\n>> Inserindo Novo Produto");
                const codC = await pergunta("Código do Produto: ");
                const descC = await pergunta("Descrição: ");
                const qtdC = await pergunta("Quantidade: ");

                await db.insertProdutos({
                    codigoProduto: parseInt(codC),
                    descricao: descC,
                    quantidade: parseInt(qtdC)
                });
                console.log("✅ Produto cadastrado com sucesso!");
                break;

            case "R":
                console.log("\n>> Lista de Produtos no Banco:");
                const produtos = await db.selectProdutos();
                console.table(produtos);
                break;

            case "U":
                const codU = await pergunta("Digite o código do produto que deseja EDITAR: ");
                const descU = await pergunta("Nova Descrição: ");
                const qtdU = await pergunta("Nova Quantidade: ");

                await db.updateProduto(codU, {
                    descricao: descU,
                    quantidade: parseInt(qtdU)
                });
                console.log("✅ Produto atualizado!");
                break;

            case "D":
                const codD = await pergunta("Digite o código do produto que deseja DELETAR: ");
                await db.deleteProduto(codD);
                console.log("🗑️ Produto removido do banco.");
                break;

            case "S":
                console.log("Encerrando sistema...");
                rl.close();
                process.exit();
                break;

            default:
                console.log("❌ Opção inválida! Tente C, R, U, D ou S.");
        }
    } catch (error) {
        console.error("⚠️ Ocorreu um erro:", error.message);
    }

    // Chama a função novamente para o menu nunca fechar sozinho
    iniciarMenu();
}

console.log("Teste");

// Inicia o programa pela primeira vez
iniciarMenu();
