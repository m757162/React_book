import { Navbar,Container,Nav,Form,Row,Col,Button,Spinner} from "react-bootstrap";
import {useState,useEffect,useRef} from 'react'
import TopNav from './Navbar';
import { useNavigate,Navigate  } from "react-router-dom";
import instance from '../Base_config/Root_axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Admin(){
    useEffect(()=>{
        if(sessionStorage.getItem("token") == null){
            navigate('/login');
        }
    })

    const {http}=instance()
    const navigate=useNavigate();
    const [spinner,setSpinner]=useState(false)
    
    const [book_name,setBook_name]= useState(null)
    const [selectImage,setimage]= useState(null)
    const [details,setdetails]= useState(null)
    const formimg = (event) => {
        setimage(event.target.files[0])
    }
    const book_details =(event) =>{
      setdetails(event.target.value)
    }
    const formdata =(event) =>{
      setBook_name(event.target.value)
    }
    const submitform= async(event)=>{
        if(sessionStorage.getItem("token") == null){
            navigate('/login');
        }
    var nn=event.preventDefault();
    
    const formData = new FormData();
    formData.append("book_name", book_name);
    formData.append("selectImage", selectImage);
    formData.append("details", details);
    if(  book_name == null || selectImage == null || details == null ){
        alert("please fillup all field")
    }
    else{
        try{
                setSpinner(true)
                http.post('get_data',formData,{
                    headers: { 
                        "Content-Type": "multipart/form-data",
                    }
                }).then((res)=>{
                    setSpinner(false)
                    toast(res.data)
                    ref1.current.value = "";
                    ref2.current.value = "";
                    ref.current.value = "";

                }).catch((error)=>{
                    setSpinner(false)
                    toast.error("Data Not add.somthing wrong")
                })

            }
            catch(error) {
                toast.error("somthing wrong.please try again")
            }
        }
    }

    const ref1 = useRef();
    const ref2 = useRef();
    const ref = useRef();

    return(
        <>
             <TopNav />
             <ToastContainer />
            <Container>
                <Row className="d-flex justify-content-center mt-5">
                    <Col md={7}>
                        <Form onSubmit={submitform}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label className="text-white">Book Name</Form.Label>
                              <Form.Control onChange={formdata} ref={ref1} type="text" placeholder="Enter Book Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label className="text-white">Book Details</Form.Label>
                              <Form.Control  onChange={book_details} ref={ref2} type="text" placeholder="Enter Book Details"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label className="text-white">Book Image</Form.Label>
                              <Form.Control  onChange={formimg} ref={ref}  type="file" />
                            </Form.Group>
                           
                            <Button variant="primary" disabled={spinner ? true:false}  type="submit">
                                {spinner ? <Spinner  size="sm" /> : "Submit"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}