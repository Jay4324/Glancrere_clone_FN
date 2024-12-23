import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { BellDot } from "lucide-react";
import { userLogout } from "@/apis/generalApis";
import { useSidebar } from "@/components/ui/sidebar";
import { Info } from "lucide-react";
import Swal from "sweetalert2";

import {  useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Menu } from 'lucide-react';


const Navbar = () => {
  const dispatch=useDispatch()
  const nav = useNavigate("");
  const stateData = useSelector((state) => state);
  console.log("user data in navabr",stateData)

  const [open, setOpen] = useState();
  
const {toggleSidebar}=useSidebar()

  // handleLogout
  const handleLogout = async () => {
    try {
      let res = await userLogout();
      if (res.status == 200) {
        dispatch({type:"Logout"})
        nav("/login");
      }
    } catch (err) {}
  };

  return (<div className="flex justify-between md:justify-end">
    <div className="flex justify-center items-center md:hidden p-4">
    <Menu className="hover:cursor-pointer " 
        onClick={() => {
         
          toggleSidebar();
        }}
    />

    </div>
 
    <div className=" flex justify-end py-8 px-4">
    
      <Button className="bg-[#0070e0] mx-4  text-base">Login</Button>

      <div className="flex items-center justify-center text-base mx-4">
        <BellDot />
      </div>
      <Dialog open={open}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center  items-center ">
              <Info className="w-24 h-24 text-[#f8bb86]" />
            </div>
            <DialogTitle className="text-3xl font-bold text-center">
              Are you sure?
            </DialogTitle>
          </DialogHeader>
          <div className="text-center my-2 ">
            <Button className="bg-[#0070e0] text-lg font-bold mx-2 border-0 h-12">
              Yes, Logout
            </Button>
            <Button
              className="bg-red-700 text-lg font-bold mx-2 border-0 h-12"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mx-4 flex justify-center border-white">
        <DropdownMenu className="border-white">
          <DropdownMenuTrigger className="border-2 border-blue-700 rounded-full focus:border:0  w-10 h-10 text-center">
            {stateData?.userData?.firstName?.split("")[0]}
            {stateData?.userData?.lastName?.split("")[0]}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-0 mx-4 ">
            <DropdownMenuLabel className="border-0 py-2 text-base  font-bold">
              Hi, {stateData?.userData?.firstName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-bold py-2 font-base">
              Clio
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-base">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-base">Login</DropdownMenuItem>
            <DropdownMenuItem
              className="text-base "
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  //   text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Logout",
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Swal.fire({
                    //   title: "",
                    //   text: "You Have been Logged Out",
                    //   icon: "success",
                    // });
                    handleLogout();
                  }
                });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
