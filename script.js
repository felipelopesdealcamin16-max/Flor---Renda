// =====================================
// CARRINHO DE COMPRAS
// =====================================

// CARREGA O CARRINHO SALVO
let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];


// =====================================
// SALVAR CARRINHO
// =====================================

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}


// =====================================
// ADICIONAR PRODUTO AO CARRINHO
// =====================================

function adicionarCarrinho(nome, preco) {

    const produtos =
        document.querySelectorAll(".produto");

    let tamanho = "";

    produtos.forEach(function(produto) {

        const titulo =
            produto.querySelector("h2");

        if (titulo && titulo.innerText === nome) {

            const seletor =
                produto.querySelector(".seletor-tamanho");

            if (seletor) {
                tamanho = seletor.value;
            }

        }

    });


    // VERIFICA SE ESCOLHEU O TAMANHO

    if (tamanho === "" || tamanho === "Escolha") {

        alert("Escolha um tamanho antes de adicionar ao carrinho.");

        return;

    }


    // PROCURA O MESMO PRODUTO COM O MESMO TAMANHO

    const produtoExistente = carrinho.find(
        function(produto) {

            return produto.nome === nome &&
                   produto.tamanho === tamanho;

        }
    );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,
            preco: preco,
            tamanho: tamanho,
            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    mostrarAvisoCarrinho(
        nome + " - Tamanho " + tamanho
    );

}


// =====================================
// AVISO DO CARRINHO
// =====================================

function mostrarAvisoCarrinho(nome) {

    const avisoAntigo =
        document.querySelector(".aviso-carrinho");

    if (avisoAntigo) {
        avisoAntigo.remove();
    }


    const aviso =
        document.createElement("div");

    aviso.className = "aviso-carrinho";


    aviso.innerHTML = `

        <div class="icone-aviso">
            ✓
        </div>

        <div class="texto-aviso">

            <strong>
                Adicionado ao carrinho!
            </strong>

            <span>
                ${nome}
            </span>

        </div>

        <a href="carrinho.html">
            Ver Carrinho
        </a>

    `;


    document.body.appendChild(aviso);


    setTimeout(function() {

        aviso.classList.add("mostrar");

    }, 50);


    setTimeout(function() {

        aviso.classList.remove("mostrar");

        setTimeout(function() {

            aviso.remove();

        }, 400);

    }, 4000);

}


// =====================================
// ATUALIZAR TABELA DO CARRINHO
// =====================================

function atualizarCarrinho() {

    const tabela =
        document.getElementById("tabelaCarrinho");

    const totalCompra =
        document.getElementById("totalCompra");


    if (!tabela || !totalCompra) {
        return;
    }


    tabela.innerHTML = `

        <tr>

            <th>Produto</th>

            <th>Tamanho</th>

            <th>Preço</th>

            <th>Quantidade</th>

            <th>Total</th>

            <th>Remover</th>

        </tr>

    `;


    let total = 0;


    carrinho.forEach(function(produto, index) {

        const subtotal =
            produto.preco * produto.quantidade;

        total += subtotal;


        tabela.innerHTML += `

            <tr>

                <td>
                    ${produto.nome}
                </td>

                <td>
                    ${produto.tamanho || "Não informado"}
                </td>

                <td>
                    R$ ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}
                </td>

                <td>

                    <button
                        type="button"
                        onclick="diminuirQuantidade(${index})"
                        class="botao-quantidade"
                    >
                        -
                    </button>

                    <span class="quantidade-produto">
                        ${produto.quantidade}
                    </span>

                    <button
                        type="button"
                        onclick="aumentarQuantidade(${index})"
                        class="botao-quantidade"
                    >
                        +
                    </button>

                </td>

                <td>
                    R$ ${subtotal
                        .toFixed(2)
                        .replace(".", ",")}
                </td>

                <td>

                    <button
                        type="button"
                        onclick="removerProduto(${index})"
                        class="botao-remover"
                    >
                        Remover
                    </button>

                </td>

            </tr>

        `;

    });


    totalCompra.innerText =
        "Total: R$ " +
        total.toFixed(2).replace(".", ",");

}


// =====================================
// AUMENTAR QUANTIDADE
// =====================================

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    salvarCarrinho();

    atualizarCarrinho();

}


// =====================================
// DIMINUIR QUANTIDADE
// =====================================

function diminuirQuantidade(index) {

    carrinho[index].quantidade--;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    salvarCarrinho();

    atualizarCarrinho();

}


// =====================================
// REMOVER PRODUTO
// =====================================

function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    atualizarCarrinho();

}


// =====================================
// FAVORITOS
// =====================================

let favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];


// =====================================
// SALVAR FAVORITOS
// =====================================

