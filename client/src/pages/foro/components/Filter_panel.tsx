import findIcon from '../../../assets/foro/findIcon.svg';
import findIconW from '../../../assets/foro/DarkMode/search.svg';
import refreshIcon from '../../../assets/foro/refresh.svg';
import connectivityIconW from '../../../assets/foro/connectivityIconW.svg';
import entertainmentW from '../../../assets/foro/EntertainmentW.svg';
import energyW from '../../../assets/foro/energyW.svg';
import securityW from '../../../assets/foro/securityW.svg'
import healthW from '../../../assets/foro/health.svg'
import confort from '../../../assets/foro/confortW.svg';
import { useAppSelector } from '../../../Redux/hook';

//--- HOOK ----
import { foro_PanelHook } from '../ForoHome/hooks/foro_PanelHook';

interface filterPanel {
  searchInput: string;
  onChangeSearch: any;
  handleFilterByTitle: any;
}

interface filterPanel {
  searchInput: string;
  onChangeSearch: any;
  handleFilterByTitle: any;
  resetFilter: any;
  handleFilterByCategory: any;

}
export default function FilterPanel({
  searchInput,
  onChangeSearch,
  handleFilterByTitle,
  resetFilter,handleFilterByCategory
}: filterPanel) {

  const [{ selectedHandler, allState }] = foro_PanelHook()
  const dark: boolean = useAppSelector((state) => state.themeReducer.dark);

  const Reset = ()=> {
    resetFilter()
    selectedHandler(6)
  }

  const Filter = (filter: string, num: number) =>{
    handleFilterByCategory(filter)
    selectedHandler(num)
  }

  return (
    <div className='foro_panelContainer'>
      <div >
        <div className='foro_panel_search_div'>

        <form className="foro_panel_SearchContainer" onSubmit={handleFilterByTitle}>
          <input
            name='title'
            value={searchInput}
            onChange={onChangeSearch}
            type='text'
            placeholder='Search'
          />
          <button>
            <img className='foro_panel_findIcon' src={dark?findIconW:findIcon} alt="find" />
          </button>
        </form>
        <div onClick={Reset} className='foro_panel_refreshContainer'>
          <img src={refreshIcon} alt="refresh" />
       
        </div>
        </div>
        
        {
          <div className='foro_panel_MenuContainer'>

            <div onClick={()=> Filter("Lifestyle and Health", 0)} className={allState[0]?'foro_panel_Menu_SELECTED':'foro_panel_Menu_HomeContainer'}>
              <img src={healthW} alt="profile_Icon" />
              <p>Lifestyle and Health</p>
            </div>

            <div onClick={()=> Filter("Connectivity and Control", 1)} className={allState[1]?'foro_panel_Menu_SELECTED':'foro_panel_Menu_HomeContainer'}>
              <img src={connectivityIconW} alt="connectivity" />
              <p onClick={()=>handleFilterByCategory("Connectivity and Control")}>Connectivity and Control</p>
            </div>

            <div onClick={()=> Filter("Home Entertainment", 2)} className={allState[2]?'foro_panel_Menu_SELECTED':'foro_panel_Menu_HomeContainer'}>
              <img src={entertainmentW} alt="entertainment" />
              <p>Home Entertainment</p>
            </div>

            <div onClick={()=> Filter("Energy Management", 3)} className={allState[3]?'foro_panel_Menu_SELECTED':'foro_panel_Menu_HomeContainer'}>
              <img src={energyW} alt="energy" />
              <p>Energy Management</p>
            </div>

            <div onClick={()=> Filter("Safety and Security", 4)} className={allState[4]?'foro_panel_Menu_SELECTED':'foro_panel_Menu_HomeContainer'}>
              <img src={securityW} alt="security" />
              <p>Safety and Security</p>
            </div>

            <div onClick={()=> Filter("Comfort and Ease", 5)} className={allState[5]?'foro_panel_Menu_SELECTED':'foro_panel_Menu_HomeContainer'}>
              <img src={confort} alt="comfort" />
              <p>Comfort and Ease</p>
            </div>

          </div>
        }
      </div>
      {/* <div className='foro_panel_logoContainer'>
        <img src={logoSmartW} alt="logoSmartNEST" />
      </div> */}
    </div>
  );
}
