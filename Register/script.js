const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputCpf = document.getElementById('cpf');
const inputOab = document.getElementById('oab');
const inputPassword = document.getElementById('password');
const inputConfirmPassword = document.getElementById('confirm-password');
const inputArea = document.getElementById('area');
const button = document.getElementById('submit-button');
const notyf = new Notyf({
    duration: 3000,
    position: { x: 'center', y: 'top' }
});

button.addEventListener("click", (e) => {
    e.preventDefault();
    register();
})


function validateCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;

    let sum = 0;
    let remainder;

    if (cpf === "00000000000") return false;

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function validateName(name) {
    return name !== '';
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePasswords(password, confirmPassword) {
    return password === confirmPassword;
}

function validateOab(oab) {
    const re = /^[A-Za-z]{2}\d{4,6}\d{1}$/;
    return re.test(oab);
}

function validateArea(area) {
    return area !== '';
}

async function register() {
    const name = inputName.value;
    const email = inputEmail.value;
    const cpf = inputCpf.value;
    const oab = inputOab.value;
    const password = inputPassword.value;
    const confirmPassword = inputConfirmPassword.value;
    const area = inputArea.value;

    if (!validateName(name)) {
        notyf.error("Nome inválido");
        return;
    }

    if (!validateCpf(cpf)) {
        notyf.error("Cpf inválido");
        return;
    }

    if (!validateOab(oab)) {
        notyf.error("OAB inválido");
        return;
    }

    if (!validateEmail(email)) {
        notyf.error("Email inválido");
        return;
    }

    if (!validatePasswords(password, confirmPassword)) {
        notyf.error("As senhas não coincidem");
        return;
    }

    if (!validateArea(area)) {
        notyf.error("Coloque uma área de atuação");
        return;
    }

    const user = {
        name,
        email,
        cpf,
        oab,
        password,
        area
    };

    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            notyf.error("Erro ao registrar usuário");
            return;
        }

        notyf.success("Usuário registrado com sucesso");
        setTimeout(() => {
            window.location.href = '../Login/index.html';
        }, 1000);
    } catch (error) {
        notyf.error("Erro ao registrar usuário");
        console.log(error);
    }
}