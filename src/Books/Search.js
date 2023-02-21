import { Navbar,Container,NavDropdown,Nav,Form,Row,Col,InputGroup,FormControl,Alert,Button,Accordion,Badge,Card, Carousel,Modal, Offcanvas, ProgressBar, Tabs, Tab, OverlayTrigger, Popover, Tooltip,Spinner} from "react-bootstrap";

import {useParams} from 'react-router-dom';
import instance from '../Base_config/Root_axios';
import {useState,useEffect} from 'react';
import TopNav from './Navbar'
import  Cards  from '../Cards/Card';
import SearchBox from '../SearchBox/SearchBox'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Search(){
    const {http} = instance();
    
    const {searchData} =useParams()
    const [bookdata,setBookData]=useState(false);
    const [empty,setEmpty]=useState(false);
    const [spinner,setSpinner]=useState(false)
    const [load,setLoad]=useState(false)
   
    useEffect(()=>{
        setSpinner(true)
        http.get('/searchName?search='+searchData).then((res)=>{
         
            if(res.data.length >= 1){
                setBookData(res.data)
                setSpinner(false)
                setEmpty(false)
                setLoad(false)
            }else{
                setEmpty(true)
                setSpinner(false)
            }

        }).catch((error)=>{
             toast.error("somthing wrong")
        })
    },[load])
    

    return(
        <> 
            <TopNav />
            <ToastContainer />
            <Container fluid>
                <Row className="justify-content-center d-flex">
                    <Col sm={8} md={7}>
                        <SearchBox reload={setLoad}/>
                    </Col>
                </Row>
               <center> { spinner && <Spinner animation="grow" variant="primary" style={{position:"absolute"}} size="lg" className="p-1 text-center" /> } </center>                                     
                <Row className="d-flex justify-content-center mt-5">
                    { empty == true && <h3 className="text-center text-white">No data found</h3> }                    
                    {
                        bookdata !== false &&
                        bookdata.map((data,i)=>(
                            <Col xs={6} sm={4} md={3}  key={i}>                                                     
                               <Cards  name={data.name} Card_img={data.image}/>
                            </Col>
                        ))   
                    }
                </Row>
            </Container>

        </>
    )
}