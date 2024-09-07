function validarPesquisa(campoPesquisa) {
    const regex = /^[a-zA-Z0-9çáãéêíóôõú]+$/i; //Para permitir espaços acrescente \s no []
    if (!campoPesquisa) {
        alert("Pesquisa inválida! Você precisa digitar o nome de Hashira");
        return false;
    } else if (!regex.test(campoPesquisa)) {
        alert("Pesquisa inválida! Utilize apenas letras e números.");
        return false;
    }
    return true;
}