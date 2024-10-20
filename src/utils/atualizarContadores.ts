// Função para atualizar os contadores de vitórias, derrotas e partidas
export function atualizarContadores(venceu: boolean) {
    let partidas = parseInt(localStorage.getItem('partidas') || '0', 10);
    let vitorias = parseInt(localStorage.getItem('vitorias') || '0', 10);
    let derrotas = parseInt(localStorage.getItem('derrotas') || '0', 10);

    partidas++;
    localStorage.setItem('partidas', partidas.toString());

    if (venceu) {
        vitorias++;
        localStorage.setItem('vitorias', vitorias.toString());
    } else {
        derrotas++;
        localStorage.setItem('derrotas', derrotas.toString());
    }
}