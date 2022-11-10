import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



function App() {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [User, setUser] = useState();
  const [Show, setShow] = useState(false);
  const [UpdatedPost, setUpdatedPost] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const h1 = {
    fontFamily: 'Courier New, monospace',
    fontWeight:'bold',
    color:'#66fcf1',
    fontSize:'4em',
  }

  const h2 = {
    fontFamily: 'Courier New, monospace',
    fontWeight:'bold',
    color:'#c5c6f7',
    fontSize:'1.5em',
  }

  const input = {
    fontFamily: 'Courier New, monospace',
    fontWeight:'bold',
    fontSize:'1.5em',
    borderRadius:'20px',
    padding:'7px'
  }

  const Line = {
    marginTop:'2em',
    width:'75em',
    marginLeft:'4em',
    borderBottom:'1px solid',
    color:'white',
  }

  const list = {
    color:'#66fcf1',
    fontSize:'2em',
    fontFamily: 'Courier New, monospace',
    fontWeight:'bold',
  }

  const Error = {
    fontFamily: 'Courier New, monospace',
    fontWeight:'bold',
    color:'red'
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function emailValidation(){
    if(!isValidEmail(email)){
      document.getElementById('FieldValidationEmail').innerHTML = 'Please Enter correct Email.'
    } else {
      document.getElementById('FieldValidationEmail').innerHTML = ''
      SubmitInfo()
      setname('');
      setemail('');
      window.location.reload()
    }
  }

  function validate(){
    if(name.trim() === ''){
      document.getElementById('FieldName').innerHTML = 'Name is Required.'
    } else {
      document.getElementById('FieldName').innerHTML = ''
    }
    if(email.trim() === ''){
      document.getElementById('FieldEmail').innerHTML = 'Email is Required.'
    } else {
      document.getElementById('FieldEmail').innerHTML = ''
    }
  }

  useEffect(()=> {
    validate()
  })

  function SubmitInfo(){
    try{
      const User = {
        name,
        email,
      }
      axios.post('http://localhost:3000/app/profile', User)
      .then(res => console.log(res.data))
      this.setState({
        name:'',
        email:'',
      })
    }
    catch(e){
      console.log(e)
    }
  }

  function GetData(){
    axios.get('http://localhost:3000/app/profile', {
    })
    .then((res)=>{
      const userdata = res.data;
      setUser(userdata)
      console.log(userdata)
    })
  }

  useEffect(() => {
    GetData();
  }, []);

  function DeleteData(id){
    axios.delete(`http://localhost:3000/app/profile/${id}`)
    .then(res => console.log(res))
    .catch((err)=> console.log(err))
    window.location.reload();
  }

  function UpdateData(Post){
    setUpdatedPost(Post)
    handleShow()
  }

  function handleChange(e){
    const {name, value} = e.target
    setUpdatedPost((prev) => {
      return{
        ...prev,
        [name]: value,
      }
    })
  }

  function UpdateInfo(){
    axios.put(`http://localhost:3000/app/profile/${UpdatedPost._id}`, UpdatedPost)
    .then(res => console.log(res))
    .catch(err => console.log(err));
    console.log(UpdatedPost._id)
    handleClose()
    window.location.reload()
  }

  function ValidateUpdate(){
    if(!isValidEmail(UpdatedPost.email)){
      document.getElementById('ValidationUpdate').innerHTML = 'Please Enter correct Email.'
    } else {
      document.getElementById('ValidationUpdate').innerHTML = ''
      UpdateInfo();
    }
  }

  return (
    <div>
      <div className='welcome' style={{ marginTop:'1em', textAlign:'center'}}>
        <h style={h1}>Welcome</h>
      </div>
      <div className='h2' style={{marginTop:'3em', textAlign:'center' }}>
        <h style={h2}>Enter Your Information to be added to the List</h>
      </div>
      <div className='input' style={{ textAlign:'center', marginTop:'2em'}}>
        <input
          value={name}
          onChange={(e)=> setname(e.target.value)}
          type='text' style={input} placeholder='FullName:'>
        </input>
      </div>
      <div style={{ marginLeft:'33em'}}>
        <p className='error' style={Error} id='FieldName'></p>
      </div>
      <div className='input' style={{ marginTop:'1em', textAlign:'center', }}>
        <input
          value={email}
          onChange={(e)=> setemail(e.target.value)}
          type='text' style={input} placeholder='Email:'>
        </input>
      </div>
      <div style={{ marginLeft:'33em'}}>
        <p className='error' style={Error} id='FieldEmail'></p>
        <p className='error1' style={Error} id='FieldValidationEmail'></p>
      </div>
      <div className='input' style={{ textAlign:'center', marginTop:'1em' }}>
        <Button
          className='submit'
          onClick={()=>{
            emailValidation();
            GetData();
        }}>SUBMIT</Button>
      </div>
      <div className='hr'>
        <hr style={Line}></hr>
      </div>
      <div className='current' style={{ marginTop:'3em', textAlign:'center'}}>
        <h style={list}>Current List</h>
      </div>
      <div>
      </div>
      <div>
        <div>
          <Modal className="my-modal" show={Show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title className='modal-title'>Update Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Control className='modal-input' placeholder='Name'
                    name="name" onChange={handleChange}
                    value={UpdatedPost.name ? UpdatedPost.name : ""}
                  />
                  <Form.Control className='modal-input' style={{ marginTop:'1em' }}
                    name="email" placeholder='Email' onChange={handleChange}
                    value={UpdatedPost.email ? UpdatedPost.email : ""}
                  />
                  <p style={Error} id='ValidationUpdate'></p>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
              <Button
                style={{ marginTop:'0em' }}
                className='modalBtn'
                onClick={()=>{
                  ValidateUpdate();
                }}>
                Save
              </Button>
              <Button
                style={{ marginTop:'0em' }}
                className='modalBtn'
                onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className='data' style={{ marginTop:'5em',}}>
        {User &&
          User.map((user, index) => {
            return (
              <div key={index} style={{ display:'flex', marginTop:'1em'}}>
                <div style={{ marginLeft: "10em", width: "425px" }}>
                  <h style={h2}>{user.name}</h>
                </div>
                <div className='email' style={{ width: "470px" }}>
                  <h style={h2}>{user.email}</h>
                </div>
                <div>
                  <div className='buttons' style={{ display:'flex' }}>
                    <Button
                      className='updateBtn'
                      onClick={() => {
                        UpdateData(user);
                      }}>UPDATE</Button>
                    <Button
                      style={{ marginLeft:'0.5em' }}
                      className='updateBtn'
                      onClick={() => {
                        DeleteData(user._id);
                      }}>DELETE</Button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default App;