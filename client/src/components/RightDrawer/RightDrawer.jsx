import { Drawer, Box, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchMenu from '../Searchmenu/SearchMenu'
import './RightDrawer.css'

function RightDrawer({ allFilms, setFilteredFilms, isDrawerOpen, setIsDrawerOpen }) {
  

  return (
    <div>
      <Drawer
        anchor="right"
        variant="temporary"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '270px',
            boxSizing: 'border-box',
            px: 2,
          },
        }}>
        <Box>
          <Typography variant="h6" component="div">
            Side Panel
          </Typography>
          <SearchMenu allFilms={allFilms} setFilteredFilms={setFilteredFilms} />
        </Box>
      </Drawer>
    </div>
  );
}

export default RightDrawer;
