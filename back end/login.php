<?php

include "conexao.php";

$email = $_POST["email"] ?? "";
$senha = $_POST["senha"] ?? "";

$email = trim($email);
$senha = trim($senha);

if ($email == "" || $senha == "") {
    echo "Preencha o e-mail e a senha.";
    exit;
}

$sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ? LIMIT 1";

$stmt = $conexao->prepare($sql);

if (!$stmt) {
    echo "Erro no banco: " . $conexao->error;
    exit;
}

$stmt->bind_param("ss", $email, $senha);

if (!$stmt->execute()) {
    echo "Erro ao executar login: " . $stmt->error;
    exit;
}

$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {

    echo "sucesso";

} else {

    echo "E-mail ou senha incorretos.";

}

$stmt->close();
$conexao->close();

?>