
let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"
const quadro1 = document.querySelector(".codigo")
const quadro2 = document.querySelector(".preview")
const caixaAlerta = document.querySelector(".caixa-texto")
const alertStyle = document.createElement('style')

const placeholders = [
    "Ex: Bola azul pulando",
    "Ex: Quero um card com sombra e bordas arredondadas",
    "Ex: Quero um layout de página com header, main e footer",
    "Ex: Quero um formulário de login estilizado",
    "Ex: Quero um botão vermelho com bordas arredondadas",
    "Ex: Quero um alerta de sucesso",
    "Descreva o que deseja criar...",
    "Ex: Quero um layout de blog com sidebar",
    "Ex: Quero um card de produto com imagem e descrição",
];

const textarea = document.querySelector(".caixa-texto");

const indiceAleatorio = Math.floor(Math.random() * placeholders.length);

textarea.placeholder = placeholders[indiceAleatorio];

function limparAlerta() {
    caixaAlerta.style.border = "1px solid #27272a"
    alertStyle.innerHTML = `.caixa-texto::placeholder {
        color: none;
        }`
    document.head.appendChild(alertStyle);
    textarea.placeholder = placeholders[indiceAleatorio];
}

async function gerarCodigo() {

    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    if (textoUsuario.trim() === "") {
        caixaAlerta.style.border = "2px solid red"
        caixaAlerta.placeholder = "*Por favor, insira uma descrição para gerar o código."
        alertStyle.innerHTML = `.caixa-texto::placeholder {
        color: rgba(255, 0, 0);
        }`
        document.head.appendChild(alertStyle);
        quadro1.style.display = "none"
        quadro2.style.display = "none"
    } else {

        let resposta = await fetch(endereco, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b",
                messages: [
                    {
                        role: "system",
                        content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
                    },
                    {
                        role: "user",
                        content: textoUsuario
                    }
                ]
            })
        })

        let dados = await resposta.json()
        let resultado = dados.choices[0].message.content

        blocoCodigo.textContent = resultado
        resultadoCodigo.srcdoc = resultado
        quadro1.style.display = "block"
        quadro2.style.display = "block"
    }

}

botao.addEventListener("click", gerarCodigo)
caixaAlerta.addEventListener("input", limparAlerta)