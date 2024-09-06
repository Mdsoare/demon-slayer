function clean() {
    const resultado = document.getElementById('resultados-pesquisa');
    const pesquisa = document.getElementById('campo-pesquisa');
    resultado.innerHTML = "";
    pesquisa.value = "";
}