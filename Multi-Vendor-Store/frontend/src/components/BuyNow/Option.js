import React, { useContext } from 'react'
import { LoginContext } from '../ContextProvider/Contextprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({ deletedata, get }) => {
    const { account, setAccount } = useContext(LoginContext);

    const removedata = async (req, res) => {
        try {
            const res = await fetch(`/DeleteUser/${deletedata}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
           

            if (res.status === 400 || !data) {
                toast.warn("Something went wrong",{
                    position:"top-center",
                })
            }
            else {
                toast.success("Successfully Deleted",{
                    position:"top-center",
                })
                setAccount(data);
                get();
            }
        } catch (error) {
            toast.warn("Something went wrong",{
                position:"top-center",
            })
        }
    }
    return (
        <div className="add_remove_select">
            <select>
                <option value="1">1</option>
                {/* <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option> */}
            </select>
            <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>Delete</p><span>|</span>
            <p className='forremovemedia' style={{ cursor: "pointer" }}>Save or later</p><span>|</span>
            <p className='forremovemedia' style={{ cursor: "pointer" }}>See more like this</p>
            <ToastContainer/>
        </div>
    )
};

export default Option;