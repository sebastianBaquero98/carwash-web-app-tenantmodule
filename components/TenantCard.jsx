import React from 'react'
import Image from "next/image"

const TenantCard = ({k,t,sendDisableTenant,sendEnableTenant,index}) => {
    if(t.isActive){
        return (
            <div key={k} id="manager" className="user-card">
            <div className="user-card-part-1">
                <div className="user-type-box">
                    <h3>T</h3>
                </div>
                <div className="user-type-title">
                    <h4>{t.isActive}</h4>
                </div>
            </div>
            <div className="user-card-part-2">
                <h5>{t.tenantName}</h5>
                <span>{t.tenantEmail}</span>
            </div>
            <div className="user-card-part-3">
                <div className="username-box">
                    <h4>{t.tenantPhone}</h4>
                </div>
                <div className="users-icon-box">
                    {/* <Image alt="edit-icon"src={'/images/edit-icon.svg'} width={30} height={30} /> */}
                    {/* <button onClick={()=>deleteUser(t.user_name, t.tenant_id,index)} style={{border:'none', background:'none'}}><Image alt="delete-icon"src={'/images/user-delete-icon.svg'} width={30} height={30} /></button> */}
                    <button onClick={()=>sendDisableTenant(t.tenantId,index)} style={{border:'none', background:'none'}}><Image alt="delete-icon"src={'/assets/images/disable.svg'} width={30} height={30} /></button>
                    {/* <button style={{border:'none', background:'none'}}><Image alt="delete-icon"src={'/assets/images/user-delete-icon.svg'} width={25} height={25} /></button> */}
                    
                </div>
            </div>

        </div>
        )
        }else{
            return(
            <div key={k} id="manager" className="user-card">
            <div className="user-card-part-1">
                <div  style={{opacity:'30%'}} className="user-type-box">
                    <h3>T</h3>
                </div>
                <div className="user-type-title">
                    <h4>{t.isActive}</h4>
                </div>
            </div>
            <div  style={{opacity:'30%'}} className="user-card-part-2">
                <h5>{t.tenantName}</h5>
                <span>{t.tenantEmail}</span>
            </div>
            <div className="user-card-part-3">
                <div style={{opacity:'30%'}}  className="username-box">
                    <h4>{t.tenantPhone}</h4>
                </div>
                <div className="users-icon-box">
                    {/* <Image alt="edit-icon"src={'/images/edit-icon.svg'} width={30} height={30} /> */}
                    {/* <button onClick={()=>deleteUser(t.user_name, t.tenant_id,index)} style={{border:'none', background:'none'}}><Image alt="delete-icon"src={'/images/user-delete-icon.svg'} width={30} height={30} /></button> */}
                    <button onClick={()=>sendEnableTenant(t.tenantId,index)} style={{border:'none', background:'none'}}><Image alt="delete-icon"src={'/assets/images/add-service-icon.svg'} width={25} height={25} /></button>
                    {/* <button style={{border:'none', background:'none'}}><Image alt="delete-icon"src={'/assets/images/user-delete-icon.svg'} width={25} height={25} /></button> */}
                    
                </div>
            </div>

        </div>
            )
            
        }
    }
  

export default TenantCard