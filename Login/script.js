API_URL = "http://localhost:3000/usuarios"
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const button = document.getElementById('submit-button');

const notyf = new Notyf({
    duration: 3000,
    position: { x: 'center', y: 'top' }
});

button.addEventListener('click', (e) => {
    e.preventDefault();

    if(inputEmail.value.trim() == '' || inputPassword.value.trim() == '') {
        notyf.error("Preencha todos os campos antes de prosseguir");
        return;
    }

    showLoading(1500);
    setTimeout(() => {
        login(inputEmail.value , inputPassword.value);
    }, 1000);
});

function showLoading(duration = 1000) {
    button.innerHTML = `<img src="../assets/loading.svg" alt="Loading" />`;
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = 'Entrar';
        button.disabled = false;
    }, duration);
}

async function login(email, password) {
    try {
        const res = await fetch(`${API_URL}?email=${email}&senha=${password}`);
        const data = await res.json();  
    
        console.log(data)
        if(data.length == 0) {
            console.log('Email ou senha incorreto');
            notyf.error("Email ou senha incorreto");
            return;
        }
        
        console.log(data)
        notyf.success("Login Realizado com sucesso!");

    } catch (error ) {
        console.log(error);
    }
}