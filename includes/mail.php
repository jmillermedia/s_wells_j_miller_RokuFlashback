<?php
// ini_set('display_errors', 1);

header('Access-Control-Allow-Origin*'); 
header('Content-Type: application/json; charset=UTF-8'); // allows the browser to parse the data in JSON format.
$results = [];
$visitor_name = '';
$visitor_email = '';
$visitor_message = '';
$visitor_subject = '';
$name_pattern = '/^[a-zA-Z ]*$/';



// 1. Check the submission and validate the data [is there non-mailable items?]
if(empty($_POST['firstname'])) { // check to see if the first name is empty.
    $results['message'] = 'You need to fill out a first name.'; // send 'message' to alert box
    echo json_encode($results); // echo $results from the line above.
    die(); // kill the script.
} else if(!preg_match("/^[a-zA-Z-' ]*$/", $_POST['firstname'])) { // use !preg_match to validate the characters in the form.
    $results['message'] ='Your first name can only contain letters.';
    echo json_encode($results);
    die();
} else {
    $visitor_name = filter_var($_POST['firstname'], FILTER_SANITIZE_STRING);
}

if (empty($_POST['lastname'])) {
    $results['message'] = 'You need to fill out a last name.';
    echo json_encode($results);
    die();
} else if(!preg_match("/^[a-zA-Z-' ]*$/", $_POST['lastname'])) {
    $results['message'] ='Your last name can only contain letters.';
    echo json_encode($results);
    die();
} else {
    $visitor_name .= ' '.filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);
}

if (empty($_POST['email'])) {
    $results['message'] ='You need to include an email address.';
    echo json_encode($results);
    die();
} else if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) { // only run if the email format did not validate.
    $results['message'] ='This email is invalid. Please check and try again.';
    echo json_encode($results);
    die();
} else {
    $visitor_email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
}

if(isset($_POST['subject'])) {
    $visitor_subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
}

if (empty($_POST['message'])) {
    $results['message'] = "Please write a message before you submit.";
    echo json_encode($results);
    die();
} else {
    $visitor_message = filter_var(htmlspecialchars($_POST['message']), FILTER_SANITIZE_STRING);
}

// Captcha Code:
// if (empty($_POST['g-recaptcha-response'])) {
//     $results['message'] = "Please tick off the reCAPTCHA box.";
//     echo json_encode($results);
//     die();
// } else if($responseKeys = json_decode($response, true)){
//     $visitor_message = filter_var(htmlspecialchars($_POST['message']), FILTER_SANITIZE_STRING);
// } //else {
//    $results['message'] = "Are you a robot? Please try the reCAPTCHA again.";
//    echo json_encode($results);
//    die();
//}


$results['name'] = $visitor_name;
$results['message'] = $visitor_message;

// 2. Prepare the email [Prepare it in a certain format.]
$email_subject = $visitor_subject;

if ($email_subject == "Web Design") {
    $email_recipient = 'webdesign@jmillermedia.net';
} else if($email_subject == "Graphic Design") {
    $email_recipient = 'graphicdesign@jmillermedia.net';
} else if($email_subject == "3D Design") {
    $email_recipient = '3ddesign@jmillermedia.net';
} else if($email_subject == "Other") {
    $email_recipient = 'jon@jmillermedia.net';
}

$email_message = sprintf('Name: %s, Email: %s, Message: %s,', $visitor_name, $visitor_email, $visitor_message);
// Make sure you run the code in PHP 7.4 or above otherwise $email_headers needs to be a string.
$email_headers = array(
    'From'=>'noreply@roku.com'
);

// 3. Send out the email.
$email_result = mail($email_recipient, $email_subject, $email_message, $email_headers);
if($email_result) {
    $results['message'] = sprintf('Thank you for contacting me %s, you should receive a reply within 24 hours.', $visitor_name);
} else {
    $results['message'] = sprintf('%s, we are sorry, but the email did not send.', $visitor_name);
}

echo json_encode($results);