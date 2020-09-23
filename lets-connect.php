<?php

  $messageSent = false;

  // if form is filled out
  if (isset($_POST['email']) && $_POST['email'] != '') {

    // check for valid email
    if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {

      $username = $_POST['name'];
      $userEmail = $_POST['email'];
      $organization = $_POST['organization'];
      $message = $_POST['message'];
      $phone = $_POST['phone'];
      $zip = $_POST['zip'];
      $volunteer = isset($_POST['volunteer']);
      $mailingList = isset($_POST['mailingList']);
      $partner = isset($_POST['partner']);
      $subject = "New She Votes Illinois Contact Us Form Submission";

      $toEmail = "info@shevotesil.org";
      
      $body = "";
      $body .= "Name: ".$username."\r\n";
      $body .= "\r\n";
      $body .= "Email: ".$userEmail."\r\n";
      $body .= "\r\n";

      // if (isset($_POST['organization']) && $_POST['organization'] != '') {
      $body .= "Organization/Title: ".$organization."\r\n";
      $body .= "\r\n";
      // }
      // else {
      //   $body .= "Organization/Title: None given. \r\n";
      // }
      $body .= "Phone number : ".$phone."\r\n";
      $body .= "\r\n";
      $body .= "Zip code : ".$zip."\r\n";
      $body .= "\r\n";

      if (isset($_POST['volunteer'])) {
        $body .= "Volunteer? : Yes\r\n";
      }
      else {
        $body .= "Volunteer? : No\r\n";
      }
      $body .= "\r\n";
      if (isset($_POST['mailingList'])) {
        $body .= "Mailing List? : Yes\r\n";
      }
      else {
        $body .= "Mailing List? : No\r\n";
      }
      $body .= "\r\n";
      if (isset($_POST['partner'])) {
        $body .= "Partner with SVI? : Yes\r\n";
      }
      else {
        $body .= "Partner with SVI? : No\r\n";
      }
      $body .= "\r\n";

      $body .= "Message: ".$message."\r\n";

      mail($toEmail, $subject, $body);

      $messageSent = true;
    }
    else {
      $invalid = "form-invalid";
    }
  }

?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>She Votes Illinois</title>
    <!--Ion Icons-->
    <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet">
    <!--Google Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Aldrich&display=swap" rel="stylesheet">
    <!--Our own stylesheet-->
    <link rel="stylesheet" href="styles.css">

    <!-- Slick carousel to use -->
    <link rel="stylesheet" href="owlcarousel/owl.carousel.min.css">
    <link rel="stylesheet" href="owlcarousel/owl.theme.default.min.css">
</head>
<body>



    <header>
        <!-- JS takes this and injects nav -->

<div class="container" id="nav">
    <nav>
        <div class="nav-brand">
            <a href="index.html" class="no-new-tab">
                <img src="images/logo_concept4.png" alt="SVI Logo" class="logo">
            </a>
        </div>

        <div class="menu-icons open">
            <i class="icon ion-md-menu"></i>
        </div>

        <ul class="nav-list" style="list-style:none">
            <div class="menu-icons close">
                <i class="icon ion-md-close"></i>
            </div>
            <div class="take-action-dropdown">
                <li class="nav-item" onclick="">
                    <a class="nav-link">Who We Are</a>
                </li>
                <div class="take-action-dropdown-content">
                    <a  class="no-new-tab" href="who-we-are.html">Our Team</a>
                    <a class="no-new-tab" href="our-accomplishments.html">Our Accomplishments</a>
                </div>

            </div>
            <li class="nav-item">
                <a href="your-vote-matters.html" class="nav-link no-new-tab">Your Vote Matters</a>
            </li>
            <div class="take-action-dropdown">
                <li class="nav-item" onclick="">
                    <a class="nav-link no-new-tab">Take Action</a>
                </li>
                <div class="take-action-dropdown-content">
                    <a class="no-new-tab" href="current-initiatives.html">Current Initiatives</a>
                    <a class="no-new-tab" href="events.html">Events</a>
                    <a class="no-new-tab" href="guides.html">Guides & Toolkits</a>
                    <a class="no-new-tab" href="lets-connect.php">Volunteer With Us</a>
                </div>

            </div>
            <li class="nav-item">
                <a href="policy-corner.html" class="nav-link no-new-tab">Policy Corner</a>
            </li>
            <li class="nav-item">
                <a href="lets-connect.php" class="nav-link no-new-tab">Let's Connect</a>
            </li>
        </ul>
    </nav>