function salvarFavoritos() {

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

}


// =====================================
// ADICIONAR AOS FAVORITOS
// =====================================

function adicionarFavorito(nome) {

    const produtoExiste =
        favoritos.includes(nome);


    if (produtoExiste) {

        mostrarAvisoFavorito(
            nome,
            "Já está nos favoritos!"
        );

        return;

    }


    favoritos.push(nome);

    salvarFavoritos();

    mostrarAvisoFavorito(
        nome,
        "Adicionado aos favoritos!"
    );

}


// =====================================
// MOSTRAR FAVORITOS
// =====================================

function mostrarFavoritos() {

    if (favoritos.length === 0) {

        alert(
            "Você ainda não possui produtos favoritos."
        );

        return;

    }


    let lista =
        "Meus Favoritos:\n\n";


    favoritos.forEach(
        function(produto, index) {

            lista +=
                (index + 1) +
                " - " +
                produto +
                "\n";

        }
    );


    alert(lista);

}


// =====================================
// AVISO DOS FAVORITOS
// =====================================

function mostrarAvisoFavorito(nome, mensagem) {

    const avisoAntigo =
        document.querySelector(".aviso-favorito");


    if (avisoAntigo) {
        avisoAntigo.remove();
    }


    const aviso =
        document.createElement("div");


    aviso.className =
        "aviso-favorito";


    aviso.innerHTML = `

        <div class="icone-favorito">
            ♥
        </div>

        <div class="texto-favorito">

            <strong>
                ${mensagem}
            </strong>

            <span>
                ${nome}
            </span>

        </div>

    `;


    document.body.appendChild(aviso);


    setTimeout(function() {

        aviso.classList.add("mostrar");

    }, 50);


    setTimeout(function() {

        aviso.classList.remove("mostrar");

        setTimeout(function() {

            aviso.remove();

        }, 400);

    }, 3500);

}


// =====================================
// FINALIZAR COMPRA
// =====================================

const formularioCompra =
    document.getElementById("formCompra");


if (formularioCompra) {

    formularioCompra.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (carrinho.length === 0) {

                alert(
                    "Seu carrinho está vazio."
                );

                return;

            }


            const pagamentoSelecionado =
                document.querySelector(
                    'input[name="pagamento"]:checked'
                );


            if (!pagamentoSelecionado) {

                alert(
                    "Escolha uma forma de pagamento."
                );

                return;

            }


            let total = 0;


            carrinho.forEach(function(produto) {

                total +=
                    produto.preco *
                    produto.quantidade;

            });


            const totalFormatado =
                total
                    .toFixed(2)
                    .replace(".", ",");


            alert(

                "Compra finalizada com sucesso!\n\n" +

                "Forma de pagamento: " +
                pagamentoSelecionado.value +

                "\n" +

                "Total da compra: R$ " +
                totalFormatado

            );


            carrinho = [];

            salvarCarrinho();

            atualizarCarrinho();

            formularioCompra.reset();

        }
    );

}


// =====================================
// BOTÃO COMPRAR AGORA
// =====================================

const botaoBanner =
    document.querySelector("#inicio button");


