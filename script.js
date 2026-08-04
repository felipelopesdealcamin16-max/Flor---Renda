// =====================================
// CARRINHO DE COMPRAS
// =====================================

let carrinho = [];


// ADICIONAR PRODUTO

function adicionarCarrinho(nome, preco){

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if(produtoExistente){

        produtoExistente.quantidade++;

    }else{

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho.");

}


// ATUALIZAR TABELA DO CARRINHO

function atualizarCarrinho(){

    const tabela = document.getElementById("tabelaCarrinho");
    const totalCompra = document.getElementById("totalCompra");

    if(!tabela || !totalCompra){
        return;
    }

    tabela.innerHTML = `
        <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th>Remover</th>
        </tr>
    `;

    let total = 0;

    carrinho.forEach((produto, index) => {

        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;

        tabela.innerHTML += `
            <tr>

                <td>${produto.nome}</td>

                <td>
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </td>

                <td>

                    <button
                        type="button"
                        onclick="diminuirQuantidade(${index})">

                        -

                    </button>

                    ${produto.quantidade}

                    <button
                        type="button"
                        onclick="aumentarQuantidade(${index})">

                        +

                    </button>

                </td>

                <td>
                    R$ ${subtotal.toFixed(2).replace(".", ",")}
                </td>

                <td>

                    <button
                        type="button"
                        onclick="removerProduto(${index})">

                        Remover

                    </button>

                </td>

            </tr>
        `;

    });

    totalCompra.innerText =
        "Total: R$ " + total.toFixed(2).replace(".", ",");

}


// AUMENTAR QUANTIDADE

function aumentarQuantidade(index){

    carrinho[index].quantidade++;

    atualizarCarrinho();

}


// DIMINUIR QUANTIDADE

function diminuirQuantidade(index){

    carrinho[index].quantidade--;

    if(carrinho[index].quantidade <= 0){

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();

}


// REMOVER PRODUTO

function removerProduto(index){

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// =====================================
// FINALIZAR COMPRA
// =====================================

const formularioCompra = document.getElementById("formCompra");

if(formularioCompra){

    formularioCompra.addEventListener("submit", function(event){

        event.preventDefault();

        if(carrinho.length === 0){

            alert("Seu carrinho está vazio.");

            return;

        }

        const pagamentoSelecionado = document.querySelector(
            'input[name="pagamento"]:checked'
        );

        if(!pagamentoSelecionado){

            alert("Escolha uma forma de pagamento.");

            return;

        }

        let total = 0;

        carrinho.forEach(produto => {

            total += produto.preco * produto.quantidade;

        });

        const totalFormatado =
            total.toFixed(2).replace(".", ",");

        alert(
            "Compra finalizada com sucesso!\n\n" +
            "Forma de pagamento: " +
            pagamentoSelecionado.value +
            "\n" +
            "Total da compra: R$ " +
            totalFormatado
        );

        carrinho = [];

        atualizarCarrinho();

        formularioCompra.reset();

    });

}


// =====================================
// BOTÃO COMPRAR AGORA DO BANNER
// =====================================

const botaoBanner = document.querySelector("#inicio button");

if(botaoBanner){

    botaoBanner.addEventListener("click", function(){

        const secaoVestidos =
            document.getElementById("vestidos");

        if(secaoVestidos){

            secaoVestidos.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


// =====================================
// NEWSLETTER
// =====================================

const formularioNewsletter =
    document.querySelector("#newsletter form");

if(formularioNewsletter){

    formularioNewsletter.addEventListener(
        "submit",
        function(event){

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


// INICIA O CARRINHO VAZIO

atualizarCarrinho();