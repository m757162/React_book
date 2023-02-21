import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'
import { Link} from 'react-router-dom';
function Cards({name ="dc",game_url=null, Card_img, subname = null,imgHeight = 140}) {
 
  return (
   
      <Card className="mt-2">
        <Card.Img variant="top" src={"http://127.0.0.1:8000/storage/"+Card_img}   style={{height: imgHeight }}/>
        <Card.Body>
          <Card.Text className="text-center">{name}
            </Card.Text>          
        </Card.Body>
      </Card>
  
  );
}

export default Cards;