if (botaoBanner) {

    botaoBanner.addEventListener(
        "click",
        function() {

            const secaoVestidos =
                document.getElementById("vestidos");


            if (secaoVestidos) {

                secaoVestidos.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


// =====================================
// NEWSLETTER
// =====================================

const formularioNewsletter =
    document.querySelector("#newsletter form");


if (formularioNewsletter) {

    formularioNewsletter.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const campoEmail =
                formularioNewsletter.querySelector(
                    'input[type="email"]'
                );


            alert(
                "E-mail cadastrado com sucesso: " +
                campoEmail.value
            );


            formularioNewsletter.reset();

        }
    );

}


// =====================================
// EFEITO SCROLL NO MENU
// =====================================

const linksScroll =
    document.querySelectorAll(".menu a");


const secoesScroll =
    document.querySelectorAll(
        "#inicio, #vestidos, #saias, #promocoes, #sobre, #contato"
    );


window.addEventListener(
    "scroll",
    function() {

        let secaoAtual = "inicio";


        secoesScroll.forEach(
            function(secao) {

                if (
                    window.scrollY >=
                    secao.offsetTop - 200
                ) {

                    secaoAtual = secao.id;

                }

            }
        );


        linksScroll.forEach(
            function(link) {

                link.classList.remove("ativo");


                if (
                    link.getAttribute("href") ===
                    "#" + secaoAtual
                ) {

                    link.classList.add("ativo");

                }

            }
        );

    }
);


// =====================================
// TAMANHOS E MEDIDAS DAS ROUPAS
// =====================================

function adicionarTamanhosProdutos() {

    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(function(produto) {

        const botaoCarrinho = produto.querySelector(
            'button[onclick*="adicionarCarrinho"]'
        );

        const titulo = produto.querySelector("h2");

        if (!botaoCarrinho || !titulo) {
            return;
        }

        if (produto.querySelector(".area-tamanho")) {
            return;
        }

        const area = document.createElement("div");

        area.className = "area-tamanho";

        area.innerHTML = `
            
            <label>
                Tamanho:
            </label>

            <select class="seletor-tamanho">

                <option value="Escolha">
                    Escolha
                </option>

                <option value="PP">
                    PP
                </option>

                <option value="P">
                    P
                </option>

                <option value="M">
                    M
                </option>

                <option value="G">
                    G
                </option>

                <option value="GG">
                    GG
                </option>

            </select>

            <button
                type="button"
                class="botao-medidas"
            >
                📏 Ver medidas
            </button>

        `;

        botaoCarrinho.parentNode.insertBefore(
            area,
            botaoCarrinho
        );

        const botaoMedidas =
            area.querySelector(".botao-medidas");

        botaoMedidas.addEventListener(
            "click",
            function() {

                mostrarMedidas(
                    titulo.innerText
                );

            }
        );

    });

}


// =====================================
// MOSTRAR MEDIDAS
// =====================================

function mostrarMedidas(nomeProduto) {

    const ehSaia = nomeProduto
        .toLowerCase()
        .includes("saia");

    let titulo;
    let conteudo;

    if (ehSaia) {

        titulo = "Medidas das Saias";

        conteudo = `
            <table class="tabela-medidas">

                <tr>
                    <th>Tamanho</th>
                    <th>Cintura</th>
                    <th>Quadril</th>
                </tr>

                <tr>
                    <td>PP</td>
                    <td>60 - 64 cm</td>
                    <td>86 - 90 cm</td>
                </tr>

                <tr>
                    <td>P</td>
                    <td>64 - 68 cm</td>
                    <td>90 - 94 cm</td>
                </tr>

                <tr>
                    <td>M</td>
                    <td>68 - 74 cm</td>
                    <td>94 - 100 cm</td>
                </tr>

                <tr>
                    <td>G</td>
                    <td>74 - 80 cm</td>
                    <td>100 - 106 cm</td>
                </tr>

                <tr>
                    <td>GG</td>
                    <td>80 - 86 cm</td>
                    <td>106 - 112 cm</td>
                </tr>

            </table>
        `;

    } else {

        titulo = "Medidas dos Vestidos";

        conteudo = `
            <table class="tabela-medidas">

                <tr>
                    <th>Tamanho</th>
                    <th>Busto</th>
                    <th>Cintura</th>
                    <th>Quadril</th>
                </tr>

                <tr>
                    <td>PP</td>
                    <td>80 - 84 cm</td>
                    <td>60 - 64 cm</td>
                    <td>86 - 90 cm</td>
                </tr>

                <tr>
                    <td>P</td>
                    <td>84 - 88 cm</td>
                    <td>64 - 68 cm</td>
                    <td>90 - 94 cm</td>
                </tr>

                <tr>
                    <td>M</td>
                    <td>88 - 94 cm</td>
                    <td>68 - 74 cm</td>
                    <td>94 - 100 cm</td>
                </tr>

                <tr>
                    <td>G</td>
                    <td>94 - 100 cm</td>
                    <td>74 - 80 cm</td>
                    <td>100 - 106 cm</td>
                </tr>

                <tr>
                    <td>GG</td>
                    <td>100 - 106 cm</td>
                    <td>80 - 86 cm</td>
                    <td>106 - 112 cm</td>
                </tr>

            </table>
        `;

    }


    // =====================================
    // CRIAR JANELA
    // =====================================

    const modal = document.createElement("div");

    modal.className = "modal-medidas";

    modal.innerHTML = `

        <div class="caixa-medidas">

            <button
                type="button"
                class="fechar-medidas"
            >
                ×
            </button>

            <h2>${titulo}</h2>

            ${conteudo}

            <p>
                As medidas podem variar de acordo com
                a modelagem de cada peça.
            </p>

        </div>

    `;

    document.body.appendChild(modal);


    // =====================================
    // FECHAR NO X
    // =====================================

    modal.querySelector(".fechar-medidas")
        .addEventListener("click", function() {

            modal.remove();

        });


    // =====================================
    // FECHAR CLICANDO FORA
    // =====================================

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {

            modal.remove();

        }

    });

}


// =====================================
// INICIAR SITE
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        adicionarTamanhosProdutos();

        atualizarCarrinho();

    }
);


