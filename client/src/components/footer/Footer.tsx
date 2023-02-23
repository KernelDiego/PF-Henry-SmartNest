import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ForumIcon from '@mui/icons-material/Forum';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupsIcon from '@mui/icons-material/Groups';
import { VITE_CLIENT_URL } from "../../../config";

export default function Footer() {
  return (
    <div>
      <div className='footer_container'>
        <div className='footer_wrapper'>
          <div className='footer_logo'>
            <img
              src='https://res.cloudinary.com/dg1roy34p/image/upload/v1674828268/SmartNest/logo_smart_w_wxvm3v.png'
              alt='Logo Smart'
            />
          </div>

          <div className='footer_links'>
            <ul className='footer_list'>
              <li className='footer_list-item'>
                <a href={`${VITE_CLIENT_URL}/`}>
                  <Button>
                    <HomeIcon className='icon' />
                    <Typography variant='body2' style={{ color: "white" }}>
                      Home
                    </Typography>
                  </Button>
                </a>
              </li>
              <li className='footer_list-item'>
                <a href={`${VITE_CLIENT_URL}/shop`}>
                  <Button>
                    <ShoppingCartIcon className='icon' />
                    <Typography variant='body2' style={{ color: "white" }}>
                      Shop
                    </Typography>
                  </Button>
                </a>
              </li>
              <li className='footer_list-item'>
                <a href={`${VITE_CLIENT_URL}/news`}>
                  <Button>
                    <NewspaperIcon className='icon' />
                    <Typography variant='body2' style={{ color: "white" }}>
                      News
                    </Typography>
                  </Button>
                </a>
              </li>
              <li className='footer_list-item'>
                <a href={`${VITE_CLIENT_URL}/foro`}>
                  <Button>
                    <ForumIcon className='icon' />
                    <Typography variant='body2' style={{ color: "white" }}>
                      FORUM
                    </Typography>
                  </Button>
                </a>
              </li>
              <li className='footer_list-item'>
                <a href={`${VITE_CLIENT_URL}/about`}>
                  <Button>
                    <GroupsIcon className='icon' />
                    <Typography variant='body2' style={{ color: "white" }}>
                      ABOUT
                    </Typography>
                  </Button>
                </a>
              </li>
            </ul>
          </div>
          <div className='footer_policy'>
            <p className='footer_text-copyright'>Contact Us</p>
            <p className='footer_text-copyright'>Privacy Policy</p>
          </div>
        </div>
      </div>
      <div className='footer_copyright'>
        <p className='footer_text-copyright'>
          &#169; All Rights Reserved SmartNest 2023
        </p>
      </div>
    </div>
  );
}
