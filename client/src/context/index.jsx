import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x19861CD22414D201C08e605AC4392C35665903b5');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  
    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address,
                form.title,
                form.location,
                form.category,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image,
            ])

            console.log("Contract call success!", data);
            
        } catch (error) {
            console.log("Contract call failed..", error);
        }
    }

    return (
        <StateContext.Provider
            value={{ address, contract, connect, createCampaign: publishCampaign, }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);