// =====================================
// EFEITOS DE ROLAGEM
// =====================================

const elementosScroll =
    document.querySelectorAll("main section");


elementosScroll.forEach(
    function(elemento) {

        elemento.classList.add(
            "efeito-scroll"
        );

    }
);


const observadorScroll =
    new IntersectionObserver(
        function(elementos) {

            elementos.forEach(
                function(elemento) {

                    if (elemento.isIntersecting) {

                        elemento.target.classList.add(
                            "aparecer"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


elementosScroll.forEach(
    function(elemento) {

        observadorScroll.observe(elemento);

    }
);


// =====================================
// EFEITO DE ROLAGEM MODERNO
// =====================================

const elementosReveal =
    document.querySelectorAll(
        ".titulo, .produto, .sobre-texto, .rodape-coluna"
    );


const imagensReveal =
    document.querySelectorAll(
        ".colecao-card, .logoBanner"
    );


elementosReveal.forEach(
    function(elemento) {

        elemento.classList.add(
            "scroll-reveal"
        );

    }
);


imagensReveal.forEach(
    function(elemento) {

        elemento.classList.add(
            "scroll-imagem"
        );

    }
);


const observerReveal =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "aparecer"
                        );

                        observerReveal.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


elementosReveal.forEach(
    function(elemento) {

        observerReveal.observe(elemento);

    }
);


imagensReveal.forEach(
    function(elemento) {

        observerReveal.observe(elemento);

    }
);


// =====================================
// ANIMAÇÃO AO CLICAR NAS ABAS
// =====================================

const linksMenuAnimacao =
    document.querySelectorAll(".menu a");


linksMenuAnimacao.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function() {

                const destinoId =
                    link.getAttribute("href");


                if (!destinoId.startsWith("#")) {
                    return;
                }


                const secao =
                    document.querySelector(destinoId);


                if (!secao) {
                    return;
                }


                secao.classList.remove(
                    "animar-secao"
                );


                void secao.offsetWidth;


                secao.classList.add(
                    "animar-secao"
                );


                setTimeout(
                    function() {

                        secao.classList.remove(
                            "animar-secao"
                        );

                    },
                    800
                );

            }
        );

    }
);


// =====================================
// SCROLL ANIMADO - FLOR & RENDA
// =====================================

const titulosScroll =
    document.querySelectorAll(
        ".titulo, .titulo-colecao"
    );


titulosScroll.forEach(
    function(elemento) {

        elemento.classList.add(
            "scroll-item",
            "scroll-baixo"
        );

    }
);


// CARDS DOS PRODUTOS

const produtosScroll =
    document.querySelectorAll(".produto");


produtosScroll.forEach(
    function(elemento, index) {

        elemento.classList.add(
            "scroll-item"
        );


        if (index % 2 === 0) {

            elemento.classList.add(
                "scroll-esquerda"
            );

        } else {

            elemento.classList.add(
                "scroll-direita"
            );

        }

    }
);


// IMAGENS DA NOVA COLEÇÃO

const colecaoScroll =
    document.querySelectorAll(
        ".colecao-card"
    );


colecaoScroll.forEach(
    function(elemento) {

        elemento.classList.add(
            "scroll-item",
            "scroll-zoom"
        );

    }
);


// SOBRE

const sobreScroll =
    document.querySelectorAll(
        ".sobre-texto"
    );


sobreScroll.forEach(
    function(elemento) {

        elemento.classList.add(
            "scroll-item",
            "scroll-baixo"
        );

    }
);


// CONTATO E RODAPÉ

const outrosScroll =
    document.querySelectorAll(
        "#contato p, .rodape-coluna"
    );


outrosScroll.forEach(
    function(elemento, index) {

        elemento.classList.add(
            "scroll-item"
        );


        if (index % 2 === 0) {

            elemento.classList.add(
                "scroll-esquerda"
            );

        } else {

            elemento.classList.add(
                "scroll-direita"
            );

        }

    }
);


// OBSERVADOR DO SCROLL

const observerScrollAnimado =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "aparecer"
                        );


                        observerScrollAnimado.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


produtosScroll.forEach(
    function(elemento) {

        observerScrollAnimado.observe(
            elemento
        );

    }
);


titulosScroll.forEach(
    function(elemento) {

        observerScrollAnimado.observe(
            elemento
        );

    }
);


colecaoScroll.forEach(
    function(elemento) {

        observerScrollAnimado.observe(
            elemento
        );

    }
);


sobreScroll.forEach(
    function(elemento) {

        observerScrollAnimado.observe(
            elemento
        );

    }
);


outrosScroll.forEach(
    function(elemento) {

        observerScrollAnimado.observe(
            elemento
        );

    }
);
