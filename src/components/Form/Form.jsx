import { useState } from 'react';
import './Form.css'

function Form() {
  const currentYear = new Date().getFullYear();
  const [formValues, setFormValues] = useState({
    userName: { val: '', errors: [] },
    email:    { val: '', errors: [] },
    dobDay:   { val: '', errors: [] },
    dobMonth: { val: '', errors: [] },
    dobYear:  { val: '', errors: [] },
    colour:   { val: '', errors: [] },
    salary:   { val: '', errors: [] }
  });
  const [formErrors, setFormErrors] = useState([]);

  // Handle inputs and populate errors array
  const handleName = e => {
    let errors = [...formValues.userName.errors];
    if(e.target.value === "") {
      errors.push('Please enter your name');
    }
    setFormValues({...formValues, userName: { ...formValues.userName, val: e.target.value }});
  }
  const handleEmail = e => {
    let errors = [...formValues.email.errors];
    if(e.target.value === "") {
      errors.push('Please enter your email');
    }
    setFormValues({...formValues, email: { ...formValues.email, val: e.target.value }});
  }
  const handleDobDay = e => {
    setFormValues({...formValues, dobDay: { ...formValues.dobDay, val: e.target.value }});
  }
  const handleDobMonth = e => {
    setFormValues({...formValues, dobMonth: { ...formValues.dobMonth, val: e.target.value }});
  }
  const handleDobYear = e => {
    setFormValues({...formValues, dobYear: { ...formValues.dobYear, val: e.target.value }});
  }
  const handleColour = e => {
    setFormValues({...formValues, colour: { ...formValues.colour, val: e.target.value }});
  }
  const handleSalary = e => {
    setFormValues({...formValues, salary: { ...formValues.salary, val: e.target.value }});
  }

  const formatCurrency = x => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(x);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // perform any complex validations here
    let errors = [];

    let dob = new Date();
    dob.setFullYear(formValues.dobYear.val);
    dob.setMonth(formValues.dobMonth.val);
    dob.setDate(formValues.dobDay.val);
    
    let age = new Date(Date.now() - dob).getUTCFullYear() - 1969;
    if(age < 18) {
      errors.push('Sorry you\'re too young to use this form');
    }
    
    if(errors.length) {
      setFormErrors(errors);
    } else {
      // submit via ajax
    }
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nameInput">Name</label>
        <input type="text" name="name" id="nameInput" value={formValues.userName.val} onInput={handleName} />
      </div>
      <div className="form-group">
        <label htmlFor="emailInput">Email</label>
        <input type="email" name="email" id="emailInput" value={formValues.email.val} onInput={handleEmail}/>
      </div>
      <div className="form-group">
        <label>Date of birth</label>
        <input type="number" name="birthday" min="1" max="31" placeholder="day" value={formValues.dobDay.val} onInput={handleDobDay}/>
        <input type="number" name="birthmonth" min="1" max="12" placeholder="month" value={formValues.dobMonth.val} onInput={handleDobMonth}/>
        <input type="number" name="birthyear" min={currentYear - 130} max={currentYear} placeholder="year" value={formValues.dobYear.val} onInput={handleDobYear}/>
      </div>
      <div className="form-group">
        <label htmlFor="colourInput">Favourite colour</label>
        <input type="text" name="favouriteColour" id="colourInput" value={formValues.colour.val} onInput={handleColour}/>
      </div>
      <div className="form-group">
        <label htmlFor="salaryInput">Salary</label>
        <input type="range" name="salary" id="salaryInput" min="0" max="100000" step="500" value={formValues.salary.val} onInput={handleSalary}/>
        &nbsp;{formatCurrency(formValues.salary.val)}
      </div>
      {formErrors.map((err,i)=>(
        <p key={`err${i}`} className="error">{err}</p>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
