"use client";

import { useState, useEffect } from "react";
import { Input } from 'reactstrap';
import Image from "next/image"

const TenantCreationForm = () => {
    const [tenantEmail,setTenantEmail] = useState('');
    const [tenantName,setTenantName] = useState('');
    const [tenantPhone,setTenantPhone] = useState('');
    const [tenantPersonInCharge,setTenantPersonInCharge] = useState('');
    const [isLoadingCreation, setIsLoadingCreation] = useState(false);
    const [tenantCreated, setTenantCreated] = useState(false);

    // const delay = ms => new Promise(
    //     resolve => setTimeout(resolve, ms)
    // );

    // useEffect(()=>{
    //     if(tenantCreated){
    //         async function makeRequest() {
    //             // console.log('before');
          
    //             await delay(3000);
          
    //             setTenantCreated(false)
    //           }
    //           makeRequest();
    //     }
    // },[tenantCreated])

    const handleChangeTE = (event)=>{
        setTenantEmail(event.target.value)
    }

    const handleChangeTN = (event)=>{
        setTenantName(event.target.value)
    }

    const handleChangeTP = (event)=>{
        setTenantPhone(event.target.value)
    }

    const handleChangeTPIC = (event)=>{
        setTenantPersonInCharge(event.target.value)
    }

    const createTenant = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
                "tenantEmail": tenantEmail,
                "tenantName": tenantName,
                "tenantPhone": tenantPhone,
                "name": tenantPersonInCharge
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
                setIsLoadingCreation(true)
                fetch("https://afmlbia6k2.execute-api.us-east-1.amazonaws.com/development/registration", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setIsLoadingCreation(false);
                    tenantCreated(true);
                })
                .catch(error => console.log('error', error));
    }

  return (
    <div className="main-user-create-container">
        <div className="form-title-box">
            <h3>Create New Tenant</h3>
            <hr />
        </div>
        <div className="form-content-box">
            <form action="#">
                <div className="new-user-row">
                    <div className="label-box">
                        <Image alt="form-name-icon"src={'/assets/images/form-edit-icon.svg'} width={30} height={30} />
                        <label htmlFor="">Tenant Name</label>
                    </div>
                    <Input type="text" onChange={handleChangeTN} value={tenantName} name="name" id="name" placeholder="Tenant Name" autofocus="autofocus" />
                </div>

                <div className="new-user-row">
                    <div className="label-box">
                        <Image alt="form-name-icon"src={'/assets/images/form-edit-icon.svg'} width={30} height={30} />
                        <label htmlFor="">Tenant Email</label>
                    </div>
                    <Input type="text" onChange={handleChangeTE} value={tenantEmail} name="name" id="name" placeholder="Tenant Email" autofocus="autofocus" />
                </div>

                <div className="new-user-row">
                    <div className="label-box">
                        <Image alt="form-name-icon"src={'/assets/images/form-edit-icon.svg'} width={30} height={30} />
                        <label htmlFor="">Tenant Phone</label>
                    </div>
                    <Input type="text" onChange={handleChangeTP} value={tenantPhone} name="name" id="name" placeholder="Tenant Phone Number" autofocus="autofocus" />
                </div>

                <div className="new-user-row">
                    <div className="label-box">
                        <Image alt="form-name-icon"src={'/assets/images/form-edit-icon.svg'} width={30} height={30} />
                        <label htmlFor="">Tenant Person In Charge</label>
                    </div>
                    <Input type="text" onChange={handleChangeTPIC} value={tenantPersonInCharge} name="name" id="name" placeholder="Name Person In Charge" autofocus="autofocus" />
                </div>

                <div id="button-form-box" className="new-user-row">
                {/* {userAlreadyexists && <p style={{color:'red'}}>User already exists</p>} */}
                {tenantCreated && <p style={{color:'#023047'}}>User Created</p>}
                {isLoadingCreation && <p style={{color:'#023047'}}>Loading</p>} 
                    <input onClick={createTenant} type="button" name="add-user" id="add-user" value="Add User" />
                </div>
            </form>
        </div>

    </div>
  )
}

export default TenantCreationForm