const $form = document.querySelector('form');
$form.addEventListener('submit', loadingSpin);

function loadingSpin (){
    const $btn = document.getElementById('submit-btn');
    $btn.innerHTML = '<img src="./src/assets/loading.png" class="loading">'
};

// MASCARAS

$("#tel").mask("(99) 9.9999-9999")
$("#cpf").mask("999.999.999-99")
$("#rg").mask("99.999.999-9")
$("#datanasc").mask("99/99/9999")
$("#dataadm").mask("99/99/9999")
$("#dataini").mask("99/99/9999")