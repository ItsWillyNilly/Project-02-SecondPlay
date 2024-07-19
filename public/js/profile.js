const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#item-title').value.trim();
  const price = document.querySelector('#item-price').value.trim();
  const person_posted = document.querySelector('#item-postedBy').value.trim();
  const description = document.querySelector('#item-desc').value.trim();
  const condition = document.querySelector('#item-cond').value.trim();
  

  if (title && price && person_posted && description && condition) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, price, person_posted, description, condition }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to list item');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete selected item');
    }
  }
};

document
  .querySelector('.new-item-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.item-list')
  .addEventListener('click', delButtonHandler);
