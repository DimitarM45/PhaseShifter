window.addEventListener("load", attachEvents);

function attachEvents() {
    let flipPhaseBtn = document.querySelector(".flip-btn");
    flipPhaseBtn.addEventListener("click", attachSoundFiles);
    
    let playBothBtn = document.querySelector(".play-both-btn");
    playBothBtn.addEventListener("click", playBoth);

    playBothBtn.disabled = true;

    function attachSoundFiles() {
        let uploadFileBtn = document.querySelector(".upload-btn");

        let soundFile = uploadFileBtn.files[0];

        let isValid = true;

        let message;

        if (!soundFile) {
            isValid = false;

            message = "No file selected!";

        } else if (!/audio\//gm.test(soundFile.type)) {
            isValid = false;

            message = "Wrong file format!";

        } else if (soundFile.size > 1000000) {

            isValid = false;

            message = "File size should not exceed 1 MB!"
        }
        
        if (!isValid) {
            alert(message);

            location.reload();
        }

        let audioInput = document.getElementById("input");
        
        audioInput.src = URL.createObjectURL(soundFile);
        
        uploadFileBtn.value = "";

        let reader = new FileReader();

        reader.onload = function(e) {
            let byteArray = new Uint8Array(e.target.result);

            let antiphaseByteArray = new Uint8Array(byteArray.length);

            for (let i = 0; i < byteArray.length; i++) {
                antiphaseByteArray[i] = 255 - byteArray[i];
            }

            let antiphaseSoundBlob = new Blob([antiphaseByteArray], {type: soundFile.type});

            let audioOutput = document.getElementById("output");
            audioOutput.src = URL.createObjectURL(antiphaseSoundBlob);

            flipPhaseBtn.disabled = true;
            playBothBtn.disabled = false;
        }    

        reader.readAsArrayBuffer(soundFile); 
    }
    
    function playBoth() {
        let audioInput = document.getElementById("input");
        let audioOutput = document.getElementById("output");

        Promise.all([audioInput.play(), audioOutput.play()])
            .then()
            .catch();
    }
}