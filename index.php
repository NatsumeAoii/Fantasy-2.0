<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>World Of Eldoria</title>
    <link rel="icon" href="img/AB.jpg" type="image/png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>

<body class="position-relative vh-100 d-flex flex-column justify-content-center align-items-center">
    <!-- Background Images -->
    <img src="img/AKanan.png" alt="Corner Image" class="position-absolute top-0 end-0">
    <img src="img/Bkanan.png" alt="Corner Image" class="position-absolute bottom-0 end-0">
    <img src="img/BKiri.png" alt="Corner Image" class="position-absolute bottom-0 start-0">
    <img src="img/AKiri.png" alt="Corner Image" class="position-absolute top-0 start-0">

    <!-- Input Form -->
    <div id="inputForm" class="text-center bg-transparent py-3">
        <p class="fw-bold text-light fs-3">WELCOME TO THE WORLD OF <span class="fw-bold text-info">ELDORIA</span></p>
        <input type="text" class="form-control bg-transparent text-light my-2 text-center" id="nameInput"
            placeholder="Enter Your Name" />
        <div class="row">
            <div class="col-12">
                <button id="submitBtn" class="btn btn-info w-100 text-light fw-medium">Start</button>
            </div>
        </div>
    </div>

    <!-- Character Status Display -->
    <div id="characterDisplay" class="w-100 px-4 mt-4" style="display: none;">
        <h2 class="fw-bold fs-3 text-light mb-4 text-center">STATUS</h2>
        
        <div class="row g-3">
            <!-- Character Info -->
            <div class="col-12 col-md-6">
                <p class="text-light"><strong>Name:</strong> <span id="charName"></span></p>
                <p class="text-light"><strong>Race:</strong> <span id="charRace"></span></p>
                <p class="text-light"><strong>Role:</strong> <span id="charRole"></span></p>
            </div>
            <div class="col-12 col-md-6">
                <p class="text-light"><strong>Level:</strong> <span id="charLev"></span></p>
                <p class="text-light"><strong>Guild:</strong> <span id="charGuild"></span></p>
                <p class="text-light"><strong>Region:</strong> <span id="charRegion"></span></p>
            </div>
        </div>
        
        <hr class="bg-light">

        <!-- Character Attributes -->
        <div class="row row-cols-1 row-cols-md-2 g-3">
            <div class="col">
                <p class="text-light"><strong>Strength:</strong> <span id="charStrength"></span></p>
                <p class="text-light"><strong>Health:</strong> <span id="charHealth"></span></p>
                <p class="text-light"><strong>Dexterity:</strong> <span id="charDexterity"></span></p>
                <p class="text-light" id="divinePower" style="display:none;"><strong>Divine Power:</strong> <span id="charDivinePower"></span></p>
                <p class="text-light" id="darkEnergy" style="display:none;"><strong>Dark Energy:</strong> <span id="charDarkEnergy"></span></p>
            </div>
            <div class="col">
                <p class="text-light"><strong>Mana:</strong> <span id="charMana"></span></p>
                <p class="text-light"><strong>Agility:</strong> <span id="charAgi"></span></p>
                <p class="text-light"><strong>Luck:</strong> <span id="charLuck"></span></p>
                <p class="text-light"><strong>Endurance:</strong> <span id="charEndurance"></span></p>
            </div>
        </div>

        <hr class="bg-light">
        
        <!-- Skills Section -->
        <p class="text-light"><strong>Skills:</strong></p>
        <ul class="text-light list-unstyled" id="charSkill"></ul>

        <hr class="bg-light">
        
        <!-- Titles Section -->
        <p class="text-light"><strong>Title:</strong></p>
        <ul class="text-light list-unstyled" id="charTitle"></ul>
    </div>

    <!-- Footer -->
    <footer class="text-center text-light mt-4 position-absolute bottom-0 w-100">
        <p>Made with Love by WahyuYogo & Natsume Aoii</p>
        <p>&copy; 2024</p>
    </footer>

    <!-- JS Scripts -->
    <script type="module" src="js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>
