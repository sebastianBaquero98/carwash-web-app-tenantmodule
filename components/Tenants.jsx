"use client";

import { useState, useEffect } from "react";
import TenantCard from "./TenantCard";

const TenantCardList = ({ data, sendDisableTenant, sendEnableTenant  }) => {
    return (
      <>
      {data.map((ts,index) => (
          <TenantCard
            key={ts.tenantId}
            t={ts}
            sendDisableTenant={sendDisableTenant}
            sendEnableTenant ={sendEnableTenant}
            index={index}
          />
        ))}
      </>
        
      
    );
  };

const Tenants = () => {
    const [allTenants, setAllTenants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDeactivate, setIsLoadingDeactivate] = useState(false);
    const [isLoadingActivate, setIsLoadingActivate] = useState(false);
    const [confirmDeactivation, setConfirmDeactivation] = useState(false);
    const [confirmActivation, setConfirmActivation] = useState(false);
    // Search states
    // const [searchText, setSearchText] = useState("");
    // const [searchTimeout, setSearchTimeout] = useState(null);
    // const [searchedResults, setSearchedResults] = useState([]);
    const fetchTenants = async () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        setIsLoading(true)
        fetch("https://afmlbia6k2.execute-api.us-east-1.amazonaws.com/development/tenants", requestOptions)
        .then(response => response.json())
        .then(result => {
          setIsLoading(false)
          setAllTenants(result)
        })
        .catch(error => console.log('error', error));
    //   const response = await fetch("/api/prompt");
    //   const data = await response.json();
  
      //setAllTenants(data);
    };
  
    useEffect(() => {
        fetchTenants();
    }, []);

    useEffect(()=>{
        console.log(allTenants)
    },[allTenants])

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    useEffect(()=>{
      if(confirmActivation){
          async function makeRequest() {
              // console.log('before');
        
              await delay(3000);
        
              setConfirmActivation(false)
            }
            makeRequest();
      }
  },[confirmActivation])

  useEffect(()=>{
    if(confirmDeactivation){
        async function makeRequest() {
            // console.log('before');
      
            await delay(3000);
      
            setConfirmDeactivation(false)
          }
          makeRequest();
    }
},[confirmDeactivation])

    const sendDisableTenant = (pTenantId,i) =>{
      var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };
      setIsLoadingDeactivate(true)
      fetch(`https://afmlbia6k2.execute-api.us-east-1.amazonaws.com/development/tenant/deactivate/${pTenantId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          const newArray = allTenants.map((item, inde) => {
            if (inde === i) {
              return { ...item, 'isActive': false };
            } else {
              return item;
            }
          });
          setAllTenants(newArray)
          setIsLoadingDeactivate(false)
          setConfirmDeactivation(true)
        })
        .catch(error => console.log('error', error));
    }

    const sendEnableTenant = (pTenantId, i) =>{
      var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };
      setIsLoadingActivate(true)
      fetch(`https://afmlbia6k2.execute-api.us-east-1.amazonaws.com/development/tenant/activate/${pTenantId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          const newArray = allTenants.map((item, inde) => {
            if (inde === i) {
              return { ...item, 'isActive': true };
            } else {
              return item;
            }
          });
          setAllTenants(newArray)
          setIsLoadingActivate(false)
          setConfirmActivation(true)
        })
        .catch(error => console.log('error', error));
    }
  
    // const filterPrompts = (searchtext) => {
    //   const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    //   return allPosts.filter(
    //     (item) =>
    //       regex.test(item.creator.username) ||
    //       regex.test(item.tag) ||
    //       regex.test(item.prompt)
    //   );
    // };
  
    // const handleSearchChange = (e) => {
    //   clearTimeout(searchTimeout);
    //   setSearchText(e.target.value);
  
    //   // debounce method
    //   setSearchTimeout(
    //     setTimeout(() => {
    //       const searchResult = filterPrompts(e.target.value);
    //       setSearchedResults(searchResult);
    //     }, 500)
    //   );
    // };
  
    // const handleTagClick = (tagName) => {
    //   setSearchText(tagName);
  
    //   const searchResult = filterPrompts(tagName);
    //   setSearchedResults(searchResult);
    // };
  
    return (
      <>
       <div className="main-title-box">
          <h2>Tenants</h2>
          {isLoading && <p style={{color: '#219EBC'}}>Loading Tenants</p>}
          {isLoadingDeactivate && <p style={{color: '#219EBC'}}>Deactivating Tenant</p>}
          {isLoadingActivate && <p style={{color: '#219EBC'}}>Activating Tenant</p>}
          {confirmActivation && <p style={{color: '#219EBC'}}>Activation Confirmed</p>}
          {confirmDeactivation && <p style={{color: '#219EBC'}}>Deactivation Confirmed</p>}
        </div>
        <div className="users-cards-box">
        
        <TenantCardList data={allTenants} sendDisableTenant={sendDisableTenant} sendEnableTenant={sendEnableTenant}/>
        {/* All Prompts */}
        {/* {searchText ? (
          <TenantCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <TenantCardList data={allPosts} handleTagClick={handleTagClick} />
        )} */}
        
      </div>
      </>
     
    );
  };
  
  export default Tenants;