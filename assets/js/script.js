import { dados } from './dados.js';

/**
 * Escapa caracteres especiais para prevenir DOM-based XSS.
 * @param {string} str 
 * @returns {string}
 */
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Valida a entrada do usuário.
 * Permite letras (com acento/cedilha), números e espaços (\s).
 * @param {string} termo 
 * @returns {boolean}
 */
function validarPesquisa(termo) {
    if (!termo || termo.trim() === '') {
        alert('Pesquisa inválida! Você precisa digitar o nome de um Hashira.');
        return false;
    }

    const regex = /^[a-zA-Z0-9çáàâãéèêíóôõúÇÁÀÂÃÉÈÊÍÓÔÕÚ\s]+$/;
    if (!regex.test(termo.trim())) {
        alert('Pesquisa inválida! Utilize apenas letras, números e espaços.');
        return false;
    }

    return true;
}

/**
 * Limpa os campos de pesquisa e os resultados no DOM.
 */
function limparPesquisa() {
    const sectionResultados = document.getElementById('resultados-pesquisa');
    const campoPesquisa = document.getElementById('campo-pesquisa');

    if (sectionResultados) sectionResultados.innerHTML = '';
    if (campoPesquisa) {
        campoPesquisa.value = '';
        campoPesquisa.focus();
    }
}

/**
 * Executa a lógica de pesquisa e renderiza os resultados sanitizados.
 */
function executarPesquisa() {
    const sectionResultados = document.getElementById('resultados-pesquisa');
    const campoInput = document.getElementById('campo-pesquisa');
    
    if (!campoInput || !sectionResultados) return;

    const termoOriginal = campoInput.value;

    if (!validarPesquisa(termoOriginal)) {
        limparPesquisa();
        return;
    }

    const termoBusca = termoOriginal.trim().toLowerCase();
    let resultadosHTML = '';

    for (const dado of dados) {
        const titulo = (dado.titulo || '').toLowerCase();
        const descricao = (dado.descricao || '').toLowerCase();
        const golpes = (dado.golpes || '').toLowerCase();
        const tags = (dado.tags || '').toLowerCase();

        if (
            titulo.includes(termoBusca) || 
            descricao.includes(termoBusca) || 
            golpes.includes(termoBusca) || 
            tags.includes(termoBusca)
        ) {
            // Aplicação de sanitização contra XSS em cada campo exibido no DOM
            const tituloSafe = escapeHTML(dado.titulo);
            const descricaoSafe = escapeHTML(dado.descricao);
            const habilidadeSafe = escapeHTML(dado.habilidade);
            const golpesSafe = escapeHTML(dado.golpes);
            const pontosFortesSafe = escapeHTML(dado.pontosFortes);
            const pontosFracosSafe = escapeHTML(dado.pontosFracos);

            resultadosHTML += `
                <div class="item-resultado">
                    <h2><a href="#" target="_blank" rel="noopener noreferrer">${tituloSafe}</a></h2>
                    <ul>
                        <li class="descricao-meta"><strong>Descrição: </strong>${descricaoSafe}</li>
                        <li class="descricao-meta"><strong>Habilidades: </strong>${habilidadeSafe}</li>
                        <li class="descricao-meta"><strong>Golpes: </strong>${golpesSafe}</li>
                        <li class="descricao-meta"><strong>Pontos Fortes: </strong>${pontosFortesSafe}</li>
                        <li class="descricao-meta"><strong>Pontos Fracos: </strong>${pontosFracosSafe}</li>
                    </ul>
                </div>
            `;
        }
    }

    if (!resultadosHTML) {
        resultadosHTML = '<p>Que pena! Não temos nada associado ao termo digitado!</p>';
    }

    sectionResultados.innerHTML = resultadosHTML;
}

// Registro centralizado e seguro de ouvintes de evento
document.addEventListener('DOMContentLoaded', () => {
    const btnPesquisar = document.getElementById('btn-pesquisar');
    const btnLimpar = document.getElementById('btn-limpar');
    const campoPesquisa = document.getElementById('campo-pesquisa');

    // Eventos de clique
    if (btnPesquisar) btnPesquisar.addEventListener('click', executarPesquisa);
    if (btnLimpar) btnLimpar.addEventListener('click', limparPesquisa);

    // Evento de tecla 'Enter' no input
    if (campoPesquisa) {
        campoPesquisa.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                executarPesquisa();
            }
        });
    }

    // Evento da tecla 'ESC' na página
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            limparPesquisa();
        }
    });
});