import React from "react";
import "./style.css";
import Link from 'next/link';


export default function Page() {
      
  return (
    <div className="containerLogIn">
                <div className="pagina">
                    <div className="headerLog"><div className="scris">Login</div></div>
                    <div className="input1"> <input className="inputLog" type="text" placeholder="Username" name = "username" 
                    // onChange={(e) => this.onChangeHandler(e)}
                    >
                      </input> </div>
                    <div className="input2"> <input className="inputLog" type="password" placeholder="Password" password = "password" 
                    // onChange={(e) => this.onChangeHandler(e)}
                    >
                      </input> </div>
                  
                    <div> <button className="buttonLog"  

                    // onClick={
                        // async () => {
                        //     let error = await this.send_login_data();
                        //     console.log(error);
                            
                        //     if(!error)
                        //     {
                        //         localStorage.setItem("username", this.state.username);
                                
                        //         this.setState({logOK: true});
                        //     }
                        // }
                    
                    // }
                    >Login</button> </div>
                    <div> 
                    <Link href="/register">
                        <button className="buttonLog1">Need an account?</button>
                    </Link>
                    </div>
                    
                </div>
            </div>
  );

  




  }