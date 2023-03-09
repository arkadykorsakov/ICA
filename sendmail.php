<?php
// Токен телеграм бота
$tg_bot_token = "6237742104:AAG1QSxKf6jLIA7q912yW2xQUpNwwD_TnzE";
// ID Чата
$chat_id = "-1001712535711";

$text = "<b>Заявка с сайта!</b>\n";

if (!empty($_POST["name"])) {
	$text .= "<b>Отправитель:</b> " . $_POST["name"] . "\n";
}

if (!empty($_POST["email"])) {
	$text .= "<b>Email:</b> " . $_POST["email"] . "\n";
}

if (!empty($_POST["tel"])) {
	$text .= "<b>Телефон:</b> " . $_POST["tel"] . "\n";
}

if (!empty($_POST["service"])) {
	$text .= "<b>Услуга:</b> " . $_POST["service"] . "\n";
}

$param = [
	"chat_id" => $chat_id,
	"text" => $text,
	"parse_mode" => "html",
];

$url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendMessage?" . http_build_query($param);

$sendToTelegram = fopen($url, "r");

if ($sendToTelegram) {
	return true;
} else {
	return false;
}
