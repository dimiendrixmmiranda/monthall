export function limparDados() {
    localStorage.setItem('partidas', '0');
    localStorage.setItem('vitorias', '0');
    localStorage.setItem('derrotas', '0');
    window.location.reload()
}