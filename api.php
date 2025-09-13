<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "icecream_pos";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  die(json_encode(["error" => "DB connection failed."]));
}

$action = $_GET['action'] ?? '';

if ($action === 'getMenu') {
  $result = $conn->query("SELECT * FROM menu");
  $menu = [];
  while ($row = $result->fetch_assoc()) $menu[] = $row;
  echo json_encode($menu);
}

if ($action === 'addItem') {
  $data = json_decode(file_get_contents("php://input"), true);
  $name = $data['name'];
  $price = $data['price'];
  $stmt = $conn->prepare("INSERT INTO menu (name, price) VALUES (?, ?)");
  $stmt->bind_param("sd", $name, $price);
  $success = $stmt->execute();
  echo json_encode(["success" => $success]);
}

if ($action === 'checkout') {
  $data = json_decode(file_get_contents("php://input"), true);
  $items = json_encode($data['cart']);
  $total = 0;
  foreach ($data['cart'] as $item) $total += $item['price'] * $item['qty'];
  $stmt = $conn->prepare("INSERT INTO sales (items, total) VALUES (?, ?)");
  $stmt->bind_param("sd", $items, $total);
  $success = $stmt->execute();
  echo json_encode(["success" => $success]);
}

if ($action === 'getSales') {
  $result = $conn->query("SELECT * FROM sales ORDER BY created_at DESC");
  $sales = [];
  while ($row = $result->fetch_assoc()) $sales[] = $row;
  echo json_encode($sales);
}
?>
