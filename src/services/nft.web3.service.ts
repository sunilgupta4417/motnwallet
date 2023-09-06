import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { HttpException } from '@exceptions/HttpException';
import * as Constants from '../shared/constants';
import Bronze from '@/contracts/bronze.json';
import Platinum from '@/contracts/platinum.json';
import Gold from '@/contracts/gold.json';
import Silver from '@/contracts/silver.json';

class NftWeb3Service {
    /**
     * Query account balance
     * @param {string} account
     * @returns {string}
     * */
    public async getBalance(account: string): Promise<any> {
        try {
            const bronzeAbi = Bronze.abi as AbiItem[];
            const platinumAbi = Platinum.abi as AbiItem[];
            const goldAbi = Gold.abi as AbiItem[]
            const silverAbi = Silver.abi as AbiItem[]
            const web3 = new Web3(new Web3.providers.HttpProvider(process.env['WEB3_PROVIDER_MAINNET']));
            console.log('proivder', process.env['WEB3_PROVIDER']);
            const bronze_contract = new web3.eth.Contract(bronzeAbi, process.env['BRONZE_CONTRACT_ADDRESS']);
            const platinum_contract = new web3.eth.Contract(platinumAbi, process.env['PLATINUM_CONTRACT_ADDRESS']);
            const gold_contract = new web3.eth.Contract(goldAbi, process.env['GOLD_CONTRACT_ADDRESS']);
            const silver_contract = new web3.eth.Contract(silverAbi, process.env['SILVER_CONTRACT_ADDRESS']);
            const bronzeData = await this.IsNft(bronze_contract, account);
            const platinumData = await this.IsNft(platinum_contract, account);
            const goldData = await this.IsNft(gold_contract, account);
            const silverData = await this.IsNft(silver_contract, account);
            const result = {
                bronze: bronzeData,
                platinum: platinumData,
                gold: goldData,
                silver: silverData
            }
            return result;
        } catch (e) {
            throw new HttpException(400, Constants.errorMsg.invalidToken);
        }
    }

    /**
     * Query allocate token 
     * @param {any} contract
     * @param {string} account
     * @returns {string} 
     * */
    public async IsNft(contract: any, account: string): Promise<number> {
        return await contract.methods.balanceOf(account).call((err: any, result: number) => {
            if (err !== null) {
                return err;
            }
            return result;
        });
    }
}

export default NftWeb3Service;
