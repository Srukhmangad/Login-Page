const container = document.getElementById('container');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const matchPasswordMsg = document.getElementById('matchPassword');
const registerBtn = document.getElementById('register');
const signBtn = document.getElementById('login');

const toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
};


const validatePasswords = () => {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (confirmPassword !== password) {
    matchPasswordMsg.style.display = 'block'; 
  } else {
    matchPasswordMsg.style.display = 'none';
  }
};

confirmPasswordInput.addEventListener('focusout', validatePasswords);

registerBtn.addEventListener('click', () => {
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  validatePasswords();

  if (confirmPassword === password) {
    const registerURL = 'http://localhost:3000/register';
    axios.post(registerURL, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        const message = res.data.message;
        console.log(message);

        if(message==="failed"){
          document.getElementById('matchPassword').innerHTML= 'User or Email already exist';
          matchPasswordMsg.style.display = 'block';
        }
        else{
          document.getElementById('matchPassword').innerHTML= 'User created successfully';
          matchPasswordMsg.style.display = 'block';
          //setTimeout(container.classList.add('sign-in'),5000);
          
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
});



setTimeout(() => {
  container.classList.add('sign-up');
}, 200);
