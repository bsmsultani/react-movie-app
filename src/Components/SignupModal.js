import Modal from "./Modal";

const SignupModal = ({onClose}) => {

  
  const handleSubmit = (target) => {
    
    /* get the values from the target */

    const email = target.email.value;
    const password = target.password.value;
    const confirm_password = target['confirm-password'].value;

    if (password !== confirm_password) {
      alert('Passwords do not match');
      return;
    }


    /* send the form object to the onSubmit function */

    fetch('http://sefdb02.qut.edu.au:3000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: target['email'].value,
        password: target['password'].value,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.message);
        } else {
          onClose();
        }
      })
      .catch(error => {
        alert(`Error: ${error.message}`);
        console.error(error);
      });
    


  };
  

  return (
    <Modal title="Sign Up" onClose={onClose} onSubmit={handleSubmit}>
      <label htmlFor="fullname">Full Name:</label>
      <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" />
    </Modal>
  );   
};
  
export default SignupModal;
