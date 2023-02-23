import { Navbar,Container,NavDropdown,Nav,Form,Row,Col,InputGroup,FormControl,Alert,Button,Accordion,Badge,Card, Carousel,Modal, Offcanvas, ProgressBar, Tabs, Tab, OverlayTrigger, Popover, Tooltip,Spinner} from "react-bootstrap";
import TopNav from './Navbar';
import { useNavigate,Navigate  } from "react-router-dom";
import instance from '../Base_config/Root_axios';
import {useState,useEffect} from 'react'
import '../App.css'
import SearchBox from '../SearchBox/SearchBox'
import Cards from '../Cards/Card'

export default function Home(){
    const{http}=instance();
    const navigate=useNavigate();
    const [bookInfo,setBookInfo]=useState([])
    const [searchKey,setSearchKey]=useState(null)
    const [searchData,setSearchData]=useState(null)
    const [searchInput,setSearchInput]=useState('')
    
    const [error,setError]=useState('')
    const [page,setPage]=useState(1)
    const [total_page,setTotal_Page]=useState()
    const [loading,setLoading]=useState(false)
    const [btn,setBtn]=useState(true)
    const [tolastId,setTo_lastId]=useState(0)
    const [dataProcess,setDataProcess]= useState(true)

    // get all book info   
    useEffect(()=>{
        if(sessionStorage.getItem("token") == null){
            navigate('/login');
        }else{
            setLoading(true)
            http.get(`/dashboard?page=${page}&per_page=2`).then((res)=>{
                setDataProcess(false)
                if(res.data.total >0){
                    setTotal_Page(res.data.total)
                    setTo_lastId(res.data.to)
                    setBookInfo((pre)=>[...pre,res.data])
                    setLoading(false)
                }
            }).catch((err)=>{            
                alert("please login again");
                sessionStorage.clear("token")
                navigate('/login')
            })
        }    
    },[page])

    const increase =()=>{
        setPage(page+1)
    }

  
    return(
        <>
       
            <TopNav />
            <Container fluid>
                <Row className="justify-content-center d-flex">
                    <Col sm={8}  md={7}>
                        <SearchBox />                        
                    </Col>
                </Row>
                <Row className="justify-content-center d-flex">                   
                    { 
                        bookInfo.length !== 0 &&
                        bookInfo.map((data,i)=>(
                            data.data.map((data,i)=>(
                                <Col  key={i} xs={6}  md={3}>
                                    <Cards  name={data.name} Card_img={data.image}/>
                              </Col>                          
                            ))
                        ))
                            
                    }   
                </Row>
                <center>
                    {
                        dataProcess ? <h2 className="text-white">Loading...</h2>:(
                        tolastId < total_page ?   <Button className="mt-3" onClick={increase}>{loading ? "Loading...":"Load more"}</Button>:<h2 className="text-white">No more</h2>
                        )
                    }
                </center>               
            </Container>
        </>
    )
}