</div>
    </header>

    <main>
        <section class="navbar">
        <div class="container">
        </div>
        </section>
        <div class="container">

        <div class="grid-container">
          <div class="main-container">
          <section class="experience-outdoors">
                      <h1>Let's Connect!</h1>
                      <br><br>
        <form action="lets-connect-submit.php" method="POST" class="form" id="email-form">
            <div class="form-group">
                <label for="name" class="form-label">Name*:</label>
                <br>
                <input type="text" class="form-control" id="name" name="name" placeholder="Jane Doe" tabindex="1" required>
            </div>
            <div class="form-group">
                <label for="organization" class="form-label">Title/organization:</label>
                <br>
                <input type="text" class="form-control" id="organization" name="organization" placeholder="Organization" tabindex="2">
            </div>
            <div class="form-group">
                <label for="email" class="form-label">Email*:</label>
                <br>
                <input type="email" class="form-control" id="email" name="email" placeholder="jane@doe.com" tabindex="3" required>
            </div>
            <div class="form-group">
                <label for="phone" class="form-label">Phone*:</label>
                <br>
                <input type="text" class="form-control" id="phone" name="phone" placeholder="111-111-1111" tabindex="4" required>
            </div>
            <div class="form-group">
                <label for="zip" class="form-label">Zip code:</label>
                <br>
                <input type="text" class="form-control" id="zip" name="zip" placeholder="12345" tabindex="5">
            </div>
            <div class="form-group">
                <label for="message" class="form-label">Message:</label>
                <br>
                <textarea class="form-control" rows="5" cols="40" id="message" name="message" placeholder="Enter Message..." tabindex="6"></textarea>
            </div>
            <div class="form-group">
              <b>I would like to...</b><br><br>
              <input type="checkbox" name="volunteer" id="volunteer" value="newsletter" tabindex="7">
              <label for="volunteer">Volunteer</label>
              <br><br>
              <input type="checkbox" name="mailingList" id="mailingList" value="mailingList" tabindex="8">
              <label for="mailingList">Join our mailing list</label>
              <br><br>
              <input type="checkbox" name="partner" id="partner" value="partner" tabindex="9">
              <label for="partner">Partner with She Votes IL</label>
            </div>
            <br><br><br>
            <div>
                <button type="submit" class="btn">Submit</button>

            </div>
            <br><br><br>
        </form>
          </section>
          </div>
          <div class="donation-area">
            
            <div class="donation-area-text">
              <div class="btn-wrapper">
                <a href="https://secure.actblue.com/donate/shevotesil" id="donate-btn" class="btn">Donate</a>
              </div>
              <p>
                <i>“When organizations partner and collaborate, we become more powerful, have a wider reach, and can accomplish so much more. Become a part of our community by making a donation to She Votes Illinois, which would enable us to make sure we put together high-quality programs that are free and accessible to all.” </i>
                <br><br>
                <b>- Maureen Keane, co-founder</b>
              </p>
            </div>
          </div>
      </div>      

    </div>      

    </main>

    <footer>
        <p>&copy; 2020 She Votes Illinois | <a class="no-new-tab" href="privacy-policy.html">Privacy Policy</a> | <a class="no-new-tab" href="terms-of-use.html">Terms of Use</a></p>
    </footer>

    <script type="text/javascript" src="jquery-3.5.1.min.js"></script>
    <script src="owlcarousel/owl.carousel.min.js"></script>
    <script type="text/javascript" src="scripts.js"></script>

    </body>
</html>