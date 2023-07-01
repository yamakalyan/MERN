import "../post/UniquePost.scss"
import { useEffect, useState } from "react";
import { ServiceUrl } from "../../Helpers/Help";
import Loader from "../../Loader/Loader";
import { useParams } from "react-router-dom";

export default function UniquePost() {
    const [loading, setLoading] = useState(true);
    const [postView, setPOstView] = useState([]);
    const token = localStorage.getItem("token");
    const params = useParams()
  
    const mainUrl = ServiceUrl();
  
    useEffect(() => {
      setLoading(true);
  
      const fetchingPosts = async () => {
        const endpoint = mainUrl + `post/${params.id}`;
  
        await fetch(endpoint, {
          method: "get",
          headers: { "Content-Type": "application/json", header_kn: token },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setPOstView(data.findPost);
              setLoading(false);
            } else {
              alert(data.message);
            }
          });
      };
      return () => fetchingPosts();
    }, []);

  return (
    <div>
         <div className="container-posts">
        <div className="box">
          <h1 className="main-heading">Personal Posts</h1>
          <hr />
          <br />
          {loading ? <Loader /> : <>
          <div className="post">
              <h4 className="heading">{postView.postHeading}<span style={{float : "right", color : "#908E9B"}}>{postView.postTime}</span></h4>
              <hr />
              <p>{postView.postText}</p>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                >
                <div>
                  <button
                    style={{
                      marginRight: "10px",
                      border: "none",
                      padding: "8px",
                      borderRadius: "5px",
                      background: "rgb(128 232 245)",
                    }}
                    className="btn-edit"
                  >
                    Likes
                  </button>
                  <button
                    style={{
                      border: "none",
                      padding: "8px",
                      borderRadius: "5px",
                      background: "rgb(128 232 245)",
                    }}
                    className="btn-delete"
                  >
                    Comments
                  </button>
                  <p>{postView.postLikes} people liked post <span style={{marginLeft : "15px"}}> 25 comments </span></p> 
                </div>
                <div>
                  <button
                    style={{
                      marginRight: "10px",
                      border: "none",
                      padding: "8px",
                      borderRadius: "5px",
                      background: "rgb(128 232 245)",
                    }}
                    className="btn-edit"
                    >
                    Edit
                  </button>
                  <button
                    style={{
                      border: "none",
                      padding: "8px",
                      borderRadius: "5px",
                      background: "rgb(128 232 245)",
                    }}
                    className="btn-delete"
                    >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>}
        </div>
      </div>
      
    </div>
  )
}
