const handleLogin = async (event) => {
  event.preventDefault();
  
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username, 
        password: password
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const handleSignup = async (event) => {
  event.preventDefault();
  
  const username = document.querySelector('#signup-username').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  
  if (username && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/dashboard');

    }else{
      alert(response.statusText);
    }
  }
};

document.querySelector('#login-submit').addEventListener('click', handleLogin);
document.querySelector('#signup-submit').addEventListener('click', handleSignup);