const inputPokemon = document.getElementById('campo-pesquisa');

inputPokemon.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        pesquisar();
    }
});