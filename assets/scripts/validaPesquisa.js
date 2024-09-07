function validarPesquisa(campoPesquisa) {
    const regex = /^[a-zA-Z0-9çáãéêíóôõú\s]+$/i;
    if (!campoPesquisa) {
        alert("Pesquisa inválida! Você precisa digitar o nome de Hashira");
        return false;
    } else if (!regex.test(campoPesquisa)) {
        alert("Pesquisa inválida! Utilize apenas letras, números e espaços.");
        return false;
    }
    return true;
}