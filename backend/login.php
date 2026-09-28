<?php

include "conexao.php";

$email = $_POST["email"] ?? "";
$senha = $_POST["senha"] ?? "";

if ($email == "" || $senha == "") {
    echo "Digite o e-mail e a senha.";
    exit;
}

$sql = "SELECT * FROM usuarios WHERE email = ?";

$stmt = $conexao->prepare($sql);

if (!$stmt) {
    echo "Erro no banco: " . $conexao->error;
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows == 0) {

    echo "E-mail ou senha incorretos.";

} else {

    $usuario = $resultado->fetch_assoc();

    if ($senha == $usuario["senha"]) {

        echo "sucesso";

    } else {

        echo "E-mail ou senha incorretos.";

    }
}

$stmt->close();
$conexao->close();

?>