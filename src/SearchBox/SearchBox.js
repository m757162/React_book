import { Navbar,Container,NavDropdown,Nav,Form,Row,Col,InputGroup,FormControl,Alert,Button,Accordion,Badge,Card, Carousel,Modal, Offcanvas, ProgressBar, Tabs, Tab, OverlayTrigger, Popover, Tooltip,Spinner} from "react-bootstrap";
import { useNavigate,Navigate  } from "react-router-dom";
import instance from '../Base_config/Root_axios';
import {useState,useEffect} from 'react'
import '../App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 export default function Home({reload}){
    const {http} = instance();
     
    const navigate=useNavigate()
   
    const [searchKey,setSearchKey]=useState(null)
    const [searchData,setSearchData]=useState(null)
    const [searchInput,setSearchInput]=useState('')
    const [spinner,setSpinner]=useState(false)
    const [error,setError]=useState('')
    const [suggetion,setSuggetion]=useState(true)
    
  
    //search suggestions data
    const search_val=(e) =>{
        const get_search_value = e.target.innerHTML
        setSuggetion(false)
        setSearchInput(get_search_value)
        setSearchKey(get_search_value)
    }
    // user drop keyword in search box
    const searchdata =(event) =>{       
        setSuggetion(true)
        setSearchKey(event.target.value)
        setSearchInput(event.target.value)
        event.target.value == '' && setSearchData(null)
        if(event.target.value !== ''){
            setSpinner(true)
            http.get('/searchName?search='+event.target.value).then((res)=>{
                          
                setSearchData(res.data)               
                res.statusText &&  setSpinner(false)
                setError('')
                
            }).catch((err)=>{
                setSpinner(false)
                setError('Somthing wrong...')
                toast.error("somthing wrong")
            })
        }
    }

    //  search botton click
    const submitsearch =(event) =>{
       
        event.preventDefault();
        if(searchKey !== null ){
            reload && reload(true)
            setSuggetion(false)
            navigate('/search/' + searchKey)
        }else{
            toast.warn("some keyword required")
        }
    }
  
    return(
        <>
            <ToastContainer />
            <Form onSubmit={submitsearch}>
                <Form.Group className="mt-5 d-flex" controlId="formBasicEmail">
                  <Form.Label className="text-white"></Form.Label>
                  <Form.Control onKeyUp={searchdata} onChange={(event)=>setSearchInput(event.target.value)}  value={searchInput} type="text" placeholder="Search here..." />                           
                    <Button className="p-2 ms-2" variant="primary" type="submit">
                      Search
                    </Button>
                </Form.Group>
                <div className="bg-white search_main">                             
                    { spinner &&<Spinner animation="grow" variant="primary" size="sm" className="p-1 d-flex text-center" />}
                    { 
                        searchData !== null && (

                            suggetion == true && 

                            searchData.map((data,index)=>(                                
                                <li className="search_data" onClick={search_val} key={index}>{data.name}</li>
                            ))

                        )
                    
                    }  
                    <p>{error}</p>
                </div>
            </Form>       
        </>
    )
}