function checaLogin() {
    let email = "fulano@escola.pr.gov.br";
    let senha = "12345678";

    const criar = document.getElementById('configButtonCriar');
    const caixaEmail = document.getElementById('email');
    const caixaSenha = document.getElementById('senha');

    if (caixaEmail == email && caixaSenha == senha) {
        alert("Ok");
    }
}

function limpa(){
    document.getElementById('email').value = "";
    document.getElementById('senha').value = "";
}