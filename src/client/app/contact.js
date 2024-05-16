document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
  
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting the default way
  
      const formData = new FormData(contactForm);
  
      const name = formData.get('name');
      const phone = formData.get('phone');
      const email = formData.get('email');
      const message = formData.get('message');
  
      // Log the form data to the console
      console.log('Name:', name);
      console.log('Phone:', phone);
      console.log('Email:', email);
      console.log('Message:', message);
    });
  });
  