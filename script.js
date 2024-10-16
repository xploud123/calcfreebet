function atualizarCalculo() {
    let odd1 = parseFloat(document.getElementById('odd1').value);
    let odd2 = parseFloat(document.getElementById('odd2').value);
    let freebet1 = parseFloat(document.getElementById('valorFreebet1').value) || 0;
    let isFreebet1 = document.getElementById('freebet1').checked;

    // Verificar se as odds são válidas
    if (isNaN(odd1) || isNaN(odd2)) {
        document.getElementById('resultado').innerHTML = 'Por favor, preencha todas as odds.';
        return;
    }

    // Definir o stake da aposta 1 (se for Freebet, usar o valor da freebet)
    let stake1 = isFreebet1 ? freebet1 : 1; // Aposta 1: Freebet ou valor base
    let retorno1 = isFreebet1 ? (freebet1 * (odd1 - 1)) : (stake1 * odd1); // Retorno se ganhar a aposta 1

    // Calcular a aposta na segunda odd (cobre o retorno da primeira)
    let stake2 = retorno1 / odd2;
    let retorno2 = stake2 * odd2; // Retorno se ganhar na aposta 2

    // Calcular o lucro garantido
    let lucro;
    if (isFreebet1) {
        lucro = Math.min(retorno1, retorno2) - stake2; // Se for Freebet, apenas desconta stake da aposta 2
    } else {
        lucro = Math.min(retorno1, retorno2) - (stake1 + stake2); // Normal: desconta stakes de ambas
    }

    // Exibir os resultados
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>Aposta na Odd 1: R$ ${stake1.toFixed(2)}</p>
        <p>Aposta na Odd 2: R$ ${stake2.toFixed(2)}</p>
        <p>Retorno na Aposta 1: R$ ${retorno1.toFixed(2)}</p>
        <p>Retorno na Aposta 2: R$ ${retorno2.toFixed(2)}</p>
        <p>Lucro Garantido: R$ ${lucro.toFixed(2)}</p>
    `;

    resultadoDiv.style.background = lucro > 0 ? '#e7ffe6' : '#ffe6e6'; // Verde para lucro, vermelho para prejuízo
}
