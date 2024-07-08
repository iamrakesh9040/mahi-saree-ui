import { Drawer } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

const MobileDrawer = ({ open, close }: { open: boolean; close: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <Drawer open={open} onClose={() => close(false)} anchor='left'>
            <div className='w-full h-screen overflow-y-auto bg-black'>
                sdl/kfnlsjgfnksjlfnljfgnjlnkjlnkjlnS
            </div>
        </Drawer>
    )
}

export default MobileDrawer