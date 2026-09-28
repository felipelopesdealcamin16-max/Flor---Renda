<?php

include "conexao.php";

$nome = $_POST["nome"] ?? "";
$email = $_POST["email"] ?? "";
$senha = $_POST["senha"] ?? "";

if ($nome == "" || $email == "" || $senha == "") {
    echo "Preencha todos os campos.";
    exit;
}

$tipo = "cliente";

$sql = "INSERT INTO usuarios (nome, email, senha, tipo)
        VALUES (?, ?, ?, ?)";

$stmt = $conexao->prepare($sql);

if (!$stmt) {
    echo "Erro no banco: " . $conexao->error;
    exit;
}

$stmt->bind_param("ssss", $nome, $email, $senha, $tipo);

if ($stmt->execute()) {

    echo "sucesso";

} else {

    echo "Erro no cadastro: " . $stmt->error;

}

$stmt->close();
$conexao->close();

?>