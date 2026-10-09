// Variável global para armazenar a emoção selecionada
let selectedEmocao = "Não informada";

// Navegação entre Páginas
function showPage(pageId, element) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  document.getElementById(pageId).classList.add('active');
  if(element) element.classList.add('active');
}

// Seleção de Tags no Formulário
function selectTag(type, value) {
  if (type === 'emocao') {
    selectedEmocao = value;
    const buttons = document.querySelectorAll('#form-triagem .tag-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    // Destacar botão clicado
    event.target.classList.add('selected');
  }
}

// Exercício Básico de Respiração Guia (4s inspira, 4s segura, 6s solta)
function startBreathing() {
  const circle = document.querySelector('.breath-circle');
  const text = document.getElementById('breath-text');
  
  text.innerText = "Inspire...";
  circle.classList.add('expand');

  setTimeout(() => {
    text.innerText = "Segure...";
  }, 4000);

  setTimeout(() => {
    text.innerText = "Expire...";
    circle.classList.remove('expand');
  }, 8000);

  setTimeout(() => {
    text.innerText = "Concluído";
  }, 14000);
}

// Formatação e Envio do Relatório para WhatsApp
function sendWhatsAppReport() {
  const sono = document.getElementById('sono').value;
  const apoio = document.getElementById('apoio').value;
  const contato = document.getElementById('contato-confianca').value || "Não informado";
  const atividade = document.getElementById('atividade-calma').value || "Não informada";
  const lugar = document.getElementById('lugar-seguro').value || "Não informado";
  const numWhatsApp = document.getElementById('whatsapp-num').value.replace(/\D/g, '');

  if (!numWhatsApp) {
    alert("Por favor, digite um número de WhatsApp válido (apenas números com DDD).");
    return;
  }

  // Montagem da mensagem estruturada
  const mensagem = `*🌿 Resumo do Espaço Calma*

*Estado e Sentimentos:*
- Emoção principal: ${selectedEmocao}
- Qualidade do sono: ${sono}
- Conexão social: ${apoio}

*Plano de Apoio Pessoal:*
- Contato de apoio: ${contato}
- Atividade relaxante: ${atividade}
- Lugar seguro: ${lugar}

_Nota: Este é um registro pessoal de autocuidado e não um diagnóstico profissional._`;

  // Codificação de URL para o link do WhatsApp
  const urlEncodedMessage = encodeURIComponent(mensagem);
  const waUrl = `https://wa.me/${numWhatsApp}?text=${urlEncodedMessage}`;

  // Redirecionamento
  window.open(waUrl, '_blank');
}
