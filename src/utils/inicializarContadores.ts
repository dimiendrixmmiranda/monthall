// Função para inicializar os contadores no localStorage
export function inicializarContadores() {
    if (!localStorage.getItem('partidas')) {
        localStorage.setItem('partidas', '0');
    }
    if (!localStorage.getItem('vitorias')) {
        localStorage.setItem('vitorias', '0');
    }
    if (!localStorage.getItem('derrotas')) {
        localStorage.setItem('derrotas', '0');
    }
}