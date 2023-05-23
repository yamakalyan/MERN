import "../home/Home.scss"
import {AiOutlineHeart} from "react-icons/ai"
export default function Home() {
  return (
    <>
  <div className="container-home">
        <h1 className="new-feed">New feed</h1>
      <div className="box">
        
        <div className="post">
          <div style={{display : "flex", justifyContent : "space-between"}}>
            <h4 className="heading">Heading of the post</h4>
            <h4 className="heading">Kalyan</h4>
          </div><hr/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut architecto iusto cumque reiciendis maxime magni voluptatem nesciunt, inventore nemo asperiores cum corrupti hic! Et cum ullam ipsam ducimus dicta quam.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut architecto iusto cumque reiciendis maxime magni voluptatem nesciunt, 
            inventore nemo asperiores cum corrupti hic! Et cum ullam ipsam ducimus
             dicta quam.</p>
             <div style={{marginTop : "20px", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
             <div>
              <button style={{marginRight : "10px",border : "none", padding : "8px", borderRadius : "5px", background : "white" }} className="btn-edit"><AiOutlineHeart/></button>
              <button  style={{border : "none", padding : "8px", borderRadius : "5px", background : "white" }} className="btn-delete">Comment</button>
             </div>
             <span style={{float : "right"}}>22-4-2023 5:29 AM</span>
             </div>
        </div>
        <div className="post">
          <div style={{display : "flex", justifyContent : "space-between"}}>
            <h4 className="heading">Heading of the post</h4>
            <h4 className="heading">Kalyan</h4>
          </div><hr/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut architecto iusto cumque reiciendis maxime magni voluptatem nesciunt, inventore nemo asperiores cum corrupti hic! Et cum ullam ipsam ducimus dicta quam.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut architecto iusto cumque reiciendis maxime magni voluptatem nesciunt, 
            inventore nemo asperiores cum corrupti hic! Et cum ullam ipsam ducimus
             dicta quam.</p>
             <div style={{marginTop : "20px", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
             <div>
              <button style={{marginRight : "10px",border : "none", padding : "8px", borderRadius : "5px", background : "white" }} className="btn-edit"><AiOutlineHeart/></button>
              <button  style={{border : "none", padding : "8px", borderRadius : "5px", background : "white" }} className="btn-delete">Comment</button>
             </div>
             <span style={{float : "right"}}>22-4-2023 5:29 AM</span>
             </div>
        </div>
      </div>
    </div>
    </>
  )
}
