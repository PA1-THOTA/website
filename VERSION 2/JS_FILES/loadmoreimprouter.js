import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { usercontext } from "./usecontext_imp_router";


function A() {
  // ALL USESTATES
  const {productcategory,setproductcategory,searchstate, setsearchstate
   
  } = useContext(usercontext);
  const [fetched_tablenames, setfetched_tablenames] = useState([]);
  const [load, setload] = useState(false);
  const [normalload, setnormalload] = useState(false);
  const [all, setall] = useState([]);
  const [empty, setempty] = useState(false);
  const [low, setlow] = useState(0);
  const [high, sethigh] = useState(4);
  const [error,seterror]=useState("false")
  const [skeleton, setskeleton] = useState([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ]);
  
  //ALL USEEFFECTS

  useEffect(() => {
    tablenames_fetching_function();
  }, []);

  //ALL URLS

  const tablenames_url =
    "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/tablenames.php";
  const category_names_url =
    "https://pavanthota.000webhostapp.com/WEBSITE%20PHP%20FILES/";

  // ALL FETCHING FUNCTIONS

  async function tablenames_fetching_function() {
    setload(true);
    seterror(false)
    await axios
      .post(
        tablenames_url,
        {
          tablename: "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const main=response.data;
        setfetched_tablenames(response.data);
        var li = [];
        async function first5lists() {
          var start = low;
          var end = high;
          for (start; start <= end; start++) {
            await axios
              .post(
                category_names_url + response.data[start].tablename + ".php",
                {
                  tablename:response.data[start].tablename,
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((response) => {
                // console.log(main[start].backgroundimage,response.data);
                li.push([main[start].backgroundimage,response.data]);
              }).catch((error)=>{seterror(true);console.log(error)});
          }
          // console.log(li)
          setall([...all, ...li]);
          setload(false);
          setlow(low + 5);
          sethigh(high + 5);
        }
        first5lists();
      }).catch((error)=>{seterror(true);console.log(error)});
      ;
  }

  async function fetchingonclicking_function(low, high) {
    setnormalload(true);
    // console.log("pavan")
    // console.log(low,high)
    var li = [];
    var start = low;
    var end = high;
    // console.log(fetched_tablenames[start].tablename)
    for (start; start <= end; start++) {
      await axios
        .post(
          category_names_url + fetched_tablenames[start].tablename + ".php",
          {
            tablename: fetched_tablenames[start].tablename,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          //   console.log(response.data);
          li.push([fetched_tablenames[start].backgroundimage,response.data]);
        });
    }
    // console.log(li)
    setall([...all, ...li]);
    setnormalload(false);

    // console.log("pavan")
  }

  // ALL NORMAL FUNCTIONS

  const next5lists = () => {
    if (high + 5 < fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      setlow(low + 5);
      sethigh(high + 5);
      //console.log("ifblock")
    } else if (high == fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      sethigh(fetched_tablenames.length + 5);
      setempty(true);
      // console.log("elseifblock")
    } else if (high + 1 < fetched_tablenames.length - 1) {
      fetchingonclicking_function(low, high);
      setlow(low + 5);
      sethigh(fetched_tablenames.length - 1);
      // console.log("2ndelseblock")
    }
  };

  // MAIN COMPONENT

  return (
    <>
      {!error && !all.length ? (
        <>
          {/* <h1>loading....</h1> */}
          <div className="skeleton_categorys"  style={{
            position:"relative",
          top:"80px",
          zIndex:"-2"
          }}>
            {skeleton.map((each, index) => {
              return (
                <div
                  key={index}
                  className="skeleton_products_container"
                  style={{
                    display: "flex",
                    margin: "30px 0px",
                    overflowX: "scroll",
                    height: "400px",
                    padding:"10px",
                  }}>
                  {each.map((item, index) => (
                    <div className="skeleton product"
                      key={index}
                      style={{
                        flexShrink: "0",
                        width: "300px",
                        height: "75%",
                        border: "2px solid red",
                        backgroundColor:"yellow",
                        marginLeft:"10px",
                        position:"relative",
                        overflow:"hidden"
                      }}>
                      <div
                        className="b"
                        style={{
                          width: "10%",
                          height: "150%",
                          backgroundColor: "rgb(215, 219, 223)",
                          position: "absolute",
                          top: "-25%",
                          transform: "rotate(30deg)",
                          animation: "anim 0.5s infinite",
                        }}
                      />
                      <div
                        className="imgdiv"
                        style={{
                          height: "70%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        src={item}
                        alt="product"
                      />
                      <div
                        className="h1div"
                        style={{
                          backgroundColor: "grey",
                          height: "30%",
                          width: "100%",
                        }}>
                        1
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="homepage_categorys" style={{position:"relative",top:"80px",marginTop:"20px",zIndex:"1"}} onClick={()=>setsearchstate(0)}>
          {all.map((each, i) => {
            return (
              <div key={i}>
                <h1>{each[1][1].categoryname.toUpperCase()}</h1>
                <div
                  className="homepage_products_container"
                  style={{
                    display: "flex",
                    margin: "30px 0px",
                    overflowX: "scroll",
                    height: "400px",
                    padding:"10px",
                    background:`url(${each[0]})`,
                    backgroundSize:"cover",
                    backgroundPosition:"center",
                    backgroundAttachment:"fixed"

                  }}>
                  {each[1].map((item, index) => (
                    <Link to="/item" key={index} onClick={()=>setproductcategory(item)}>
                    <div className="homepage_product"
                      key={index}
                      style={{
                        flexShrink: "0",
                        width: "300px",
                        height: "75%",
                        border: "2px solid red",
                        backgroundColor:"yellow",
                        marginLeft:"10px"
                        
                      }}>
                      <img
                        style={{
                          height: "70%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        src={item.image}
                        alt="product"
                      />
                       <h1 className="name">{item.itemname}</h1>
                      <h1> ₹ {item.price}</h1>
                     
                    </div>
                     </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!error && !empty && normalload && <h1 style={{position:"relative",zIndex:"2"
      ,margin:"100px 0px 50px"
    }} >loading...</h1>}
      {!error && !empty && !normalload && !load && (
        <button style={{position:"relative",zIndex:"2",margin:"100px 0px 50px"}} onClick={next5lists}>
          <h1>LOAD MORE</h1>
        </button>
      )}
      {!error && empty && !normalload && <h1 style={{position:"relative",top:"50px",zIndex:"2",margin:"100px 0px 50px"}} >YOU ARE ALL CAUGHT UP</h1>}
      {error && <div className="errorclass" style={{position:"relative",top:"200px"}}><h1>SOMETHING WENT WRONG</h1><h2>PLEASE try again</h2></div>}
    </>
  );
}
export default A;
