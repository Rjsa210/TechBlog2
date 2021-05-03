const sendNewPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#new-post-title').value.trim();
  const content = document.querySelector('#new-post-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ 
        title, content }),
      headers: {
        'Content-type': 'application/json',
      }
    });
    if (response.ok) {
      console.log(response);
      document.location.replace('/dashboard');

    } else {
      console.log(response);
      alert('Failed to create post');
    }
  }
};


document.querySelector('#new-post-submit').addEventListener('click', sendNewPost);