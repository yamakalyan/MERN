import { useEffect, useState } from "react";
import "./Profile.scss";
import { ServiceUrl } from "../Helpers/Help";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [profileView, setProfileView] = useState([]);
  const token = localStorage.getItem("token");
  const url = ServiceUrl();
  const navigator = useNavigate();
  const [edit, setEdit] = useState(false);

  const [following, setFollowing] = useState(false);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchingProfile = async () => {
      const endpoint = url + "user/user/profile";
      await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          header_kn: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProfileView(data.profile);
            setLoading(false);
          } else {
            alert(data.message);
          }
        });
    };
    return () => fetchingProfile();
  }, []);

  const handleFollowing = () => {
    setFollowing(true);
    fetch(url + "user/followlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        header_kn: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFollowingList(data);
        } else {
          setFollowingList(data);
        }
      });
  };
  const mappingFollowing = followingList.map((list, l) => {
    return (
      <>
        <div className="list">
          <p>
            {list.username}
            <span style={{ float: "right" }}>
              <button>following</button>
            </span>
          </p>
          <p>id : 12346789</p>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="profile">
        <div className="container-profile">
          <div className="box">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="personal-info">
                  <h2>Personal details</h2>
                  <hr />
                  {edit ? (
                    <>
                      <div>
                        <span>
                          <a
                            onClick={() => {
                              setEdit(false), setFollowing(false);
                            }}
                          >
                            back
                          </a>
                        </span>
                        <div className="edit-section">
                          <div className="input-div">
                            <input
                              type="text"
                              className="input"
                              placeholder="name"
                            />
                          </div>
                          <div className="input-div">
                            <input
                              type="number"
                              className="input"
                              placeholder="number"
                            />
                          </div>
                          <div className="input-div">
                            <input
                              type="email"
                              className="input"
                              placeholder="email"
                            />
                          </div>
                          <div className="input-div">
                            <input
                              type="password"
                              className="input"
                              placeholder="change password"
                            />
                          </div>
                          <div className="input-div">
                            <input
                              type="passoword"
                              className="input"
                              placeholder="Enter old password"
                            />
                          </div>
                          <div className="btn-div">
                            <button className="btn">Save</button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : following ? (
                    <>
                      <span>
                        <a
                          onClick={() => {
                            setEdit(false), setFollowing(false);
                          }}
                        >
                          back
                        </a>
                      </span>
                      <div className="following-box">
                        <div className="following-section">
                          {mappingFollowing}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <ul>
                        <li>Name : {profileView.name}</li>
                        <br />
                        <li>Mobile : {profileView.mobile}</li>
                        <br />
                        <li>Gmail : {profileView.email}</li>
                      </ul>
                      <br />
                      <div className="btn-group">
                        <button
                          className="btn-profile"
                          onClick={() => {
                            setEdit(true);
                          }}
                        >
                          edit
                        </button>
                        <button
                          className="btn-profile"
                          onClick={handleFollowing}
                        >
                          following
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
