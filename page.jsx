import Tenants from "@components/Tenants";
import ButtonNewTenant from "@components/ButtonNewTenant";

const Home = () => {
  return (
    <div className="admin-main-container">
      <div className="admin-main-box">
        <div className='tabs-button-container'>
          <div className='add-user-box'>
            <ButtonNewTenant />
          </div>
        </div>
        <div className='tabs-content-container'>
        <div className="users-main-container">
          <Tenants />
        </div>
        </div>  
      </div>
    </div>
  )
}

export default Home