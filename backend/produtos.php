<?php

include "conexao.php";

$sql = "SELECT * FROM produtos";

$resultado = $conexao->query($sql);

$produtos = [];

if ($resultado) {

    while ($produto = $resultado->fetch_assoc()) {

        $produtos[] = $produto;

    }

}

echo json_encode($produtos);

$conexao->close();

?>