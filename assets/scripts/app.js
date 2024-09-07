function pesquisar() {
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    if (!validarPesquisa(campoPesquisa)) {
        clean();
        return;
    }

    campoPesquisa = campoPesquisa.toLowerCase();

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";
    let titulo = "";
    let descricao = "";
    let golpes = "";
    let tags = "";

    // Itera sobre cada dado da lista de dados
    for (let dado of dados) {
        titulo = dado.titulo.toLowerCase();
        descricao = dado.descricao.toLowerCase();
        golpes = dado.golpes.toLowerCase();
        tags = dado.tags.toLowerCase();
        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || golpes.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
            // cria um novo elemento
            resultados += `
            <div class="item-resultado">
                <h2><a href="#" target="_blank">${dado.titulo}</a></h2>
                <ul>
                    <li class="descricao-meta"> <strong>Descrição: </strong> ${dado.descricao}</li>
                    <li class="descricao-meta"> <strong>Habilidades: </strong> ${dado.habilidade}</li>
                    <li class="descricao-meta"> <strong>Golpes: </strong> ${dado.golpes}</li>
                    <li class="descricao-meta"> <strong>Pontos Fortes: </strong> ${dado.pontosFortes}</li>
                    <li class="descricao-meta"> <strong>Pontos Fracos: </strong> ${dado.pontosFracos}</li>
                </ul>
            </div>
        `;
        }
    }

    if (!resultados) {
        resultados = "<p>Que pena! Não temos nada associado ao termo digitado!</p>"
    }

    // Atribui os resultados gerados à seção HTML
    section.innerHTML = resultados;
}